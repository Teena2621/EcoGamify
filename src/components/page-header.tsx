
'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bell } from 'lucide-react';
import DashboardHeader from './dashboard-header';
import Link from 'next/link';

export default function PageHeader() {
  const pathname = usePathname();
  const user = { // Mock user, assuming logged in for dashboard views
    displayName: 'Guest User',
    email: 'guest@example.com'
  };


  if (!user) {
    // This part might not be reached if we direct to a login page, but as a fallback.
    return (
       <header className="sticky top-0 z-40 bg-card border-b">
        <div className="container mx-auto flex items-center justify-between p-2 h-16">
          <h1 className="text-xl font-bold">GameX</h1>
        </div>
      </header>
    );
  }

  if (pathname === '/dashboard') {
    return <DashboardHeader />;
  }

  const getTitle = () => {
    if (pathname.startsWith('/dashboard/quizzes/')) {
      return 'Quiz Time';
    }
    if (pathname.startsWith('/materials')) {
      return 'Educational Materials';
    }
    if (pathname.startsWith('/library/')) {
        return 'Knowledge Library';
    }
    if (pathname.startsWith('/help')) {
        return 'Help Center';
    }
    const titles: { [key: string]: string } = {
      '/dashboard/video-lectures': 'Video Lectures',
      '/dashboard/quizzes': 'Quizzes',
      '/dashboard/challenges': 'Daily Challenges',
      '/dashboard/leaderboard': 'Leaderboard',
      '/library': 'Knowledge Library',
      '/dashboard/reviews': 'Reviews',
      '/dashboard/connections': 'Connections',
    };
    return titles[pathname] || 'Dashboard';
  };

  const title = getTitle();

  const getBackPath = () => {
    if (pathname.startsWith('/library/')) {
      return '/library';
    }
     if (pathname.startsWith('/dashboard/quizzes/')) {
      return '/dashboard/quizzes';
    }
    return '/dashboard';
  }

  return (
    <header className="sticky top-0 z-40 bg-card border-b">
      <div className="container mx-auto flex items-center justify-between p-2 h-16">
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="icon" asChild>
            <Link href={getBackPath()}>
              <ArrowLeft />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
