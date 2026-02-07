'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getGamifiedIcon } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

export function GamifiedIcon() {
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIcon() {
      const url = await getGamifiedIcon({
        theme: 'environmental',
        gameElement: 'puzzle'
      });
      setIconUrl(url);
    }
    fetchIcon();
  }, []);

  if (!iconUrl) {
    return <Skeleton className="w-12 h-12 rounded-full" />;
  }

  return (
    <div className="w-12 h-12 rounded-full bg-white/50 p-1 shadow-sm">
      <Image
        src={iconUrl}
        alt="Gamified Environmental Icon"
        width={48}
        height={48}
        className="rounded-full object-cover"
        unoptimized
      />
    </div>
  );
}
