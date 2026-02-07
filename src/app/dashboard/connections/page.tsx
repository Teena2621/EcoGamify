
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Building, School, Trophy, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const organizations = [
  { name: 'UNESCO', logo: 'https://picsum.photos/seed/unesco/40/40' },
  { name: 'National Geographic', logo: 'https://picsum.photos/seed/natgeo/40/40' },
  { name: 'World Wildlife Fund', logo: 'https://picsum.photos/seed/wwf/40/40' },
];

const awardWinners = [
  { name: 'Greenwood High', award: 'Eco-Innovator Award 2023', logo: 'https://picsum.photos/seed/school1/40/40' },
  { name: 'Oakridge International', award: 'Sustainability Champions 2023', logo: 'https://picsum.photos/seed/school2/40/40' },
  { name: 'Riverdale Academy', award: 'Clean Energy Prize 2023', logo: 'https://picsum.photos/seed/school3/40/40' },
];

const upcomingCompetitions = [
  { name: 'Maplewood School', competition: 'Annual Science Fair', date: '2024-10-15', logo: 'https://picsum.photos/seed/school4/40/40' },
  { name: 'Lakeside Prep', competition: 'State Envirothon', date: '2024-11-05', logo: 'https://picsum.photos/seed/school5/40/40' },
  { name: 'Northpoint Charter', competition: 'Robotics Challenge', date: '2024-11-20', logo: 'https://picsum.photos/seed/school6/40/40' },
];

export default function ConnectionsPage() {
    const { toast } = useToast();

    const handleConnectClick = () => {
        toast({
            title: 'Connected!',
            description: 'You have connected to them.',
        });
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Building />Organizations</CardTitle>
                        <CardDescription>Connect with leading organizations that have hosted environmental events.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {organizations.map((org) => (
                                <li key={org.name} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={org.logo} alt={org.name} />
                                            <AvatarFallback>{org.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-semibold">{org.name}</span>
                                    </div>
                                    <Button onClick={handleConnectClick}>Connect to Them</Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Trophy />Award-Winning Schools</CardTitle>
                        <CardDescription>Schools recognized for their excellence in the past year.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-4">
                            {awardWinners.map((school) => (
                                <li key={school.name} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                                    <div className="flex items-center gap-4">
                                         <Avatar>
                                            <AvatarImage src={school.logo} alt={school.name} />
                                            <AvatarFallback>{school.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{school.name}</p>
                                            <p className="text-sm text-muted-foreground">{school.award}</p>
                                        </div>
                                    </div>
                                    <Button variant="secondary" onClick={handleConnectClick}>Connect</Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                 <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Calendar />Upcoming Competitions</CardTitle>
                        <CardDescription>Connect with schools hosting upcoming events and competitions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-4">
                            {upcomingCompetitions.map((school) => (
                                <li key={school.name} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={school.logo} alt={school.name} />
                                            <AvatarFallback>{school.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{school.name}</p>
                                            <p className="text-sm text-muted-foreground">{school.competition} - {new Date(school.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <Button variant="secondary" onClick={handleConnectClick}>Connect</Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
             <div className="mt-8 text-center">
                <Button asChild variant="outline">
                    <Link href="/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                </Button>
            </div>
        </div>
    );
}
