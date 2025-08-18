import { useState, useEffect, useRef } from 'react';

export const useLazyLoad = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '50px',
        triggerOnce = true
    } = options;

    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        setHasTriggered(true);
                        observer.disconnect();
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            {
                threshold,
                rootMargin
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [threshold, rootMargin, triggerOnce]);

    return [elementRef, isVisible, hasTriggered];
};

export default useLazyLoad;
