
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GamifiedIcon } from '@/components/gamified-icon';
import { Menu } from 'lucide-react';
import { useSidebar } from '@/hooks/use-sidebar';

export default function AppHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-card border-b">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <Menu />
        </Button>
        <Link href="/" className="flex items-center gap-2">
          <GamifiedIcon />
          <span className="font-bold text-lg text-primary">GameX</span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </header>
  );
}
