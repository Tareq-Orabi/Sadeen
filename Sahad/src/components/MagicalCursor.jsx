import React, { useEffect, useRef } from 'react';

const MagicalCursor = () => {
    const cursorRef = useRef(null);
    const sparklesRef = useRef([]);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;
        
        // Setup sparkles array
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'cursor-sparkle';
            document.body.appendChild(sparkle);
            sparklesRef.current.push({
                el: sparkle,
                x: mouseX,
                y: mouseY,
                vx: 0,
                vy: 0,
                life: 0,
                maxLife: Math.random() * 30 + 20,
                size: Math.random() * 8 + 4,
                color: Math.random() > 0.5 ? '#ffd700' : '#ffb3c6'
            });
        }

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            // Smooth cursor follow
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

            // Sparkle logic
            sparklesRef.current.forEach(sparkle => {
                if (sparkle.life <= 0) {
                    // Reset sparkle at cursor position when it dies
                    sparkle.x = mouseX + (Math.random() - 0.5) * 20;
                    sparkle.y = mouseY + (Math.random() - 0.5) * 20;
                    sparkle.vx = (Math.random() - 0.5) * 2;
                    sparkle.vy = (Math.random() - 0.5) * 2 + 1; // Slight downward gravity
                    sparkle.life = sparkle.maxLife;
                }

                sparkle.x += sparkle.vx;
                sparkle.y += sparkle.vy;
                sparkle.life--;

                const scale = Math.max(0, sparkle.life / sparkle.maxLife);
                
                sparkle.el.style.transform = `translate3d(${sparkle.x}px, ${sparkle.y}px, 0) scale(${scale})`;
                sparkle.el.style.backgroundColor = sparkle.color;
                sparkle.el.style.width = `${sparkle.size}px`;
                sparkle.el.style.height = `${sparkle.size}px`;
                sparkle.el.style.opacity = scale;
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
            sparklesRef.current.forEach(s => {
                if (s.el.parentNode) {
                    s.el.parentNode.removeChild(s.el);
                }
            });
            sparklesRef.current = [];
        };
    }, []);

    return (
        <div ref={cursorRef} className="magical-cursor-main">
            <div className="cursor-glow"></div>
        </div>
    );
};

export default MagicalCursor;
