
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, Trophy, Eye } from 'lucide-react';
import DashboardTypingAnimation from './dashboard-typing-animation';
import { UploadVideoModal } from './upload-video-modal';
import { UploadQuizModal } from './upload-quiz-modal';
import { UploadMaterialModal } from './upload-material-modal';
import { UploadChallengeModal } from './upload-challenge-modal';
import Link from 'next/link';

type ModalType = 'video' | 'quiz' | 'material' | 'challenge' | null;

const sections = [
    { id: 'video', title: 'Videos & Doubts', description: 'Manage lectures and view student doubts.', href: '/dashboard/video-lectures', showUpload: true, showView: true },
    { id: 'quiz', title: 'Quizzes', description: 'Create and manage quizzes.', href: '/dashboard/quizzes', showUpload: true, showView: false },
    { id: 'material', title: 'Materials', description: 'Upload and organize course materials.', href: '/library', showUpload: true, showView: false },
    { id: 'challenge', title: 'Daily Challenges', description: 'Set challenges and view submissions.', href: '/dashboard/challenges/submissions', showUpload: true, showView: true },
    { id: 'leaderboard', title: 'Leaderboard', description: 'View student rankings.', href: '/dashboard/leaderboard', showUpload: false, showView: false },
];

export default function LecturerDashboard() {
    const [openModal, setOpenModal] = useState<ModalType>(null);

    const renderModal = () => {
        switch (openModal) {
            case 'video':
                return <UploadVideoModal onOpenChange={() => setOpenModal(null)} />;
            case 'quiz':
                return <UploadQuizModal onOpenChange={() => setOpenModal(null)} />;
            case 'material':
                return <UploadMaterialModal onOpenChange={() => setOpenModal(null)} />;
            case 'challenge':
                return <UploadChallengeModal onOpenChange={() => setOpenModal(null)} />;
            default:
                return null;
        }
    }

    return (
        <div className="flex flex-col text-foreground font-poppins">
            <div className="flex-grow p-4 md:p-8 animate-fade-in">
                <div className="container mx-auto">
                    <Card className="w-full bg-white/30 backdrop-blur-lg border-white/20 mb-8 shadow-lg">
                        <CardHeader>
                            <DashboardTypingAnimation />
                            <CardDescription className="text-muted-foreground animate-fade-in [animation-delay:2s] [animation-fill-mode:backwards]">
                                This is your central hub for managing course content. Upload videos, create quizzes, and engage with your students.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sections.map((section, index) => (
                             <Card key={section.id} className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-from-bottom" style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'backwards' }}>
                                <CardHeader>
                                    <CardTitle>{section.title}</CardTitle>
                                    <CardDescription>{section.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex items-center justify-between">
                                    <div className='flex gap-2'>
                                      {section.showView && (
                                         <Button variant="outline" asChild>
                                            <Link href={section.href}><Eye className="mr-2 h-4 w-4" />View</Link>
                                        </Button>
                                      )}
                                      {!section.showView && (
                                        <Button variant="outline" asChild>
                                            <Link href={section.href}>Explore</Link>
                                        </Button>
                                      )}
                                    </div>
                                    {section.showUpload && (
                                        <Button onClick={() => setOpenModal(section.id as ModalType)}>
                                            <UploadCloud className="mr-2 h-4 w-4" />
                                            Upload
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            {renderModal()}
        </div>
    );
}
