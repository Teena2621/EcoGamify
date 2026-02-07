
'use client';

import { useUserStore } from '@/hooks/use-user-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import StudentDashboard from '@/components/student-dashboard';
import LecturerDashboard from '@/components/lecturer-dashboard';
import { Loader2 } from 'lucide-react';
import { useUser } from '@/firebase';

export default function DashboardPage() {
    const { role, setUser, user: storedUser } = useUserStore();
    const { user: firebaseUser, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        // Sync firebase auth state with zustand store for real users
        if (firebaseUser && !storedUser) {
            setUser(firebaseUser);
        }
        
        // This is the key change: Redirect only if there's no user, AND no role has been set.
        // This allows our mock student/lecturer logins to proceed.
        if (!isUserLoading && !firebaseUser && !role) {
            router.push('/login');
        }
    }, [firebaseUser, isUserLoading, storedUser, setUser, router, role]);

    if (role === 'lecturer') {
        return <LecturerDashboard />;
    }

    if (role === 'student') {
        return <StudentDashboard />;
    }
    
    // If we have a real firebase user but the role isn't set yet (e.g. after a real signup)
    // we can default to student, or show a loading/selection screen.
    if (firebaseUser) {
        return <StudentDashboard />;
    }

    // Show a loading spinner while we determine the user's status.
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="w-8 h-8 animate-spin" />
        </div>
    );
}
