"use client";

import { useState, useEffect } from 'react';

const phrases = ["Welcome to Your Dashboard!"];
const typingSpeed = 100;

export default function DashboardTypingAnimation() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping && text.length < phrases[0].length) {
      timeout = setTimeout(() => {
        setText(phrases[0].slice(0, text.length + 1));
      }, typingSpeed);
    } else {
      setIsTyping(false);
    }

    return () => clearTimeout(timeout);
  }, [text, isTyping]);

  return (
    <h1 className="text-2xl font-bold text-foreground">
      <span
        className="overflow-hidden whitespace-nowrap border-r-4 border-r-primary pr-2"
        style={{
          animation: "blink-caret .75s step-end infinite",
          borderRightColor: text.length === phrases[0].length ? 'transparent' : 'hsl(var(--primary))'
        }}
      >
        {text}
      </span>
    </h1>
  );
}
