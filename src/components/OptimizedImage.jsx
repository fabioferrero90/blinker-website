import React, { useState, useRef, useEffect } from 'react';
import { useImageCache } from '../hooks/useCache';

const OptimizedImage = ({
    src,
    alt,
    className = '',
    priority = false,
    width,
    height,
    sizes = '100vw',
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg=='
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const imgRef = useRef(null);
    const observerRef = useRef(null);
    const { cacheMedia, getCachedMedia, isCached } = useImageCache();

    useEffect(() => {
        if (priority) return;

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observerRef.current?.disconnect();
                }
            },
            {
                rootMargin: '50px 0px',
                threshold: 0.1
            }
        );

        if (imgRef.current) {
            observerRef.current.observe(imgRef.current);
        }

        return () => {
            observerRef.current?.disconnect();
        };
    }, [priority]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        // Fallback to original image on error
        if (imgRef.current) {
            imgRef.current.src = src;
        }
    };

    // Generate responsive srcset for different formats
    const generateSrcSet = (imageSrc) => {
        const baseName = imageSrc.replace(/\.[^/.]+$/, '');
        const extension = imageSrc.split('.').pop();

        // Check if optimized versions exist
        const formats = ['avif', 'webp', extension];
        const sizes = ['thumbnail', 'small', 'medium', 'large'];

        return formats.map(format => {
            const srcset = sizes.map(size => {
                const optimizedPath = `/optimized/${baseName}-${size}.${format}`;
                return `${optimizedPath} ${size === 'thumbnail' ? '150w' : size === 'small' ? '300w' : size === 'medium' ? '600w' : '1200w'}`;
            }).join(', ');

            return { format, srcset };
        });
    };

    const srcSetData = generateSrcSet(src);

    return (
        <div
            ref={imgRef}
            className={`optimized-image-container ${className}`}
            style={{
                width: width ? `${width}px` : 'auto',
                height: height ? `${height}px` : 'auto',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Placeholder skeleton */}
            {!isLoaded && (
                <div
                    className="image-placeholder"
                    style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'skeleton-loading 1.5s infinite'
                    }}
                />
            )}

            {/* Optimized image with multiple formats */}
            {isInView && (
                <picture>
                    {/* AVIF format (best compression) */}
                    {srcSetData.find(s => s.format === 'avif') && (
                        <source
                            type="image/avif"
                            srcSet={srcSetData.find(s => s.format === 'avif')?.srcset}
                            sizes={sizes}
                        />
                    )}

                    {/* WebP format (good compression, wide support) */}
                    {srcSetData.find(s => s.format === 'webp') && (
                        <source
                            type="image/webp"
                            srcSet={srcSetData.find(s => s.format === 'webp')?.srcset}
                            sizes={sizes}
                        />
                    )}

                    {/* Fallback to original format */}
                    <img
                        src={src}
                        alt={alt}
                        className={`optimized-image ${isLoaded ? 'loaded' : ''}`}
                        onLoad={handleLoad}
                        onError={handleError}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: isLoaded ? 1 : 0,
                            transition: 'opacity 0.3s ease-in-out'
                        }}
                        loading={priority ? 'eager' : 'lazy'}
                        decoding="async"
                    />
                </picture>
            )}
        </div>
    );
};

export default OptimizedImage;
