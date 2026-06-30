import React from 'react';
import Tilt from 'react-parallax-tilt';

const DASHBOARD_CARDS = [
    {
        key: 'gallery',
        icon: 'fas fa-camera-retro',
        title: 'Memories',
        subtitle: 'The moments I never want to forget',
        tag: 'Captured',
    },
    {
        key: 'bouquet',
        icon: 'fas fa-seedling',
        title: 'Beauty',
        subtitle: 'A little reminder of how special you are',
        tag: 'For You',
    },
    {
        key: 'song',
        icon: 'fas fa-music',
        title: 'Melody',
        subtitle: 'The sound that feels like us',
        tag: 'Our Song',
    },
    {
        key: 'letter',
        icon: 'fas fa-feather-alt',
        title: 'Words',
        subtitle: 'Everything I could not say out loud',
        tag: 'From Me',
    },
];

const Dashboard = ({ isVisible, onOpenModal }) => {
    if (!isVisible) return null;

    return (
        <section id="dashboard" className="dashboard-section active-section">
            <div className="dashboard-glow glow-one"></div>
            <div className="dashboard-glow glow-two"></div>

            <header className="dashboard-header">
                <span className="dashboard-badge">
                    <i className="fas fa-heart"></i>
                    Made with love
                </span>

                <h1 className="dashboard-title">
                    A Little World <br />
                    <span>Made Just For You</span>
                </h1>

                <p className="dashboard-subtitle">
                    Open each piece slowly — every card holds something I chose with you in mind.
                </p>

                <div className="divider">
                    <span className="line"></span>
                    <i className="fas fa-heart tiny-heart"></i>
                    <span className="line"></span>
                </div>
            </header>

            <div className="cards-grid">
                {DASHBOARD_CARDS.map((card, index) => (
                    <Tilt 
                        key={card.key}
                        tiltMaxAngleX={10} 
                        tiltMaxAngleY={10} 
                        perspective={1000} 
                        scale={1.02} 
                        transitionSpeed={1000} 
                        gyroscope={true}
                    >
                        <button
                            className="soft-card"
                            type="button"
                            onClick={() => onOpenModal(card.key)}
                            aria-label={`Open ${card.title}`}
                        >
                            <div className="card-shine"></div>

                            <div className="card-top">
                                <div className="card-icon">
                                    <i className={card.icon}></i>
                                </div>

                                <span className="card-number">
                                    0{index + 1}
                                </span>
                            </div>

                            <div className="card-content">
                                <span className="card-tag">{card.tag}</span>
                                <h3 className="card-title">{card.title}</h3>
                                <p className="card-desc">{card.subtitle}</p>
                            </div>

                            <div className="card-action">
                                <span></span>
                                <i className="fas fa-arrow-right"></i>
                            </div>
                        </button>
                    </Tilt>
                ))}
            </div>
        </section>
    );
};

export default Dashboard;