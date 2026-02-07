
'use client';
import { useState, useEffect } from 'react';
import SplashScreen from '@/components/splash-screen';
import { cn } from '@/lib/utils';
import AppHeader from '@/components/app-header';
import AnimatedBackground from '@/components/animated-background';
import Footer from '@/components/footer';
import LectureSlideshow from '@/components/lecture-slideshow';
import GameSection from '@/components/game-section';
import EnvironmentalPictures from '@/components/environmental-pictures';
import HeroSection from '@/components/hero-section';
import ContactForm from '@/components/contact-form';
import { AuthModal } from '@/components/auth-modal';
import Sidebar from '@/components/sidebar';


export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleProtectedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAuthModalOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full">
      <AnimatedBackground />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <AppHeader />
          <main className="relative z-10 flex-grow">
            <>
              <div className="flex flex-col min-h-screen text-foreground animate-fade-in duration-1000">
                <div className="flex-grow">
                  <div className="container mx-auto px-4 md:px-6 py-8">
                    <div className="space-y-12">
                      <HeroSection />
                      <div onClickCapture={handleProtectedClick}>
                        <EnvironmentalPictures />
                      </div>
                      <div onClickCapture={handleProtectedClick}>
                        <GameSection />
                      </div>
                      <div onClickCapture={handleProtectedClick}>
                        <LectureSlideshow />
                      </div>
                      <ContactForm />
                    </div>
                  </div>
                </div>
                <div onClickCapture={handleProtectedClick}>
                  <Footer />
                </div>
              </div>
              <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            </>
            <div
              className={cn(
                "fixed inset-0 z-[100] transition-opacity duration-1000",
                loading ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              <SplashScreen />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
