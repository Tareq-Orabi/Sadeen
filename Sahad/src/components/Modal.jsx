import React, { useEffect, useMemo, useRef } from 'react';
import Typewriter from './Typewriter';

const galleryPhotos = [
    {
        src: '/images/202421C8-5B02-4D77-937E-419CC8288D89.JPG',
        caption: 'Photobooth 📸',
    },
    {
        src: '/images/671E9DB9-3047-4BCD-BCC8-8C6CBDC60A2D.JPG',
        caption: 'Artist ✨',
    },
    {
        src: '/images/CDCA64FA-C900-4030-ADFA-9292A1AE0CAF.JPG',
        caption: 'Sweet 💗',
    },
    {
        src: '/images/D5633D37-A862-425E-9E41-B4AF23002AA4.JPG',
        caption: 'My beautiful moon 🤩',
    },
];

const Modal = ({ id, title, onClose }) => {
    const modalRef = useRef(null);

    const isLetter = id === 'letter';
    const isBouquet = id === 'bouquet';
    const isSong = id === 'song';

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const innerContent = useMemo(() => {
        if (id === 'gallery') {
            return (
                <div className="elegant-gallery">
                    {galleryPhotos.map((photo, index) => (
                        <figure className="photo-frame" key={photo.src}>
                            <div className="photo-image-wrap">
                                <img
                                    src={photo.src}
                                    alt={`Memory ${index + 1}`}
                                    loading="lazy"
                                />
                            </div>

                            <figcaption>{photo.caption}</figcaption>
                        </figure>
                    ))}
                </div>
            );
        }

        if (id === 'bouquet') {
            return (
                <div className="showcase">
                    <div className="image-border">
                        <img
                            src="/images/IMG_7402.jpg"
                            alt="Sedeen"
                            className="soft-image"
                            loading="lazy"
                        />
                    </div>

                    <div className="poetry-card">
                        <i className="fas fa-quote-left"></i>
                        <p className="poetry-text">
                            You are the light that gently wakes my heart.
                        </p>
                    </div>
                </div>
            );
        }

        if (id === 'song') {
            return (
                <div className="song-content">
                    <div className="song-cover">
                        <i className="fas fa-music"></i>
                    </div>

                    <p className="song-caption">
                        Some feelings are easier to play than to explain.
                    </p>

                    <div className="video-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                        <iframe 
                            src="https://www.youtube.com/embed/oIYFzna6uQo?autoplay=1" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        ></iframe>
                    </div>
                </div>
            );
        }

        if (id === 'letter') {
            return (
                <div className="letter-body">
                    <Typewriter />
                </div>
            );
        }

        return null;
    }, [id]);

    return (
        <div
            id={`modal-${id}`}
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${id}`}
        >
            <button
                className="modal-backdrop"
                type="button"
                aria-label="Close modal"
                onClick={onClose}
            />

            <div
                ref={modalRef}
                className={[
                    'modal-content',
                    isLetter ? 'paper-bg' : '',
                    isBouquet ? 'text-center' : '',
                    isSong ? 'song-modal' : '',
                ].join(' ')}
            >
                <div className="modal-glow glow-a"></div>
                <div className="modal-glow glow-b"></div>

                <button
                    className="close-btn"
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <i className="fas fa-times"></i>
                </button>

                <header className="modal-header">
                    <span className="modal-kicker">
                        <i className="fas fa-heart"></i>
                        Just for you
                    </span>

                    <h2 id={`modal-title-${id}`} className="modal-title">
                        {title}
                    </h2>
                </header>

                <div className="modal-body">
                    {innerContent}
                </div>
            </div>
        </div>
    );
};

export default Modal;