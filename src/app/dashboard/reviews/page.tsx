
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ReviewsPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || feedback.trim().length < 10) {
      toast({
        title: 'Incomplete Review',
        description: 'Please select a star rating and provide at least 10 characters of feedback.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log({ rating, feedback });
      setIsSubmitting(false);
      toast({
        title: 'Review Submitted!',
        description: "Thank you for your valuable feedback.",
      });
      setRating(0);
      setFeedback('');
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Leave a Review</CardTitle>
            <CardDescription>We value your feedback to improve our platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <label className="font-semibold text-foreground">Your Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        'w-8 h-8 cursor-pointer transition-colors',
                        (hoverRating >= star || rating >= star)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-muted-foreground'
                      )}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="feedback" className="font-semibold text-foreground">Your Suggestions</label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us what you liked or what could be better..."
                  rows={5}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="bg-white/80"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || rating === 0 || feedback.trim().length < 10}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Review'
                )}
              </Button>
            </form>
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
    </div>
  );
}
