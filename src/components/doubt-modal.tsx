 'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface DoubtModalProps {
  lectureId: string;
  lectureTitle: string;
  onClose: () => void;
}

export function DoubtModal({ lectureId, lectureTitle, onClose }: DoubtModalProps) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('doubts').insert([
        {
          lecture_id: lectureId,
          question,
          student_name: 'John Doe' // replace with actual logged-in user
        }
      ]);
      if (error) throw error;
      setQuestion('');
      onClose();
    } catch (err) {
      console.error('Error adding doubt:', err);
      alert('Failed to submit doubt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ask a doubt about: {lectureTitle}</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <Input
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Type your question here"
          />
        </div>
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
