
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useChallengeStore } from '@/hooks/use-challenge-store';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { useMemo } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type Submission = {
  challengeId: string;
  studentName: string;
  answer: string;
  submittedAt: Date;
};

export default function SubmissionsPage() {
  const { submissions, challenges } = useChallengeStore();

  const submissionsByStudent = useMemo(() => {
    return submissions.reduce((acc, submission) => {
      if (!acc[submission.studentName]) {
        acc[submission.studentName] = [];
      }
      acc[submission.studentName].push(submission);
      return acc;
    }, {} as Record<string, Submission[]>);
  }, [submissions]);

  const getChallengeQuestion = (challengeId: string) => {
    return challenges.find((c) => c.id === challengeId)?.question || 'Unknown Challenge';
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name[0]?.toUpperCase() || 'S';
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-3xl font-bold">Challenge Submissions</CardTitle>
                <CardDescription>
                  Review student submissions for the daily challenges, grouped by student.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {Object.keys(submissionsByStudent).length > 0 ? (
              <Accordion type="multiple" className="w-full space-y-4">
                {Object.entries(submissionsByStudent).map(([studentName, studentSubmissions]) => (
                  <AccordionItem key={studentName} value={studentName} className="bg-background/50 border-border rounded-lg">
                    <AccordionTrigger className="p-4 hover:no-underline">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{getInitials(studentName)}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <p className="text-lg font-semibold">{studentName}</p>
                          <p className="text-sm text-muted-foreground">{studentSubmissions.length} submission(s)</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Challenge Question</TableHead>
                            <TableHead>Answer</TableHead>
                            <TableHead className="text-right">Submitted</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentSubmissions.map((submission, index) => (
                            <TableRow key={index} className="bg-transparent hover:bg-black/5">
                              <TableCell className="font-medium">
                                {getChallengeQuestion(submission.challengeId)}
                              </TableCell>
                              <TableCell>{submission.answer}</TableCell>
                              <TableCell className="text-right">
                                <Badge variant="outline">
                                  {formatDistanceToNow(submission.submittedAt, { addSuffix: true })}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No submissions have been made yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
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
