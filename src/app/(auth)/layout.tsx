import AnimatedBackground from '@/components/animated-background';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AnimatedBackground />
      <main className="relative z-10">{children}</main>
    </div>
  );
}
