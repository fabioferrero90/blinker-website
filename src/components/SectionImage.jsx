import React from 'react';
import OptimizedImage from './OptimizedImage';

const SectionImage = ({
    src,
    alt,
    section,
    className = '',
    priority = false
}) => {
    // Predefined dimensions for different sections to prevent layout shifts
    const sectionDimensions = {
        hero: { width: 1920, height: 1080 },
        features: { width: 800, height: 600 },
        download: { width: 600, height: 400 },
        about: { width: 600, height: 400 },
        mockup: { width: 400, height: 800 },
        map: { width: 800, height: 600 },
        background: { width: 1920, height: 1080 }
    };

    const dimensions = sectionDimensions[section] || { width: 600, height: 400 };

    return (
        <OptimizedImage
            src={src}
            alt={alt}
            className={`section-image section-image-${section} ${className}`}
            priority={priority}
            width={dimensions.width}
            height={dimensions.height}
            sizes={section === 'hero' ? '100vw' : section === 'mockup' ? '400px' : '800px'}
        />
    );
};

export default SectionImage;
