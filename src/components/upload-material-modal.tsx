
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
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useLibraryStore } from '@/hooks/use-library-store';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useNotificationStore } from '@/hooks/use-notification-store';

export function UploadMaterialModal({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
    const { toast } = useToast();
    const { addResource } = useLibraryStore();
    const { addNotification } = useNotificationStore();
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [topic, setTopic] = useState<'Renewable Energy' | 'Ocean Conservation' | 'Forest Ecosystem' | 'Climate Change' | ''>('');


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!selectedFile || !title.trim() || !description.trim() || !topic) {
            toast({
                title: 'Missing Information',
                description: 'Please fill out all fields and select a file.',
                variant: 'destructive',
            });
            return;
        }

        setIsUploading(true);
        // Simulate upload process
        setTimeout(() => {
            addResource({
                id: `resource-${Date.now()}`,
                title,
                description,
                topic,
                type: 'Article', // Assuming all uploads are articles for now
                content: 'This content would come from the uploaded file in a real application.',
                xp: Math.floor(Math.random() * 15) + 15, // 15-30 XP
            });
            addNotification(`New library resource added: "${title}"`);

            setIsUploading(false);
            onOpenChange(false);
            toast({
                title: 'Upload Successful',
                description: `${selectedFile.name} has been added to the library.`,
            });
        }, 1500);
    };

    return (
        <Dialog open onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Upload Library Material</DialogTitle>
                    <DialogDescription>
                        Add a new resource to the student library.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                     <div className="space-y-2">
                        <Label htmlFor="material-title">Resource Title</Label>
                        <Input id="material-title" placeholder="e.g., Basics of Solar Power" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="material-desc">Description</Label>
                        <Textarea id="material-desc" placeholder="A brief summary of the resource." value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label>Topic</Label>
                         <Select onValueChange={(value) => setTopic(value as any)} value={topic}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                                <SelectItem value="Ocean Conservation">Ocean Conservation</SelectItem>
                                <SelectItem value="Forest Ecosystem">Forest Ecosystem</SelectItem>
                                <SelectItem value="Climate Change">Climate Change</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="material-file">Material File</Label>
                        <Input id="material-file" type="file" onChange={handleFileChange} />
                    </div>
                    {selectedFile && <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleUpload} disabled={isUploading || !selectedFile || !title || !description || !topic}>
                        {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Upload to Library
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
