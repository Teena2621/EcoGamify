
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Upload, File as FileIcon } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useChallengeStore } from '@/hooks/use-challenge-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserStore } from '@/hooks/use-user-store';

const ChallengeItem = ({ challenge }: { challenge: { id: string, question: string, xp: number } }) => {
    const [answer, setAnswer] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const { submitAnswer } = useChallengeStore();
    const { user } = useUserStore();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (answer.trim().length < 10) {
            toast({
                title: 'Answer too short',
                description: 'Please provide a more detailed answer (at least 10 characters).',
                variant: 'destructive',
            });
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            const submissionDetails = `Answer: ${answer}` + (selectedFile ? ` | File: ${selectedFile.name}` : '');
            const studentName = user?.displayName || user?.email || 'Anonymous Student';
            submitAnswer(challenge.id, submissionDetails, studentName);
            setIsSubmitting(false);
            toast({
                title: 'Challenge Submitted!',
                description: `Congratulations! You've earned ${challenge.xp} XP.`,
            });
            setAnswer('');
            setSelectedFile(null);
        }, 1000);
    };

    return (
        <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold">Daily Challenge</CardTitle>
                    <span className="text-lg font-bold text-yellow-500">+{challenge.xp} XP</span>
                </div>
                <CardDescription>{challenge.question}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor={`answer-${challenge.id}`} className="font-semibold">Your written response:</Label>
                        <Textarea
                            id={`answer-${challenge.id}`}
                            placeholder="Type your answer here..."
                            rows={4}
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="bg-white/80 mt-2"
                        />
                    </div>

                    <div>
                        <Label htmlFor={`file-upload-${challenge.id}`} className="font-semibold">Upload evidence (optional):</Label>
                        <Input 
                            id={`file-upload-${challenge.id}`}
                            type="file"
                            onChange={handleFileChange}
                            className="mt-2 bg-white/80"
                            accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            Supported files: Images (JPG, PNG), Videos (MP4), Documents (PDF, DOCX). Max 50MB.
                        </p>
                         {selectedFile && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground bg-background/50 p-2 rounded-md">
                                <FileIcon className="h-4 w-4" />
                                <span>{selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                            </div>
                        )}
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit Answer & File
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default function ChallengesPage() {
    const { challenges } = useChallengeStore();
    const { role } = useUserStore();

    if(role === 'lecturer'){
        return (
             <div className="container mx-auto p-4 md:p-8">
                 <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg text-center p-8">
                    <CardHeader>
                        <CardTitle>View Submissions</CardTitle>
                        <CardDescription>Click the button below to see all student submissions for daily challenges.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button asChild>
                            <Link href="/dashboard/challenges/submissions">
                                View Submissions
                            </Link>
                        </Button>
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
        )
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="max-w-2xl mx-auto space-y-6">
                {challenges.length > 0 ? (
                    challenges.map((challenge) => (
                        <ChallengeItem key={challenge.id} challenge={challenge} />
                    )).reverse() // Show newest challenges first
                ) : (
                    <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg text-center">
                        <CardHeader>
                            <CardTitle>No Challenges Yet</CardTitle>
                            <CardDescription>Check back later for new challenges from your lecturer!</CardDescription>
                        </CardHeader>
                    </Card>
                )}
            </div>
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
