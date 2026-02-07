 'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ArrowLeft, Eye, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { DoubtModal } from '@/components/doubt-modal';
import { useUserStore } from '@/hooks/use-user-store';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Video {
  id: string;
  title: string;
  url: string;
  required_points: number;
  reward_points: number;
}

interface Doubt {
  id: string;
  lecture_id: string;
  student_name: string;
  question: string;
  reply: string | null;
  created_at: string;
  replied_at: string | null;
}

export default function VideoLecturesPage() {
  const { role } = useUserStore();
  const [videos, setVideos] = useState<Video[]>([]);
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [loading, setLoading] = useState(true);
  const [doubtingVideoId, setDoubtingVideoId] = useState<string | null>(null);
  const [replies, setReplies] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    async function fetchData() {
      const { data: videosData, error: videosError } = await supabase.from('videos').select('*');
      const { data: doubtsData, error: doubtsError } = await supabase.from('doubts').select('*');

      if (videosError) console.error(videosError);
      else setVideos(videosData as Video[]);

      if (doubtsError) console.error(doubtsError);
      else setDoubts(doubtsData as Doubt[]);

      setLoading(false);
    }
    fetchData();
  }, []);

  const doubtingVideo = videos.find(v => v.id === doubtingVideoId);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  
  if (role === 'lecturer') {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <Card className="mb-8 bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle>Student Doubts</CardTitle>
            <CardDescription>Reply to student doubts on your lectures.</CardDescription>
          </CardHeader>
        </Card>

        <Accordion type="multiple" className="w-full space-y-4">
          {videos.map(video => {
            const videoDoubts = doubts.filter(d => d.lecture_id === video.id);
            return (
              <AccordionItem key={video.id} value={video.id} className="bg-white/30 backdrop-blur-lg border-white/20 rounded-lg shadow-md">
                <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline text-left flex justify-between">
                  <span>{video.title}</span>
                  <Badge>{videoDoubts.length} doubt(s)</Badge>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0 space-y-4 text-muted-foreground">
                  {videoDoubts.length === 0 && <p>No doubts yet.</p>}
                  {videoDoubts.map(doubt => (
                    <div key={doubt.id} className="p-4 rounded-md bg-background/50 flex flex-col gap-2">
                      <p><strong>{doubt.student_name} asked:</strong> {doubt.question}</p>
                      {doubt.reply ? (
                        <p className="text-green-600"><strong>Reply:</strong> {doubt.reply}</p>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Type reply"
                            value={replies[doubt.id] || ''}
                            onChange={e => setReplies(prev => ({ ...prev, [doubt.id]: e.target.value }))}
                            className="border p-1 rounded flex-grow"
                          />
                          <Button onClick={async () => {
                            const replyText = replies[doubt.id];
                            if (!replyText) return;
                            const { error } = await supabase
                              .from('doubts')
                              .update({ reply: replyText, replied_at: new Date().toISOString() })
                              .eq('id', doubt.id);
                            if (error) console.error(error);
                            else setDoubts(prev => prev.map(d => d.id === doubt.id ? { ...d, reply: replyText, replied_at: new Date().toISOString() } : d));
                          }}>Reply</Button>
                        </div>
                      )}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  
  return (
    <div className="container mx-auto p-4 md:p-8">
      {doubtingVideo && (
        <DoubtModal
          lectureId={doubtingVideo.id}
          lectureTitle={doubtingVideo.title}
          onClose={() => setDoubtingVideoId(null)}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(video => {
          const videoDoubts = doubts.filter(d => d.lecture_id === video.id && d.student_name === 'John Doe'); // replace with logged-in student
          return (
            <Card key={video.id} className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg flex flex-col">
              <CardContent className="flex-grow flex flex-col justify-between p-4">
                <CardTitle>{video.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Progress value={0} className="h-2 w-full" />
                  <span>0%</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button asChild className="w-full">
                    <a href={video.url} target="_blank" rel="noopener noreferrer">
                      <Eye className="mr-2 h-4 w-4" />Watch
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setDoubtingVideoId(video.id)}>
                    <HelpCircle className="mr-2 h-4 w-4" />Doubt
                  </Button>
                </div>
                {videoDoubts.length > 0 && videoDoubts[0].reply && (
                  <p className="mt-2 text-green-600">Reply: {videoDoubts[0].reply}</p>
                )}
                <div className="mt-2 flex justify-between">
                  <Badge variant="secondary">{video.required_points} pts</Badge>
                  <Badge className="bg-yellow-400 text-black hover:bg-yellow-500">{video.reward_points} XP</Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>
    </div>
  )
}
