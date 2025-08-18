// Configurazione per le ottimizzazioni delle prestazioni
export const PERFORMANCE_CONFIG = {
    // Lazy loading
    lazyLoading: {
        threshold: 0.1,
        rootMargin: '50px',
        triggerOnce: true
    },

    // Image optimization
    images: {
        formats: ['webp', 'avif', 'png', 'jpg'],
        sizes: {
            thumbnail: '150px',
            small: '300px',
            medium: '600px',
            large: '1200px',
            hero: '1920px'
        },
        quality: 85,
        placeholder: '/placeholder.svg'
    },

    // Video optimization
    video: {
        formats: ['mp4', 'webm'],
        quality: 'medium',
        autoplay: true,
        muted: true,
        loop: true,
        playsInline: true
    },

    // Font optimization
    fonts: {
        preload: ['Blinker'],
        display: 'swap',
        fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },

    // Bundle optimization
    bundle: {
        chunkSize: 244 * 1024, // 244KB
        maxChunks: 10,
        minChunkSize: 20 * 1024 // 20KB
    },

    // Caching
    caching: {
        maxAge: 31536000, // 1 year
        staleWhileRevalidate: 86400 // 1 day
    }
};

// Utility functions for performance
export const performanceUtils = {
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Preload critical resources
    preloadResource: (href, as, type) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        if (type) link.type = type;
        document.head.appendChild(link);
    },

    // Prefetch non-critical resources
    prefetchResource: (href) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
    }
};

export default PERFORMANCE_CONFIG;
