// Lighthouse Optimization Configuration
// Maps audit results to specific optimization actions

export const LIGHTHOUSE_OPTIMIZATIONS = {
    // Performance Audits
    'first-contentful-paint': {
        target: 1800, // 1.8s
        actions: [
            'optimize-critical-rendering-path',
            'reduce-server-response-time',
            'eliminate-render-blocking-resources',
            'optimize-images',
            'minify-css',
            'minify-javascript'
        ]
    },

    'largest-contentful-paint': {
        target: 2500, // 2.5s
        actions: [
            'preload-lcp-image',
            'optimize-lcp-element',
            'reduce-lcp-size',
            'use-efficient-image-formats',
            'properly-size-images'
        ]
    },

    'first-input-delay': {
        target: 100, // 100ms
        actions: [
            'reduce-javascript-execution-time',
            'minimize-main-thread-work',
            'reduce-total-blocking-time',
            'use-passive-listeners',
            'avoid-long-tasks'
        ]
    },

    'cumulative-layout-shift': {
        target: 0.1,
        actions: [
            'add-explicit-dimensions',
            'avoid-large-layout-shifts',
            'use-stable-layouts',
            'optimize-image-dimensions',
            'avoid-non-composited-animations'
        ]
    },

    'total-blocking-time': {
        target: 200, // 200ms
        actions: [
            'split-long-tasks',
            'optimize-javascript-bundles',
            'use-web-workers',
            'implement-code-splitting',
            'reduce-unused-javascript'
        ]
    },

    'speed-index': {
        target: 3400, // 3.4s
        actions: [
            'optimize-critical-rendering-path',
            'reduce-server-response-time',
            'eliminate-render-blocking-resources',
            'optimize-images',
            'minify-css',
            'minify-javascript'
        ]
    }
};

// Specific optimization implementations
export const OPTIMIZATION_ACTIONS = {
    'optimize-critical-rendering-path': {
        description: 'Optimize the critical rendering path',
        implementation: [
            'inline critical CSS',
            'defer non-critical CSS',
            'optimize JavaScript loading order',
            'use resource hints (preload, prefetch)'
        ]
    },

    'reduce-server-response-time': {
        description: 'Reduce server response time',
        implementation: [
            'optimize server configuration',
            'use CDN for static assets',
            'implement caching strategies',
            'optimize database queries'
        ]
    },

    'eliminate-render-blocking-resources': {
        description: 'Eliminate render-blocking resources',
        implementation: [
            'defer non-critical CSS',
            'async load JavaScript',
            'inline critical CSS',
            'use preload for critical resources'
        ]
    },

    'optimize-images': {
        description: 'Optimize images for web',
        implementation: [
            'convert to WebP/AVIF formats',
            'implement responsive images',
            'use appropriate image dimensions',
            'implement lazy loading',
            'compress images'
        ]
    },

    'minify-css': {
        description: 'Minify CSS files',
        implementation: [
            'remove whitespace and comments',
            'combine CSS files',
            'use CSS purging tools',
            'implement critical CSS inlining'
        ]
    },

    'minify-javascript': {
        description: 'Minify JavaScript files',
        implementation: [
            'remove whitespace and comments',
            'use tree shaking',
            'implement code splitting',
            'remove unused code'
        ]
    },

    'preload-lcp-image': {
        description: 'Preload the Largest Contentful Paint image',
        implementation: [
            'identify LCP element',
            'add preload link',
            'optimize image format and size',
            'use appropriate loading priority'
        ]
    },

    'add-explicit-dimensions': {
        description: 'Add explicit width and height to images',
        implementation: [
            'add width and height attributes',
            'use aspect-ratio CSS property',
            'implement responsive image containers',
            'avoid layout shifts during loading'
        ]
    },

    'use-efficient-image-formats': {
        description: 'Use modern image formats',
        implementation: [
            'convert to WebP format',
            'convert to AVIF format',
            'provide fallbacks for older browsers',
            'use picture element with multiple sources'
        ]
    },

    'implement-lazy-loading': {
        description: 'Implement lazy loading for images',
        implementation: [
            'use Intersection Observer API',
            'implement progressive loading',
            'show loading placeholders',
            'optimize loading thresholds'
        ]
    }
};

// Performance budgets
export const PERFORMANCE_BUDGETS = {
    images: {
        maxSize: '500KB',
        formats: ['WebP', 'AVIF', 'JPEG'],
        dimensions: {
            hero: '1920x1080',
            features: '800x600',
            thumbnails: '300x200'
        }
    },

    javascript: {
        maxSize: '200KB',
        maxChunks: 5,
        maxDependencies: 20
    },

    css: {
        maxSize: '50KB',
        maxRules: 1000,
        maxSelectors: 500
    },

    fonts: {
        maxSize: '100KB',
        maxFiles: 3,
        display: 'swap'
    }
};

// Resource hints configuration
export const RESOURCE_HINTS = {
    preload: [
        '/hero-video-poster.avif',
        '/icon.png',
        '/critical.css'
    ],

    prefetch: [
        '/features',
        '/download',
        '/about'
    ],

    preconnect: [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.google-analytics.com'
    ],

    dnsPrefetch: [
        '//fonts.googleapis.com',
        '//www.google-analytics.com'
    ]
};

// Core Web Vitals thresholds
export const CORE_WEB_VITALS = {
    LCP: {
        good: 2500,
        needsImprovement: 4000,
        poor: 4000
    },

    FID: {
        good: 100,
        needsImprovement: 300,
        poor: 300
    },

    CLS: {
        good: 0.1,
        needsImprovement: 0.25,
        poor: 0.25
    }
};

export default {
    LIGHTHOUSE_OPTIMIZATIONS,
    OPTIMIZATION_ACTIONS,
    PERFORMANCE_BUDGETS,
    RESOURCE_HINTS,
    CORE_WEB_VITALS
};
