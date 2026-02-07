"use client";

import { useState, useEffect } from 'react';

const phrases = ["Welcome to GameX", "Play. Learn. Level Up."];
const typingSpeed = 100;
const erasingSpeed = 50;
const pauseDuration = 1500;

export default function TypingAnimation() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (text.length < phrases[phraseIndex].length) {
        timeout = setTimeout(() => {
          setText(phrases[phraseIndex].slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsTyping(false), pauseDuration);
      }
    } else { // Erasing
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, erasingSpeed);
      } else {
        setIsTyping(true);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isTyping, phraseIndex]);

  return (
    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 h-20 flex items-center justify-center">
      <span
        className="overflow-hidden whitespace-nowrap border-r-4 border-r-primary pr-2"
        style={{
          animation: "blink-caret .75s step-end infinite",
        }}
      >
        {text}
      </span>
    </h1>
  );
}
