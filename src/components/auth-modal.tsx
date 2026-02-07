
'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-center">Access Restricted</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            You need to be logged in to access this feature. Please log in or create an account to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <Button asChild className="w-full">
            <Link href="/login">
              <LogIn className="mr-2" /> Login
            </Link>
          </Button>
          <Button asChild variant="secondary" className="w-full">
            <Link href="/signup">
              <UserPlus className="mr-2" /> Sign Up
            </Link>
          </Button>
        </AlertDialogFooter>
        <div className="mt-2 text-center">
            <AlertDialogCancel onClick={onClose} className="w-full sm:w-auto">Cancel</AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
