
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useSignupStore } from '@/hooks/use-signup-store';
import { useAuth } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const stepThreeSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type StepThreeForm = z.infer<typeof stepThreeSchema>;

export default function SignupStepThreePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const { formData, setData, reset } = useSignupStore();

  const form = useForm<StepThreeForm>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: { email: formData.email, password: '' },
  });

  useEffect(() => {
    // If the user somehow lands here without basic info, redirect them back to step 1
    if (!formData.firstName) {
      router.replace('/signup');
    }
  }, [formData, router]);

  const onSubmit = async (data: StepThreeForm) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Update user profile with name
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`
      });

      // Here you would typically also save other formData to your database (e.g., Firestore)
      // For example: await saveUserDataToFirestore(user.uid, formData);

      console.log("Final Signup Data:", { ...formData, ...data });
      toast({ title: 'You have successfully signed up!', description: "Redirecting you to login..." });
      reset(); // Clear the signup form data
      router.push('/login');
    } catch (error: any) {
      toast({
        title: 'Signup Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden">
      <Card className="w-full max-w-md shadow-2xl bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-foreground">Final Step (3/3)</CardTitle>
          <CardDescription className='text-muted-foreground'>
            Set your email and password to complete signup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} className="bg-white/80 text-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="bg-white/80 text-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 pt-4">
                 <Button type="button" variant="outline" onClick={() => router.back()} className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Complete Signup'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
