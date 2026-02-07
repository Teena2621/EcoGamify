
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useQuizStore } from '@/hooks/use-quiz-store';
import { useState, useEffect } from 'react';

// This is a helper type for the component state
type QuizWithStatus = ReturnType<typeof useQuizStore>['quizzes'][0] & {
    progress: number;
    status: 'Completed' | 'In Progress' | 'Not Started';
};

export default function QuizzesPage() {
  const { quizzes } = useQuizStore();
  const [quizzesWithStatus, setQuizzesWithStatus] = useState<QuizWithStatus[]>([]);
  
  useEffect(() => {
    // In a real app, progress would come from user data.
    // Here, we'll simulate it randomly for demonstration.
    const getSimulatedStatus = (id: string) => {
        const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const rand = (hash % 100) / 100;
        if (rand < 0.33) return { progress: 100, status: 'Completed' as const };
        if (rand < 0.66) return { progress: Math.floor(Math.random() * 60) + 20, status: 'In Progress' as const }; // 20-80%
        return { progress: 0, status: 'Not Started' as const };
    }

    setQuizzesWithStatus(quizzes.map(q => ({
        ...q,
        ...getSimulatedStatus(q.id)
    })));
  }, [quizzes]);


  const getButtonText = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'Review';
      case 'In Progress':
        return 'Resume';
      default:
        return 'Start Quiz';
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      {quizzesWithStatus.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzesWithStatus.map((quiz, index) => (
            <Card key={quiz.id} className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col animate-slide-in-from-bottom" style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'backwards' }}>
              <CardHeader>
                  <div className="flex justify-between items-start">
                      <div>
                          <CardTitle>{quiz.title}</CardTitle>
                      </div>
                      <Badge className="bg-yellow-400 text-black hover:bg-yellow-500 whitespace-nowrap">+{quiz.questions.length * 10} XP</Badge>
                  </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileQuestion className="w-4 h-4" />
                    <span>{quiz.questions.length} Questions</span>
                  </div>
                  <div>
                      <div className="flex justify-between items-center mb-1 text-sm text-muted-foreground">
                          <span>{quiz.status}</span>
                          <span>{quiz.progress}%</span>
                      </div>
                      <Progress value={quiz.progress} className="h-2 w-full" />
                  </div>
                </div>
                 <Button asChild className="w-full mt-4">
                  <Link href={`/dashboard/quizzes/${quiz.id}`}>
                    {getButtonText(quiz.status)}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
         <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg text-center p-8">
            <CardHeader>
                <FileQuestion className="w-12 h-12 mx-auto text-muted-foreground" />
                <CardTitle>No Quizzes Available</CardTitle>
                <CardDescription>Your lecturer hasn't posted any quizzes yet. Check back soon!</CardDescription>
            </CardHeader>
        </Card>
      )}
      <div className="mt-8 text-center">
          <Button asChild variant="outline">
              <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
              </Link>
          </Button>
      </div>
    </div>
  );
}
