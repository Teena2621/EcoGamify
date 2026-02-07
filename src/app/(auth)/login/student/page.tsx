
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import NatureScene from '@/components/nature-scene';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/hooks/use-user-store';

export default function StudentLoginPage() {
    const router = useRouter();
    const { setRole } = useUserStore();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // This is a mock login. In a real app, you'd authenticate here.
        setRole('student');
        router.push('/dashboard');
    }

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center p-4 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <NatureScene />
            </div>

            <div className="grid md:grid-cols-2 gap-0 max-w-4xl w-full mx-auto rounded-xl shadow-2xl overflow-hidden border border-white/20">
                <div className="hidden md:block relative h-full">
                    <NatureScene isAnimated={true} />
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <Card className="w-full h-full bg-white/30 backdrop-blur-lg rounded-none md:rounded-r-xl border-none">
                    <CardHeader className="text-center pt-4">
                        <CardTitle className="text-3xl font-bold text-foreground">Student Login</CardTitle>
                        <CardDescription className="text-muted-foreground">Welcome back, future leader!</CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-4">
                        <form className="space-y-2" onSubmit={handleLogin}>
                             <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" placeholder="John Doe" className="bg-white/80" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="student@example.com" className="bg-white/80" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="••••••••" className="bg-white/80" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="text-right text-sm">
                                <Link href="/forgot-password" passHref>
                                    <span className="font-semibold text-primary hover:underline cursor-pointer">
                                        Forgot Password?
                                    </span>
                                </Link>
                            </div>
                            <Button type="submit" className="w-full !mt-3" size="lg" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin" /> : 'Submit'}
                            </Button>
                        </form>

                        <div className="text-center mt-2">
                          <p className="text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <Link href="/signup" className="font-semibold text-primary hover:underline">
                              Sign Up
                            </Link>
                          </p>
                        </div>
                        
                        <div className="mt-2 text-center">
                            <Button asChild variant="link" className="text-muted-foreground">
                                <Link href="/login">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to role selection
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
