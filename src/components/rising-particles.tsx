"use client";

import { useEffect, useState } from 'react';

const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div className="rising-particle" style={style}></div>
);

export default function RisingParticles() {
  const [particles, setParticles] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 30 }).map((_, i) => {
        const size = Math.random() * 3 + 2; // 2px to 5px
        const duration = Math.random() * 7 + 5; // 5s to 12s
        const delay = Math.random() * 10;
        const left = Math.random() * 100;
        
        const style: React.CSSProperties = {
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        };

        return <Particle key={i} style={style} />;
      });
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
        {particles}
    </div>
  );
}
