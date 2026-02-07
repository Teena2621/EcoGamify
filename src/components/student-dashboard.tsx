
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Gamepad2, Video, Puzzle, Trophy, Goal } from 'lucide-react';
import Link from 'next/link';
import DashboardTypingAnimation from '@/components/dashboard-typing-animation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const featureCards = [
  {
    title: 'Video Lectures',
    description: 'Watch engaging video lessons from top educators.',
    icon: Video,
    href: '/dashboard/video-lectures',
  },
  {
    title: 'Quizzes',
    description: 'Test your knowledge and earn points.',
    icon: Puzzle,
    href: '/dashboard/quizzes',
  },
  {
    title: 'Library',
    description: 'Access a wealth of resources and materials.',
    icon: BookOpen,
    href: '/library',
  },
  {
    title: 'Daily Challenges',
    description: 'Take on daily challenges to earn extra points.',
    icon: Goal,
    href: '/dashboard/challenges',
  },
  {
    title: 'Leaderboard',
    description: 'See how you rank against other students.',
    icon: Trophy,
    href: '/dashboard/leaderboard',
  },
  {
    title: 'Games',
    description: 'Learn through interactive and fun games.',
    icon: Gamepad2,
    href: '/dashboard/games',
  },
];

export default function StudentDashboard() {
    const bookImage = PlaceHolderImages.find(p => p.id === 'book-image');
  return (
    <div className="flex flex-col text-foreground font-poppins">
      <div className="flex-grow p-4 md:p-8 animate-fade-in">
        <div className="container mx-auto">
          <Card className="w-full bg-white/30 backdrop-blur-lg border-white/20 mb-8 shadow-lg">
            <CardHeader>
              <DashboardTypingAnimation />
              <CardDescription className="text-muted-foreground animate-fade-in [animation-delay:2s] [animation-fill-mode:backwards]">
                This is your central hub for learning and adventure. Track your progress, access new content, and embark on your next challenge.
              </CardDescription>
            </CardHeader>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feature, index) => (
              <div key={feature.title} className="animate-slide-in-from-bottom" style={{animationDelay: `${2 + index * 0.2}s`, animationFillMode: 'backwards'}}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                    <div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link href={feature.href}>Explore</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <Card className="mt-8 bg-white/30 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
             <div className="grid md:grid-cols-2 items-center">
                <div className="p-8">
                  <BookOpen className="w-10 h-10 text-primary mb-4" />
                  <CardTitle className="text-2xl font-bold mb-2">Explore Material</CardTitle>
                  <CardDescription className="text-muted-foreground mb-4">
                    Browse through course materials, lecture notes, and other educational resources.
                  </CardDescription>
                   <Button asChild size="lg">
                    <Link href="/materials">Browse Materials</Link>
                  </Button>
                </div>
                <div className="relative h-64 md:h-full w-full rounded-r-lg overflow-hidden">
                    {bookImage && (
                        <Image
                            src={bookImage.imageUrl}
                            alt={bookImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={bookImage.imageHint}
                        />
                    )}
                </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
