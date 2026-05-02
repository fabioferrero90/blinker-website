// Warning management configuration for production
export const WARNING_CONFIG = {
    // Suppress specific console warnings in production
    suppressWarnings: process.env.NODE_ENV === 'production',

    // Warning patterns to suppress
    suppressedPatterns: [
        /The entry type 'first-contentful-paint' does not exist/,
        /was preloaded using link preload but not used/,
        /Chrome is moving towards a new experience/,
        /third-party cookies/
    ],

    // Performance metrics to monitor
    performanceMetrics: {
        LCP: { enabled: true, threshold: 2500 },
        TTFB: { enabled: true, threshold: 800 },
        FCP: { enabled: false, threshold: 1800 }, // Disabled due to support issues
        FID: { enabled: true, threshold: 100 },
        CLS: { enabled: true, threshold: 0.1 }
    }
};

// Warning suppressor for production
export const suppressWarnings = () => {
    if (!WARNING_CONFIG.suppressWarnings) return;

    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    console.warn = (...args) => {
        const message = args.join(' ');
        const shouldSuppress = WARNING_CONFIG.suppressedPatterns.some(pattern =>
            pattern.test(message)
        );

        if (!shouldSuppress) {
            originalConsoleWarn.apply(console, args);
        }
    };

    console.error = (...args) => {
        const message = args.join(' ');
        const shouldSuppress = WARNING_CONFIG.suppressedPatterns.some(pattern =>
            pattern.test(message)
        );

        if (!shouldSuppress) {
            originalConsoleError.apply(console, args);
        }
    };
};

// Performance warning manager
export class PerformanceWarningManager {
    constructor() {
        this.warnings = new Set();
        this.metrics = new Map();
    }

    // Check if metric is within threshold
    checkMetric(name, value) {
        const config = WARNING_CONFIG.performanceMetrics[name];
        if (!config || !config.enabled) return true;

        return value <= config.threshold;
    }

    // Log performance warning
    logWarning(metric, value, threshold) {
        if (WARNING_CONFIG.suppressWarnings) return;

        const warning = `${metric}: ${value}ms exceeds threshold ${threshold}ms`;
        if (!this.warnings.has(warning)) {
            console.warn(`⚠️ Performance Warning: ${warning}`);
            this.warnings.add(warning);
        }
    }

    // Track metric
    trackMetric(name, value) {
        this.metrics.set(name, value);

        const config = WARNING_CONFIG.performanceMetrics[name];
        if (config && config.enabled && !this.checkMetric(name, value)) {
            this.logWarning(name, value, config.threshold);
        }
    }

    // Get performance report
    getReport() {
        return {
            warnings: Array.from(this.warnings),
            metrics: Object.fromEntries(this.metrics),
            config: WARNING_CONFIG.performanceMetrics
        };
    }

    // Clear warnings
    clearWarnings() {
        this.warnings.clear();
    }
}

// Initialize warning suppression
if (WARNING_CONFIG.suppressWarnings) {
    suppressWarnings();
}

export default new PerformanceWarningManager();
