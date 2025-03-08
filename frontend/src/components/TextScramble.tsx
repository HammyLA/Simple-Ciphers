import React, { useEffect, useState } from 'react'
import '../styles/Home.css'

type ScrambledTextProps = {
    text: string;
    speed?: number;
}

/**
 * Text scrambling effect.
 * @param param0 The text you want to scramble.
 * @returns Current scramble of the text.
 */
const TextScramble: React.FC<ScrambledTextProps> = ({ text, speed = 100 }) => {
    const [currentText, setCurrentText] = useState<string>('');

    const randomChar = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return chars[Math.floor(Math.random() * chars.length)];
    };

    useEffect(() => {
        let i = 0;
        const intervalId = setInterval(() => {
            const scramble = () => {
                let scrambled = '';
                for (let j = 0; j < text.length; j++) {
                    if (j <= i) {
                        scrambled += text[j];
                    } else {
                        scrambled += randomChar();
                    }
                }
                setCurrentText(scrambled);

                if (i >= text.length) {
                    clearInterval(intervalId);
                }

                i++;
            };

            scramble();
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, speed]);

    return <span>{currentText}</span>;
}

export default TextScramble
