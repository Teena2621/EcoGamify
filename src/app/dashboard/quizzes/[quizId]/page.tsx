
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Quiz } from '@/lib/quiz-data';
import { useQuizStore } from '@/hooks/use-quiz-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Award, CheckCircle, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function QuizPage() {
  const params = useParams();
  const { quizzes } = useQuizStore();
  const quizId = params.quizId as string;
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const foundQuiz = quizzes.find(q => q.id === quizId);
    if (foundQuiz) {
      setQuiz(foundQuiz);
      setTimeLeft(foundQuiz.timeLimit);
    }
  }, [quizId, quizzes]);

  useEffect(() => {
    if (!quiz || isSubmitted || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, timeLeft, isSubmitted]);

  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);


  const handleNext = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (!quiz) return;
    let newScore = 0;
    quiz.questions.forEach((q, index) => {
      if (q.correctAnswer === selectedAnswers[index]) {
        newScore++;
      }
    });
    setScore(newScore);
    setIsSubmitted(true);
  };

  const handleSelectAnswer = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({...prev, [questionIndex]: answer}));
  }

  if (!quiz) {
    return <div>Quiz not found. You may need to add it first.</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  if (isSubmitted) {
    return (
        <div className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-[calc(100vh-10rem)]">
            <Card className="w-full max-w-2xl bg-white/30 backdrop-blur-lg border-white/20 shadow-lg text-center">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Quiz Results</CardTitle>
                    <CardDescription>You have completed the {quiz.title}.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-center gap-4 text-6xl font-bold text-primary">
                        <Award className="w-16 h-16" />
                        <span>{score} / {quiz.questions.length}</span>
                    </div>
                    <div className="text-lg">
                        You earned <span className="font-bold text-yellow-500">{score * 10} XP</span>!
                    </div>

                    <div className="text-left space-y-4">
                        <h3 className="font-bold text-xl mb-2">Review Your Answers:</h3>
                        {quiz.questions.map((q, index) => (
                            <div key={index} className="border-t pt-2">
                                <p className="font-semibold">{index + 1}. {q.question}</p>
                                <p className={selectedAnswers[index] === q.correctAnswer ? 'text-green-600' : 'text-red-600'}>
                                    Your answer: {selectedAnswers[index] || 'No answer'}
                                    {selectedAnswers[index] === q.correctAnswer ? 
                                        <CheckCircle className="inline ml-2" /> : 
                                        <XCircle className="inline ml-2" />}
                                </p>
                                {selectedAnswers[index] !== q.correctAnswer && (
                                    <p className="text-green-700">Correct answer: {q.correctAnswer}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <Button asChild>
                      <Link href="/dashboard/quizzes">Back to Quizzes</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-4 bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-xl font-bold">{quiz.title}</CardTitle>
                    <CardDescription>Question {currentQuestionIndex + 1} of {quiz.questions.length}</CardDescription>
                </div>
                 <div className="flex items-center gap-2 font-bold text-lg text-primary">
                    <Clock className="w-6 h-6" />
                    <span>{Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</span>
                </div>
            </CardHeader>
             <Progress value={(currentQuestionIndex + 1) / quiz.questions.length * 100} className="h-1" />
        </Card>

        <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
            <CardContent className="p-6">
                <p className="text-lg font-semibold mb-6">{currentQuestion.question}</p>

                <RadioGroup 
                    onValueChange={(value) => handleSelectAnswer(currentQuestionIndex, value)}
                    value={selectedAnswers[currentQuestionIndex]}
                    className="space-y-4"
                >
                    {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-background/50 p-4 rounded-lg border">
                           <RadioGroupItem value={option} id={`q${currentQuestionIndex}-o${index}`} />
                           <Label htmlFor={`q${currentQuestionIndex}-o${index}`} className="text-base flex-1 cursor-pointer">{option}</Label>
                        </div>
                    ))}
                </RadioGroup>

                <div className="mt-8 flex justify-end">
                    {currentQuestionIndex < quiz.questions.length - 1 ? (
                        <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestionIndex]}>Next Question</Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={!selectedAnswers[currentQuestionIndex]}>Submit Quiz</Button>
                    )}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
