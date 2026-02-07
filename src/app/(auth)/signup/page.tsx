
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSignupStore } from '@/hooks/use-signup-store';

const stepOneSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  role: z.enum(["student", "lecturer"], { required_error: "You need to select a role." }),
});

type StepOneForm = z.infer<typeof stepOneSchema>;

export default function SignupStepOnePage() {
  const router = useRouter();
  const { formData, setData } = useSignupStore();

  const form = useForm<StepOneForm>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      role: formData.role
    },
  });

  const onSubmit = (data: StepOneForm) => {
    setData(data);
    router.push('/signup/step-2');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden">
      <Card className="w-full max-w-md shadow-2xl bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-foreground">Create an Account (Step 1/3)</CardTitle>
          <CardDescription className='text-muted-foreground'>
            Let's start with the basics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="firstName" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">First Name</FormLabel>
                    <FormControl><Input placeholder="John" {...field} className="bg-white/80 text-black" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="lastName" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Last Name</FormLabel>
                    <FormControl><Input placeholder="Doe" {...field} className="bg-white/80 text-black" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

               <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Phone Number</FormLabel>
                    <FormControl><Input type="tel" placeholder="e.g. 1234567890" {...field} className="bg-white/80 text-black" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-muted-foreground">I am a...</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="student" id="role-student" />
                          </FormControl>
                          <FormLabel htmlFor="role-student" className="font-normal text-muted-foreground">
                            Student
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="lecturer" id="role-lecturer" />
                          </FormControl>
                          <FormLabel htmlFor="role-lecturer" className="font-normal text-muted-foreground">
                            Lecturer
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">Next</Button>
            </form>
          </Form>

          <div className="mt-4 text-center">
            <Button asChild variant="ghost" className="text-foreground">
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
