
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState, ChangeEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useQuizStore } from '@/hooks/use-quiz-store';
import type { Quiz, Question } from '@/lib/quiz-data';
import { useNotificationStore } from '@/hooks/use-notification-store';

export function UploadQuizModal({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
    const { toast } = useToast();
    const { addQuiz } = useQuizStore();
    const { addNotification } = useNotificationStore();


    const [isUploading, setIsUploading] = useState(false);
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);

    const handleNumQuestionsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value, 10) || 0;
        const newCount = Math.max(0, Math.min(20, count)); // Cap at 20 questions

        const newQuestions = Array.from({ length: newCount }, (_, i) => {
            return questions[i] || {
                question: '',
                options: ['', '', '', ''],
                correctAnswer: '',
            };
        });
        setQuestions(newQuestions);
    };

    const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
        const newQuestions = [...questions];
        (newQuestions[index] as any)[field] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    }

    const handleUpload = () => {
        if (!title.trim()) {
            toast({ title: 'Quiz title is missing', variant: 'destructive'});
            return;
        }
        if (questions.length === 0) {
            toast({ title: 'Please add at least one question', variant: 'destructive'});
            return;
        }
        setIsUploading(true);
        // Simulate upload process
        setTimeout(() => {
            const newQuiz: Quiz = {
                id: `quiz-${Date.now()}`,
                title,
                questions: questions,
                timeLimit: questions.length * 60 // 1 minute per question
            };
            addQuiz(newQuiz);
            addNotification(`A new quiz has been posted: "${title}"`);

            setIsUploading(false);
            onOpenChange(false);
            console.log("Quiz Data:", newQuiz);
            toast({
                title: 'Quiz Uploaded Successfully',
                description: 'The new quiz is now available to students.',
            });
        }, 1500);
    };

    return (
        <Dialog open onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Create New Quiz</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to create a new quiz.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="topic">Quiz Title</Label>
                            <Input id="topic" placeholder="e.g., Renewable Energy Basics" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="num-questions">Number of Questions</Label>
                            <Input 
                                id="num-questions" 
                                type="number" 
                                placeholder="e.g., 5" 
                                value={questions.length}
                                onChange={handleNumQuestionsChange}
                                min="0"
                                max="20"
                            />
                        </div>
                    </div>
                    
                    {questions.map((q, index) => (
                        <div key={index} className="space-y-4 border p-4 rounded-lg bg-background/50">
                            <Label className="text-lg font-semibold">Question {index + 1}</Label>
                            <Textarea 
                                placeholder={`Enter question ${index + 1}...`}
                                value={q.question}
                                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {q.options.map((option, oIndex) => (
                                    <div key={oIndex} className="flex items-center gap-2">
                                        <Label htmlFor={`q${index}-opt${oIndex}`} className="font-bold">{String.fromCharCode(65 + oIndex)}:</Label>
                                        <Input
                                            id={`q${index}-opt${oIndex}`}
                                            placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="space-y-2">
                                    <Label>Correct Answer</Label>
                                    <RadioGroup
                                        value={q.correctAnswer}
                                        onValueChange={(value) => handleQuestionChange(index, 'correctAnswer', value)}
                                        className="flex gap-4"
                                    >
                                        {q.options.map((option, oIndex) => (
                                            <div key={oIndex} className="flex items-center space-x-2">
                                                <RadioGroupItem value={option} id={`q${index}-correct-${oIndex}`} />
                                                <Label htmlFor={`q${index}-correct-${oIndex}`}>{String.fromCharCode(65 + oIndex)}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleUpload} disabled={isUploading}>
                        {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Upload Quiz'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
