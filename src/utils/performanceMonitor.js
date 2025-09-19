// Monitor delle prestazioni per Blinker Website
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.observers = [];
        this.init();
    }

    init() {
        // Monitora Core Web Vitals
        this.observeLCP();
        this.observeFID();
        this.observeCLS();

        // Monitora metriche aggiuntive
        this.observeFCP();
        this.observeTTFB();

        // Monitora risorse
        this.observeResources();

        // Monitora errori
        this.observeErrors();
    }

    // Largest Contentful Paint
    observeLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.lcp = lastEntry.startTime;
                this.logMetric('LCP', lastEntry.startTime);
            });

            observer.observe({ entryTypes: ['largest-contentful-paint'] });
            this.observers.push(observer);
        }
    }

    // First Input Delay
    observeFID() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    this.metrics.fid = entry.processingStart - entry.startTime;
                    this.logMetric('FID', this.metrics.fid);
                });
            });

            observer.observe({ entryTypes: ['first-input'] });
            this.observers.push(observer);
        }
    }

    // Cumulative Layout Shift
    observeCLS() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                this.metrics.cls = clsValue;
                this.logMetric('CLS', clsValue);
            });

            observer.observe({ entryTypes: ['layout-shift'] });
            this.observers.push(observer);
        }
    }

    // First Contentful Paint
    observeFCP() {
        if ('PerformanceObserver' in window &&
            PerformanceObserver.supportedEntryTypes &&
            PerformanceObserver.supportedEntryTypes.includes('first-contentful-paint')) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const firstEntry = entries[0];
                this.metrics.fcp = firstEntry.startTime;
                this.logMetric('FCP', firstEntry.startTime);
            });

            observer.observe({ entryTypes: ['first-contentful-paint'] });
            this.observers.push(observer);
        }
    }

    // Time to First Byte
    observeTTFB() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (entry.entryType === 'navigation') {
                        this.metrics.ttfb = entry.responseStart - entry.requestStart;
                        this.logMetric('TTFB', this.metrics.ttfb);
                    }
                });
            });

            observer.observe({ entryTypes: ['navigation'] });
            this.observers.push(observer);
        }
    }

    // Monitora risorse
    observeResources() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (entry.entryType === 'resource') {
                        this.logResource(entry);
                    }
                });
            });

            observer.observe({ entryTypes: ['resource'] });
            this.observers.push(observer);
        }
    }

    // Monitora errori
    observeErrors() {
        window.addEventListener('error', (event) => {
            this.logError('JavaScript Error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.logError('Unhandled Promise Rejection', {
                reason: event.reason
            });
        });
    }

    // Log delle metriche
    logMetric(name, value) {
        const status = this.getMetricStatus(name, value);

        // Log solo in development
        if (process.env.NODE_ENV === 'development') {

        }

        // Track metric for warning management
        if (window.warningManager) {
            window.warningManager.trackMetric(name, value);
        }

        // Invia a Google Analytics se disponibile
        if (window.gtag) {
            window.gtag('event', 'performance_metric', {
                metric_name: name,
                metric_value: value,
                metric_status: status
            });
        }
    }

    // Log delle risorse
    logResource(entry) {
        const size = entry.transferSize || 0;
        const duration = entry.duration;

        if (size > 100 * 1024 && process.env.NODE_ENV === 'development') { // > 100KB

        }
    }

    // Log degli errori
    logError(type, details) {
        // Log solo in development
        if (process.env.NODE_ENV === 'development') {
            console.error(`❌ ${type}:`, details);
        }

        // Invia a Google Analytics se disponibile
        if (window.gtag) {
            window.gtag('event', 'exception', {
                description: `${type}: ${details.message || details.reason}`,
                fatal: false
            });
        }
    }

    // Determina lo status della metrica
    getMetricStatus(name, value) {
        const thresholds = {
            LCP: { good: 2500, needsImprovement: 4000 },
            FID: { good: 100, needsImprovement: 300 },
            CLS: { good: 0.1, needsImprovement: 0.25 },
            FCP: { good: 1800, needsImprovement: 3000 },
            TTFB: { good: 800, needsImprovement: 1800 }
        };

        const threshold = thresholds[name];
        if (!threshold) return 'Unknown';

        if (value <= threshold.good) return '🟢 Good';
        if (value <= threshold.needsImprovement) return '🟡 Needs Improvement';
        return '🔴 Poor';
    }

    // Ottieni tutte le metriche
    getMetrics() {
        return { ...this.metrics };
    }

    // Ottieni report completo
    getReport() {
        const report = {
            timestamp: new Date().toISOString(),
            metrics: this.metrics,
            userAgent: navigator.userAgent,
            connection: this.getConnectionInfo(),
            memory: this.getMemoryInfo()
        };

        return report;
    }

    // Informazioni sulla connessione
    getConnectionInfo() {
        if ('connection' in navigator) {
            const conn = navigator.connection;
            return {
                effectiveType: conn.effectiveType,
                downlink: conn.downlink,
                rtt: conn.rtt
            };
        }
        return null;
    }

    // Informazioni sulla memoria
    getMemoryInfo() {
        if ('memory' in performance) {
            return {
                usedJSHeapSize: performance.memory.usedJSHeapSize,
                totalJSHeapSize: performance.memory.totalJSHeapSize,
                jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
            };
        }
        return null;
    }

    // Pulisci gli observer
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Istanza globale
const performanceMonitor = new PerformanceMonitor();

// Esporta per uso esterno
export default performanceMonitor;

// Esporta anche la classe per testing
export { PerformanceMonitor };
