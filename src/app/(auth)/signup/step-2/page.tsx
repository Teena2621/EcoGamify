
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSignupStore } from '@/hooks/use-signup-store';
import { Textarea } from '@/components/ui/textarea';

const stepTwoSchema = z.object({
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
});

type StepTwoForm = z.infer<typeof stepTwoSchema>;

export default function SignupStepTwoPage() {
  const router = useRouter();
  const { formData, setData } = useSignupStore();

  const form = useForm<StepTwoForm>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      address: formData.address,
      city: formData.city,
      country: formData.country,
    },
  });

  const onSubmit = (data: StepTwoForm) => {
    setData(data);
    router.push('/signup/step-3');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden">
      <Card className="w-full max-w-md shadow-2xl bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-foreground">Account Details</CardTitle>
          <CardDescription className='text-muted-foreground'>
            Tell us a bit more about yourself.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="123 Main Street" {...field} className="bg-white/80 text-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">City</FormLabel>
                    <FormControl><Input placeholder="New York" {...field} className="bg-white/80 text-black" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Country</FormLabel>
                    <FormControl><Input placeholder="USA" {...field} className="bg-white/80 text-black" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              
              <div className="flex gap-4">
                <Button type="button" variant="secondary" onClick={() => router.back()} className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="submit" className="w-full">Next</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
