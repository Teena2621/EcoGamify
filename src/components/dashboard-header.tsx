
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Bell, Award, Star, ChevronDown, LogOut, Check } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/hooks/use-user-store';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useNotificationStore } from '@/hooks/use-notification-store';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';


export default function DashboardHeader() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'game-2');
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const { user, logout: logoutFromStore } = useUserStore();
  const { notifications, unreadCount, markAllAsRead } = useNotificationStore();


  const handleLogout = async () => {
    try {
        await signOut(auth);
        logoutFromStore();
        toast({ title: "Logged Out", description: "You have been successfully logged out." });
        router.push('/');
    } catch (error: any) {
        toast({ title: "Logout Failed", description: error.message, variant: "destructive" });
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'G';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  }

  const userDetails = {
    name: user?.displayName || user?.email || 'Guest User',
    level: 5,
    xp: 75,
    badges: 4,
    avatarUrl: user?.photoURL,
    avatarFallback: getInitials(user?.displayName || user?.email),
  };


  return (
    <header className="sticky top-0 z-40 bg-card border-b">
      <div className="container mx-auto flex items-center justify-end p-2 h-16">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-6 w-6" />
                    {unreadCount > 0 && (
                        <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{unreadCount}</Badge>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel className="flex justify-between items-center">
                    Notifications
                    {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                            <Check className="mr-2 h-4 w-4" />
                            Mark all as read
                        </Button>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-96">
                    {notifications.length === 0 ? (
                        <p className="text-center text-sm text-muted-foreground p-4">No new notifications</p>
                    ) : (
                        notifications.map(notif => (
                            <DropdownMenuItem key={notif.id} className={cn("flex items-start gap-3", !notif.read && "bg-accent/50")}>
                                <div className={cn("h-2 w-2 rounded-full mt-1.5", !notif.read ? "bg-primary" : "bg-transparent")} />
                                <div className="flex-1">
                                    <p className="text-sm leading-snug">{notif.message}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {formatDistanceToNow(notif.createdAt, { addSuffix: true })}
                                    </p>
                                </div>
                            </DropdownMenuItem>
                        ))
                    )}
                </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <span className="font-semibold">{userDetails.name}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
                <div className="p-4 flex flex-col items-center">
                    <Avatar className="h-20 w-20 border-2 border-primary mb-2">
                      {userDetails.avatarUrl && <AvatarImage src={userDetails.avatarUrl} alt={userDetails.name} />}
                      {!userDetails.avatarUrl && profileImage && <AvatarImage src={profileImage.imageUrl} alt={userDetails.name} />}
                      <AvatarFallback>{userDetails.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-lg font-bold text-foreground">{userDetails.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>Level {userDetails.level}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Award className="w-4 h-4 text-primary" />
                            <span>{userDetails.badges} Badges</span>
                        </div>
                    </div>
                    <div className="w-full mt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Progress value={userDetails.xp} className="h-2" />
                        <span className="text-xs font-semibold text-muted-foreground">{userDetails.xp} XP</span>
                      </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
}
