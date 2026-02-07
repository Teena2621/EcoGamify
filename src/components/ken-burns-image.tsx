'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type KenBurnsImageProps = {
  imageUrl: string;
  alt: string;
  imageHint: string;
};

export default function KenBurnsImage({ imageUrl, alt, imageHint }: KenBurnsImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div 
      className="aspect-video w-full overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <div className={cn(
        'relative h-full w-full transform transition-transform duration-500',
        isZoomed ? 'scale-110' : 'scale-100'
      )}>
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          data-ai-hint={imageHint}
        />
      </div>
    </div>
  );
}
