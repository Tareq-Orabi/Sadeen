import React, { useEffect, useMemo, useState } from 'react';

const letterText = `My dearest Sedeen,

I wanted to make you something a little different for your graduation — something soft, personal, and made only for you.

Today is such a beautiful milestone, and I’m truly proud of you. You worked hard, grew, and reached a moment that deserves to be celebrated in the sweetest way.

You have this beautiful way of making simple moments feel special. Your smile, your energy, your little details… they leave a lovely mark more than you know.

You are my beautiful moon, my sweet artist, and one of the loveliest people I’m grateful to know.

So this is my little graduation gift to you.
A small world made with care, filled with memories, words, and feelings I hope make you smile — because you deserve something as special as this moment.

With all my care and appreciation,
Tareq ❤️`;

const getTypingDelay = (char) => {
    if (char === '\n') return 280;
    if (['.', '!', '?'].includes(char)) return 420;
    if ([',', '…'].includes(char)) return 240;
    return 42;
};

const Typewriter = () => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDone, setIsDone] = useState(false);

    const textLength = useMemo(() => letterText.length, []);

    useEffect(() => {
        let index = 0;
        let timeoutId;

        const typeNextChar = () => {
            if (index < textLength) {
                const nextChar = letterText[index];

                setDisplayedText(letterText.slice(0, index + 1));
                index += 1;

                timeoutId = setTimeout(typeNextChar, getTypingDelay(nextChar));
            } else {
                setIsDone(true);
            }
        };

        timeoutId = setTimeout(typeNextChar, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [textLength]);

    return (
        <div className="typewriter-wrapper">
            <p id="typewriter-text" className="typewriter-text">
                {displayedText}
                {!isDone && <span className="typewriter-cursor">|</span>}
            </p>

            {isDone && (
                <div className="letter-ending">
                    <span>Made just for you</span>
                    <i className="fas fa-heart"></i>
                </div>
            )}
        </div>
    );
};

export default Typewriter;