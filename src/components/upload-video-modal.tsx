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

interface UploadVideoModalProps {
  onClose: () => void;
}

export function UploadVideoModal({ onClose }: UploadVideoModalProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [requiredPoints, setRequiredPoints] = useState<number>(0);
  const [rewardPoints, setRewardPoints] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!title || !url) {
      alert('Please provide both title and URL.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('videos').insert([
        {
          title: title,
          url: url,
          required_points: requiredPoints, // match snake_case in Supabase
          reward_points: rewardPoints      // match snake_case in Supabase
        }
      ]);

      if (error) {
        console.error('Error uploading video:', error);
        alert('Failed to upload video: ' + error.message);
      } else {
        alert('Video uploaded successfully!');
        onClose(); // close modal after success
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Failed to upload video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Video</DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-2">
          <Input
            placeholder="Video Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Input
            placeholder="YouTube URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Required Points"
            value={requiredPoints}
            onChange={e => setRequiredPoints(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Reward Points"
            value={rewardPoints}
            onChange={e => setRewardPoints(Number(e.target.value))}
          />
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpload} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
