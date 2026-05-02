import { useState, useEffect, useRef } from 'react';

const OptimizedVideo = ({
    src,
    poster,
    className = '',
    autoPlay = true,
    muted = true,
    loop = true,
    playsInline = true,
    priority = false,
    width,
    height,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        if (priority) {
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '100px',
                threshold: 0.1
            }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, [priority]);

    useEffect(() => {
        if (isInView && videoRef.current) {
            const video = videoRef.current;

            const handleCanPlay = () => {
                setIsLoaded(true);
                if (autoPlay && !isPlaying) {
                    video.play().then(() => {
                        setIsPlaying(true);
                    }).catch(() => {
                        // Autoplay failed, user interaction required
                        setIsPlaying(false);
                    });
                }
            };

            video.addEventListener('canplay', handleCanPlay);

            return () => {
                video.removeEventListener('canplay', handleCanPlay);
            };
        }
    }, [isInView, autoPlay, isPlaying]);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    return (
        <div
            className={`optimized-video-container ${className}`}
            style={{
                width: '100%',
                height: '100%',
                maxWidth: '100%',
                position: 'relative'
            }}
        >
            {!isLoaded && poster && (
                <div className="video-placeholder">
                    <img
                        src={poster}
                        alt="Video poster"
                        className="video-poster"
                        loading="lazy"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
            )}
            {isInView && (
                <video
                    ref={videoRef}
                    className={`optimized-video ${isLoaded ? 'loaded' : ''}`}
                    poster={poster}
                    autoPlay={autoPlay}
                    muted={muted}
                    loop={loop}
                    playsInline={playsInline}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    {...props}
                >
                    <source src={src} type="video/mp4" />
                    <source src={src.replace('.mp4', '.webm')} type="video/webm" />
                    <track kind="captions" src="" label="English" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export default OptimizedVideo;
