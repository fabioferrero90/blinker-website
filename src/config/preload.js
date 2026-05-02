// Preload configuration to avoid warnings and optimize loading
export const PRELOAD_CONFIG = {
    // Critical resources that should be preloaded
    critical: [
        {
            href: '/hero-video-poster.avif',
            as: 'image',
            type: 'image/avif',
            media: '(min-width: 768px)'
        },
        {
            href: '/icon.avif',
            as: 'image',
            type: 'image/avif'
        }
    ],

    // CSS resources
    styles: [
        {
            href: '/critical.css',
            as: 'style',
            type: 'text/css'
        }
    ],

    // Fonts
    fonts: [
        {
            href: 'https://fonts.googleapis.com/css2?family=Blinker:wght@100;200;300;400;600;700;800;900&display=swap',
            as: 'style',
            type: 'text/css',
            crossorigin: 'anonymous'
        }
    ],

    // Navigation preloads
    navigation: [
        '/features',
        '/download',
        '/about'
    ]
};

// Function to create preload links
export const createPreloadLinks = () => {
    const links = [];

    // Add critical resources
    PRELOAD_CONFIG.critical.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) link.type = resource.type;
        if (resource.media) link.media = resource.media;
        if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
        links.push(link);
    });

    // Add styles
    PRELOAD_CONFIG.styles.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) link.type = resource.type;
        links.push(link);
    });

    // Add fonts
    PRELOAD_CONFIG.fonts.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) link.type = resource.type;
        if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
        links.push(link);
    });

    return links;
};

// Function to add preload links to document head
export const addPreloadLinks = () => {
    const links = createPreloadLinks();
    links.forEach(link => {
        document.head.appendChild(link);
    });
};

// Function to remove preload links (useful for cleanup)
export const removePreloadLinks = () => {
    const links = document.querySelectorAll('link[rel="preload"]');
    links.forEach(link => {
        if (link.parentNode) {
            link.parentNode.removeChild(link);
        }
    });
};

// Function to check if preload is supported
export const isPreloadSupported = () => {
    return 'relList' in document.createElement('link') &&
        document.createElement('link').relList.supports('preload');
};

// Function to optimize preload based on connection
export const optimizePreloadForConnection = () => {
    if ('connection' in navigator) {
        const connection = navigator.connection;

        // Reduce preloads on slow connections
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            return PRELOAD_CONFIG.critical.slice(0, 1); // Only most critical
        }

        // Full preload on fast connections
        if (connection.effectiveType === '4g') {
            return [...PRELOAD_CONFIG.critical, ...PRELOAD_CONFIG.styles];
        }
    }

    // Default preload
    return PRELOAD_CONFIG.critical;
};
