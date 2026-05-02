// Conditional logging utility - only logs in development
const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
    log: (...args) => {
        if (isDevelopment) {

        }
    },

    info: (...args) => {
        if (isDevelopment) {
            console.info('[Blinker]', ...args);
        }
    },

    warn: (...args) => {
        if (isDevelopment) {
            console.warn('[Blinker]', ...args);
        }
    },

    error: (...args) => {
        if (isDevelopment) {
            console.error('[Blinker]', ...args);
        }
    },

    debug: (...args) => {
        if (isDevelopment) {
            console.debug('[Blinker]', ...args);
        }
    },

    // Performance logging (always enabled for critical metrics)
    perf: (label, value, unit = 'ms') => {
        if (isDevelopment) {

        }

        // Send to analytics in production
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'performance', {
                event_category: 'performance',
                event_label: label,
                value: value,
                custom_parameter: unit
            });
        }
    },

    // Cache logging (only in development)
    cache: (...args) => {
        if (isDevelopment) {

        }
    },

    // Service Worker logging (only in development)
    sw: (...args) => {
        if (isDevelopment) {

        }
    }
};

// Export individual methods for convenience
export const { log, info, warn, error, debug, perf, cache, sw } = logger;

// Default export
export default logger;
