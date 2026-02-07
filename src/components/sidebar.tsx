

'use client';

import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { Users, Trophy, MessageSquare, HelpCircle, Mail, Menu, X, Home, Goal, BookOpen, Puzzle, Video } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { GamifiedIcon } from './gamified-icon';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/hooks/use-user-store';

export default function Sidebar() {
  const { isSidebarOpen, setSidebarOpen, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const { role } = useUserStore();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // On mobile, always close the sidebar after navigation.
    if (window.innerWidth < 768) {
      if (isSidebarOpen) {
        toggleSidebar();
      }
      return;
    }

    // On desktop, if the sidebar is collapsed, expand it.
    // We don't prevent navigation, just expand the bar.
    if (!isSidebarOpen) {
        setSidebarOpen(true);
    }
  };
  
  const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard/connections', label: 'Connections', icon: Users },
    { href: '/dashboard/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/dashboard/reviews', label: 'Reviews', icon: MessageSquare },
    { href: '/help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <>
      <aside
        className={cn(
          'fixed md:relative z-50 h-full bg-card text-card-foreground border-r transition-all duration-300 ease-in-out flex flex-col',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          isSidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className={cn("flex items-center p-4 border-b", isSidebarOpen ? "justify-between" : "justify-center")}>
          <Link href="/" className={cn('flex items-center gap-2', !isSidebarOpen && 'hidden')}>
            <GamifiedIcon />
            <span className="font-bold text-lg">GameX</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isSidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>
        <nav className="flex flex-col p-4 space-y-2 flex-grow">
          {menuItems.map((item) => (
             <Button
                key={item.label}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className={cn('w-full justify-start', !isSidebarOpen && 'justify-center')}
                asChild
              >
              <Link href={item.href} onClick={handleLinkClick}>
                <item.icon className={cn('h-5 w-5', isSidebarOpen && 'mr-4')} />
                <span className={cn(isSidebarOpen ? 'inline' : 'hidden')}>{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </aside>
      {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 z-40 md:hidden" />}
    </>
  );
}
