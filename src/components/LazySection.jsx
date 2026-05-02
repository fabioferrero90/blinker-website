import { useLazyLoad } from '../hooks/useLazyLoad';

const LazySection = ({
    children,
    className = '',
    threshold = 0.1,
    rootMargin = '100px',
    ...props
}) => {
    const [sectionRef, isVisible] = useLazyLoad({
        threshold,
        rootMargin,
        triggerOnce: true
    });

    return (
        <section
            ref={sectionRef}
            className={`lazy-section ${isVisible ? 'visible' : ''} ${className}`}
            {...props}
        >
            {isVisible ? children : (
                <div className="section-placeholder">
                    <div className="placeholder-content">
                        <div className="placeholder-skeleton"></div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default LazySection;
