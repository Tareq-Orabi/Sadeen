import React from 'react';
import confetti from 'canvas-confetti';

const LandingPage = ({ isVisible, onEnter }) => {
    const handleEnterClick = (e) => {
        // Magical confetti burst
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ffb3c6', '#ff8fab', '#ffd700']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ffb3c6', '#ff8fab', '#ffd700']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();

        onEnter();
    };

    return (
        <section
            id="landing-page"
            className={`landing-page ${!isVisible ? 'hidden' : ''}`}
            style={{
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none',
                transition: 'opacity 0.8s ease',
            }}
        >
            <div className="landing-bg-glow glow-left"></div>
            <div className="landing-bg-glow glow-right"></div>

            <div className="floating-heart heart-one">
                <i className="fas fa-heart"></i>
            </div>

            <div className="floating-heart heart-two">
                <i className="fas fa-heart"></i>
            </div>

            <div className="landing-content">
                <div className="floral-ornament">
                    <i className="fab fa-pagelines"></i>
                </div>

                <span className="landing-label">
                    A private little gift
                </span>

                <h1 className="main-greeting">
                    Dearest,
                    <span className="name-highlight">Sedeen</span>
                </h1>

                <p className="sub-greeting">
                    I made this little world for you — open it slowly, smile softly,
                    and let every piece remind you how special you are.
                </p>

                <button
                    id="enter-btn"
                    className="elegant-btn"
                    type="button"
                    onClick={handleEnterClick}
                    aria-label="Your gift"
                >
                    <span>Your Gift</span>
                    <i className="fas fa-arrow-right"></i>
                </button>
            </div>
        </section>
    );
};

export default LandingPage;