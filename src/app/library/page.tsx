
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useLibraryStore } from '@/hooks/use-library-store';

const topics = ['All', 'Renewable Energy', 'Ocean Conservation', 'Forest Ecosystem', 'Climate Change'];

export default function LibraryPage() {
  const { resources } = useLibraryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    // In a real app, this would be calculated from user data
    const count = resources.reduce((acc, resource) => {
      if (typeof window !== 'undefined' && localStorage.getItem(`resource_${resource.id}_read`) === 'true') {
        return acc + 1;
      }
      return acc;
    }, 0);
    setCompletedCount(count);
  }, [resources]);

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesTopic = selectedTopic === 'All' || resource.topic === selectedTopic;
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTopic && matchesSearch;
    });
  }, [searchTerm, selectedTopic, resources]);
  
  const totalResources = resources.length;
  const completionPercentage = totalResources > 0 ? (completedCount / totalResources) * 100 : 0;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="mb-8 bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Knowledge Library</CardTitle>
          <CardDescription className="text-muted-foreground">
            Explore resources, expand your knowledge, and earn XP.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <Input
                type="text"
                placeholder="Search resources..."
                className="flex-grow bg-white/80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select onValueChange={setSelectedTopic} defaultValue={selectedTopic}>
                <SelectTrigger className="w-full md:w-[200px] bg-white/80">
                    <SelectValue placeholder="Filter by topic" />
                </SelectTrigger>
                <SelectContent>
                    {topics.map(topic => (
                    <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1 text-sm text-muted-foreground">
                  <span>Completion Progress</span>
                  <span>{completedCount} / {totalResources}</span>
              </div>
              <Progress value={completionPercentage} className="h-2 w-full" />
            </div>
        </CardContent>
      </Card>
      
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => {
            const resourceImage = PlaceHolderImages.find(p => p.id === resource.id);
            const isRead = typeof window !== 'undefined' ? localStorage.getItem(`resource_${resource.id}_read`) === 'true' : false;
            
            return (
              <Card key={resource.id} className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col animate-slide-in-from-bottom" style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'backwards' }}>
                <CardHeader>
                  <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                    {resourceImage && (
                      <Image
                        src={resourceImage.imageUrl}
                        alt={resource.title}
                        fill
                        className="object-cover"
                        data-ai-hint={resourceImage.imageHint}
                      />
                    )}
                    <Badge className="absolute top-2 right-2 bg-yellow-400 text-black hover:bg-yellow-500">+{resource.xp} XP</Badge>
                  </div>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <Badge variant={isRead ? 'default' : 'secondary'} className={isRead ? 'bg-primary/80' : ''}>
                    {resource.topic}
                  </Badge>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <CardDescription>{resource.description}</CardDescription>
                  <Button asChild className="w-full mt-4">
                    <Link href={`/library/${resource.id}`}>
                      {isRead ? 'Review' : 'View'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        ) : (
          <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg text-center p-8">
            <CardHeader>
                <BookOpen className="w-12 h-12 mx-auto text-muted-foreground" />
                <CardTitle>Library is Empty</CardTitle>
                <CardDescription>No materials found for the selected criteria. Your lecturer may need to upload some!</CardDescription>
            </CardHeader>
        </Card>
      )}

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
