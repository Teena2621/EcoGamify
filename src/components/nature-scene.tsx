'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const NatureImage = ({ isAnimated = false }: { isAnimated?: boolean }) => {
    const natureImage = PlaceHolderImages.find(p => p.id === 'picture-2');
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        if (isAnimated) {
            // Alternate between two Ken Burns effects for variety
            const animations = ['animate-kenburns-top-left', 'animate-kenburns-bottom-right'];
            setAnimationClass(animations[Math.floor(Math.random() * animations.length)]);
        }
    }, [isAnimated]);

    if (!natureImage) return null;

    return (
        <div className="h-full w-full overflow-hidden">
            <Image
                src={natureImage.imageUrl}
                alt={natureImage.description}
                fill
                className={`object-cover ${animationClass}`}
                data-ai-hint={natureImage.imageHint}
                priority
            />
        </div>
    );
};


const DecorativeShapes = () => (
    <div className="decorative-container">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
        <div className="shape shape4"></div>
    </div>
);

const RisingParticles = () => {
    const [particles, setParticles] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        const generateParticles = () => {
            const newParticles = Array.from({ length: 15 }).map((_, i) => {
                const size = Math.random() * 4 + 2;
                const duration = Math.random() * 10 + 8;
                const delay = Math.random() * 15;
                const left = Math.random() * 100;

                const style: React.CSSProperties = {
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}%`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                };
                return <div key={i} className="rising-particle" style={style}></div>;
            });
            setParticles(newParticles);
        };
        generateParticles();
    }, []);

    return <>{particles}</>;
};

export default function NatureScene({ isAnimated = false }: { isAnimated?: boolean }) {
    if (isAnimated) {
        return <NatureImage isAnimated={true} />;
    }

    return (
        <div className="absolute inset-0 opacity-50">
            <RisingParticles />
            <DecorativeShapes />
        </div>
    );
}
