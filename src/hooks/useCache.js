import { useState, useEffect, useCallback } from 'react';

const CACHE_PREFIX = 'blinker-cache';
const MAX_CACHE_SIZE = 100 * 1024 * 1024; // 100MB

export const useCache = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [cacheSize, setCacheSize] = useState(0);

    // Check online status
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Calculate current cache size
    const calculateCacheSize = useCallback(async () => {
        try {
            const cache = await caches.open(CACHE_PREFIX);
            const keys = await cache.keys();
            let totalSize = 0;

            for (const key of keys) {
                try {
                    const response = await cache.match(key);
                    if (response) {
                        const blob = await response.blob();
                        totalSize += blob.size;
                    }
                } catch (error) {
                    // Silent fail for cache size calculation
                }
            }

            setCacheSize(totalSize);
            return totalSize;
        } catch (error) {
            return 0;
        }
    }, []);

    // Cache an image or video
    const cacheMedia = useCallback(async (url, options = {}) => {
        try {
            const cache = await caches.open(CACHE_PREFIX);
            const response = await fetch(url, options);

            if (response.ok) {
                await cache.put(url, response.clone());

                // Check cache size and clean up if necessary
                const currentSize = await calculateCacheSize();
                if (currentSize > MAX_CACHE_SIZE) {
                    await cleanupCache();
                }

                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }, [calculateCacheSize]);

    // Get cached media
    const getCachedMedia = useCallback(async (url) => {
        try {
            const cache = await caches.open(CACHE_PREFIX);
            const response = await cache.match(url);
            return response;
        } catch (error) {
            return null;
        }
    }, []);

    // Check if media is cached
    const isCached = useCallback(async (url) => {
        try {
            const cache = await caches.open(CACHE_PREFIX);
            const response = await cache.match(url);
            return !!response;
        } catch (error) {
            return false;
        }
    }, []);

    // Preload media into cache
    const preloadMedia = useCallback(async (urls, priority = 'low') => {
        const urlsArray = Array.isArray(urls) ? urls : [urls];

        if (priority === 'high') {
            // High priority: load immediately
            return Promise.all(urlsArray.map(url => cacheMedia(url)));
        } else {
            // Low priority: load in background
            urlsArray.forEach(url => {
                cacheMedia(url).catch(() => {
                    // Silent fail for background preload
                });
            });
            return Promise.resolve();
        }
    }, [cacheMedia]);

    // Clean up cache
    const cleanupCache = useCallback(async () => {
        try {
            const cache = await caches.open(CACHE_PREFIX);
            const keys = await cache.keys();

            if (keys.length === 0) return;

            // Sort by last accessed time (if available) or use FIFO
            const itemsToRemove = Math.floor(keys.length * 0.3); // Remove 30%

            for (let i = 0; i < itemsToRemove; i++) {
                await cache.delete(keys[i]);
            }

            await calculateCacheSize();
        } catch (error) {
            // Silent fail for cache cleanup
        }
    }, [calculateCacheSize]);

    // Clear all cache
    const clearCache = useCallback(async () => {
        try {
            const cache = await caches.open(CACHE_PREFIX);
            const keys = await cache.keys();

            await Promise.all(keys.map(key => cache.delete(key)));
            setCacheSize(0);
        } catch (error) {
            // Silent fail for cache clearing
        }
    }, []);

    // Get cache statistics
    const getCacheStats = useCallback(async () => {
        try {
            const cache = await caches.open(CACHE_PREFIX);
            const keys = await cache.keys();
            const currentSize = await calculateCacheSize();

            return {
                itemCount: keys.length,
                totalSize: currentSize,
                maxSize: MAX_CACHE_SIZE,
                usagePercentage: (currentSize / MAX_CACHE_SIZE) * 100,
                isOnline
            };
        } catch (error) {
            return null;
        }
    }, [calculateCacheSize, isOnline]);

    // Initialize cache size calculation
    useEffect(() => {
        calculateCacheSize();
    }, [calculateCacheSize]);

    return {
        // State
        isOnline,
        cacheSize,

        // Cache operations
        cacheMedia,
        getCachedMedia,
        isCached,
        preloadMedia,

        // Cache management
        cleanupCache,
        clearCache,
        getCacheStats,

        // Utilities
        calculateCacheSize
    };
};

// Hook for caching specific media types
export const useMediaCache = (mediaType = 'auto') => {
    const cache = useCache();

    const cacheMediaWithType = useCallback(async (url, options = {}) => {
        const enhancedOptions = {
            ...options,
            headers: {
                'X-Cache-Type': mediaType,
                ...options.headers
            }
        };

        return cache.cacheMedia(url, enhancedOptions);
    }, [cache, mediaType]);

    const preloadMediaWithType = useCallback(async (urls, priority = 'low') => {
        return cache.preloadMedia(urls, priority);
    }, [cache]);

    return {
        ...cache,
        cacheMedia: cacheMediaWithType,
        preloadMedia: preloadMediaWithType
    };
};

// Hook for image-specific caching
export const useImageCache = () => {
    return useMediaCache('image');
};

// Hook for video-specific caching
export const useVideoCache = () => {
    return useMediaCache('video');
};
