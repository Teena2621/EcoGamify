
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function ForgotPasswordPage() {
    const auth = useAuth();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast({
                title: 'Email Required',
                description: 'Please enter your email address.',
                variant: 'destructive',
            });
            return;
        }
        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setIsEmailSent(true);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to send password reset email.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl bg-white/30 backdrop-blur-lg border-white/20 text-foreground">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">Forgot Password</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        {isEmailSent
                            ? "Check your inbox for the reset link."
                            : "Enter your email to receive a password reset link."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isEmailSent ? (
                         <Alert>
                            <Mail className="h-4 w-4" />
                            <AlertTitle>Email Sent!</AlertTitle>
                            <AlertDescription>
                                A password reset link has been sent to <strong>{email}</strong>. Please check your inbox (and spam folder) to reset your password.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <form className="space-y-4" onSubmit={handlePasswordReset}>
                            <div className="space-y-2">
                                <Label htmlFor="email" className='text-muted-foreground'>Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="bg-white/80"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
                            </Button>
                        </form>
                    )}

                    <div className="mt-4 text-center">
                        <Button asChild variant="link" className="text-muted-foreground">
                            <Link href="/login">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Login
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
