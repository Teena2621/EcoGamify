'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function SplashScreen() {
  const splashImage = PlaceHolderImages.find(p => p.id === 'splash');

  return (
    <div className="relative flex items-center justify-center w-full h-full bg-background">
      <div className="animate-fade-in animate-zoom-in">
        {splashImage && (
          <Image
            src={splashImage.imageUrl}
            alt={splashImage.description}
            width={150}
            height={150}
            className="object-cover rounded-lg shadow-2xl"
            priority
            data-ai-hint={splashImage.imageHint}
          />
        )}
      </div>
    </div>
  );
}
