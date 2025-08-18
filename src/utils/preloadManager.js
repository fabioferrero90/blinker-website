// Dynamic preload manager to avoid warnings and optimize loading
class PreloadManager {
    constructor() {
        this.preloadedResources = new Set();
        this.pendingPreloads = new Map();
        this.isIntersectionObserverSupported = 'IntersectionObserver' in window;
    }

    // Preload critical resources immediately
    preloadCritical() {
        const criticalResources = [
            { href: '/hero-video-poster.avif', as: 'image', type: 'image/avif' }
        ];

        criticalResources.forEach(resource => {
            this.createPreloadLink(resource, 'preload');
        });
    }

    // Prefetch non-critical resources
    prefetchNonCritical() {
        const nonCriticalResources = [
            { href: '/icon.avif', as: 'image', type: 'image/avif' },
            { href: '/critical.css', as: 'style', type: 'text/css' }
        ];

        nonCriticalResources.forEach(resource => {
            this.createPreloadLink(resource, 'prefetch');
        });
    }

    // Dynamic preload based on visibility
    preloadWhenVisible(selector, resource, options = {}) {
        if (!this.isIntersectionObserverSupported) {
            // Fallback: preload immediately
            this.createPreloadLink(resource, 'preload');
            return;
        }

        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.createPreloadLink(resource, 'preload');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: options.rootMargin || '100px',
            threshold: options.threshold || 0.1
        });

        elements.forEach(element => observer.observe(element));
    }

    // Preload on user interaction
    preloadOnInteraction(element, resource, eventType = 'click') {
        if (this.preloadedResources.has(resource.href)) return;

        const handler = () => {
            this.createPreloadLink(resource, 'preload');
            element.removeEventListener(eventType, handler);
        };

        element.addEventListener(eventType, handler);
    }

    // Create preload/prefetch link
    createPreloadLink(resource, rel) {
        if (this.preloadedResources.has(resource.href)) return;

        const link = document.createElement('link');
        link.rel = rel;
        link.href = resource.href;
        link.as = resource.as;

        if (resource.type) link.type = resource.type;
        if (resource.media) link.media = resource.media;
        if (resource.crossorigin) link.crossOrigin = resource.crossorigin;

        // Add to head
        document.head.appendChild(link);
        this.preloadedResources.add(resource.href);

        // Track loading
        this.trackResourceLoading(link, resource);
    }

    // Track resource loading
    trackResourceLoading(link, resource) {
        const loadPromise = new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Preload timeout'));
            }, 10000); // 10 second timeout

            if (resource.as === 'image') {
                const img = new Image();
                img.onload = () => {
                    clearTimeout(timeout);
                    resolve();
                };
                img.onerror = () => {
                    clearTimeout(timeout);
                    reject(new Error('Image load failed'));
                };
                img.src = resource.href;
            } else if (resource.as === 'style') {
                // For CSS, we can't easily track loading, so just resolve
                clearTimeout(timeout);
                resolve();
            } else {
                // For other resources, just resolve
                clearTimeout(timeout);
                resolve();
            }
        });

        this.pendingPreloads.set(resource.href, loadPromise);
    }

    // Wait for all pending preloads
    async waitForPreloads() {
        const promises = Array.from(this.pendingPreloads.values());
        try {
            await Promise.all(promises);
            return true;
        } catch (error) {
            // Silent fail for preload errors
            return false;
        }
    }

    // Remove preload links (useful for cleanup)
    removePreloadLinks() {
        const links = document.querySelectorAll('link[rel="preload"], link[rel="prefetch"]');
        links.forEach(link => {
            if (link.parentNode) {
                link.parentNode.removeChild(link);
            }
        });
        this.preloadedResources.clear();
        this.pendingPreloads.clear();
    }

    // Get preload statistics
    getStats() {
        return {
            preloadedCount: this.preloadedResources.size,
            pendingCount: this.pendingPreloads.size,
            resources: Array.from(this.preloadedResources)
        };
    }

    // Initialize preload manager
    init() {
        // Preload critical resources immediately
        this.preloadCritical();

        // Prefetch non-critical resources
        this.prefetchNonCritical();

        // Preload hero video poster when hero section is visible
        this.preloadWhenVisible('.hero', {
            href: '/hero-video-poster.avif',
            as: 'image',
            type: 'image/avif'
        }, { rootMargin: '200px' });
    }
}

// Create global instance
const preloadManager = new PreloadManager();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        preloadManager.init();
    });
} else {
    preloadManager.init();
}

export default preloadManager;
export { PreloadManager };
