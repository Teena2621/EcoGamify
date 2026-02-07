'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, BookUser } from 'lucide-react';

export default function LoginPage() {

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden">
      <Card className="w-full max-w-md shadow-2xl bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-foreground">Select Your Role</CardTitle>
          <CardDescription className='text-muted-foreground'>Choose your login path to continue.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col space-y-4">
              <Button asChild size="lg">
                <Link href="/login/student">
                    <GraduationCap className="mr-2 h-5 w-5" /> Login as Student
                </Link>
              </Button>
               <Button asChild size="lg" variant="secondary">
                <Link href="/login/lecturer">
                    <BookUser className="mr-2 h-5 w-5" /> Login as Lecturer
                </Link>
              </Button>
              <div className="text-center mt-2">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link href="/signup" className="font-semibold text-primary hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
               <Button asChild variant="ghost" className="mt-4 text-foreground">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
