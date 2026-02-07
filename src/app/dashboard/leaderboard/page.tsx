
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const leaderboardData = [
  { rank: 1, name: 'EcoWarrior', xp: 5280, avatar: 'https://picsum.photos/seed/user1/40/40' },
  { rank: 2, name: 'GreenThumb', xp: 4950, avatar: 'https://picsum.photos/seed/user2/40/40' },
  { rank: 3, name: 'PlanetProtector', xp: 4800, avatar: 'https://picsum.photos/seed/user3/40/40' },
  { rank: 4, name: 'RecycleRanger', xp: 4500, avatar: 'https://picsum.photos/seed/user4/40/40' },
  { rank: 5, name: 'You', xp: 4320, avatar: 'https://picsum.photos/seed/you/40/40', isCurrentUser: true },
  { rank: 6, name: 'NatureNerd', xp: 4100, avatar: 'https://picsum.photos/seed/user6/40/40' },
  { rank: 7, name: 'SolarSavvy', xp: 3980, avatar: 'https://picsum.photos/seed/user7/40/40' },
  { rank: 8, name: 'WaterWizard', xp: 3850, avatar: 'https://picsum.photos/seed/user8/40/40' },
  { rank: 9, name: 'ForestFriend', xp: 3700, avatar: 'https://picsum.photos/seed/user9/40/40' },
  { rank: 10, name: 'ClimateChamp', xp: 3650, avatar: 'https://picsum.photos/seed/user10/40/40' },
];

export default function LeaderboardPage() {

    const getRankColor = (rank: number) => {
        if (rank === 1) return 'text-yellow-400';
        if (rank === 2) return 'text-gray-400';
        if (rank === 3) return 'text-amber-600';
        return 'text-foreground';
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card className="max-w-3xl mx-auto bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
                <CardHeader className="text-center">
                    <Trophy className="w-12 h-12 mx-auto text-yellow-400" />
                    <CardTitle className="text-3xl font-bold">Leaderboard</CardTitle>
                    <CardDescription>See who's leading the charge in environmental education!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Rank</TableHead>
                                <TableHead>Player</TableHead>
                                <TableHead className="text-right">XP</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaderboardData.map((player) => (
                                <TableRow key={player.rank} className={player.isCurrentUser ? 'bg-primary/20' : ''}>
                                    <TableCell className={`text-center font-bold text-lg ${getRankColor(player.rank)}`}>
                                        {player.rank}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={player.avatar} alt={player.name} />
                                                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{player.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">
                                        <Badge variant="secondary">{player.xp.toLocaleString()}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
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
