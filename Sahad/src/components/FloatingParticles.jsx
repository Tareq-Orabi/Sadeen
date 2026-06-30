import React, { useMemo } from 'react';

const ICONS = [
    'fas fa-heart',      // Classic heart
    'fas fa-spa',        // Represents a rose/flower
    'fab fa-pagelines',  // Leaves/petals
    'fas fa-seedling'    // Nature element
];

const FloatingParticles = () => {
    // Generate particles once on mount so they don't reset when re-rendering
    const particles = useMemo(() => {
        const particleArray = [];
        const numParticles = 30; // Amount of falling items

        for (let i = 0; i < numParticles; i++) {
            // Randomize properties
            const iconClass = ICONS[Math.floor(Math.random() * ICONS.length)];
            const left = Math.random() * 100; // 0% to 100% horizontal position
            const animationDuration = 12 + Math.random() * 18; // 12s to 30s fall time
            const animationDelay = Math.random() * -30; // Negative delay to pre-fill the screen
            const size = 0.6 + Math.random() * 1.2; // 0.6rem to 1.8rem
            const opacity = 0.15 + Math.random() * 0.45; // 0.15 to 0.60 opacity

            const swayDuration = 3 + Math.random() * 5; // 3s to 8s sway time
            const spinDuration = 8 + Math.random() * 12; // 8s to 20s spin time

            // Alternate colors for a rich, floral aesthetic
            const isHeart = iconClass.includes('heart');
            let color = '';
            if (isHeart) {
                color = Math.random() > 0.5 ? 'var(--accent-light)' : 'var(--accent-color)';
            } else {
                // Soft petal colors (rose, blush)
                const petalColors = ['#ff8fab', '#ffb3c6', '#ffc2d1', '#ffe5ec'];
                color = petalColors[Math.floor(Math.random() * petalColors.length)];
            }

            particleArray.push({
                id: i,
                iconClass,
                containerStyle: {
                    left: `${left}%`,
                    fontSize: `${size}rem`,
                    opacity: opacity,
                    color: color,
                    animationDelay: `${animationDelay}s, ${animationDelay}s`,
                    animationDuration: `${animationDuration}s, ${swayDuration}s`,
                },
                iconStyle: {
                    animationDuration: `${spinDuration}s`,
                    animationDelay: `${animationDelay}s`
                }
            });
        }
        return particleArray;
    }, []);

    return (
        <div className="particles-container">
            {particles.map(p => (
                <div 
                    key={p.id} 
                    className="particle" 
                    style={p.containerStyle}
                >
                    <i className={p.iconClass} style={p.iconStyle}></i>
                </div>
            ))}
        </div>
    );
};

export default FloatingParticles;
