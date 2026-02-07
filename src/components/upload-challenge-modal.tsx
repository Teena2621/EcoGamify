
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useChallengeStore } from '@/hooks/use-challenge-store';
import { useNotificationStore } from '@/hooks/use-notification-store';

export function UploadChallengeModal({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [challengeText, setChallengeText] = useState('');
    const { addChallenge } = useChallengeStore();
    const { addNotification } = useNotificationStore();


    const handleUpload = () => {
        if (!challengeText.trim()) {
            toast({
                title: 'Challenge is empty',
                description: 'Please write a question for the daily challenge.',
                variant: 'destructive',
            });
            return;
        }

        setIsUploading(true);
        // Simulate upload process
        setTimeout(() => {
            addChallenge(challengeText);
            addNotification(`A new daily challenge has been posted: "${challengeText.substring(0, 30)}..."`);
            setIsUploading(false);
            onOpenChange(false);
            toast({
                title: 'Challenge Published',
                description: 'The new daily challenge is now live for all students.',
            });
        }, 1000);
    };

    return (
        <Dialog open onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Upload Daily Challenge</DialogTitle>
                    <DialogDescription>
                        Write the question for today's challenge. It will be visible to all students.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="challenge-question">Challenge Question</Label>
                        <Textarea 
                            id="challenge-question" 
                            placeholder="e.g., What are three simple ways to save water at home?" 
                            rows={4}
                            value={challengeText}
                            onChange={(e) => setChallengeText(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleUpload} disabled={isUploading || !challengeText.trim()}>
                        {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Publish Challenge
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
