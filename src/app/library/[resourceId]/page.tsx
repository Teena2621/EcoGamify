
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LibraryResource } from '@/lib/library-data';
import { useLibraryStore } from '@/hooks/use-library-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

export default function ResourcePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { resources } = useLibraryStore();
  const resourceId = params.resourceId as string;
  
  const [resource, setResource] = useState<LibraryResource | null>(null);
  const [isRead, setIsRead] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const foundResource = resources.find(r => r.id === resourceId);
    if (foundResource) {
      setResource(foundResource);
      // In a real app, you'd fetch the read status from user data
      const readStatus = localStorage.getItem(`resource_${resourceId}_read`) === 'true';
      setIsRead(readStatus);
    }
  }, [resourceId, resources]);

  const handleMarkAsRead = () => {
    if (isRead) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsRead(true);
      localStorage.setItem(`resource_${resourceId}_read`, 'true');
      toast({
        title: 'Resource Completed!',
        description: `You've earned ${resource?.xp || 0} XP!`,
      });
      setIsLoading(false);
    }, 500);
  };
  
  const resourceImage = PlaceHolderImages.find(p => p.id.startsWith('lib'));

  if (!resource) {
    return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto" />
        <p>Loading resource...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
        <CardHeader className="relative">
          <div className="relative h-64 w-full rounded-t-lg overflow-hidden mb-4">
             {resourceImage && (
              <Image
                src={resourceImage.imageUrl}
                alt={resource.title}
                fill
                className="object-cover"
                data-ai-hint={resourceImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="absolute bottom-6 left-6 text-white">
            <CardTitle className="text-3xl font-bold !text-white">{resource.title}</CardTitle>
            <CardDescription className="!text-gray-200">{resource.description}</CardDescription>
          </div>
          <Badge className="absolute top-10 right-6 bg-yellow-400 text-black hover:bg-yellow-500">+{resource.xp} XP</Badge>
          <Badge variant="secondary" className="absolute top-10 left-6">{resource.topic}</Badge>
        </CardHeader>
        <CardContent>
          <article className="prose prose-lg max-w-none text-foreground">
            <p>{resource.content}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.
            </p>
            <p>
              Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam.
            </p>
          </article>
          
          <div className="mt-8 flex justify-between items-center">
            <Button variant="outline" onClick={() => router.push('/library')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Library
            </Button>
            <Button 
              onClick={handleMarkAsRead} 
              disabled={isRead || isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : isRead ? (
                <CheckCircle className="mr-2 h-4 w-4" />
              ) : null}
              {isRead ? 'Completed' : 'Mark as Read'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
