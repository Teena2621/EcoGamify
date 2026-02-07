
import AnimatedBackground from '@/components/animated-background';
import Sidebar from '@/components/sidebar';
import PageHeader from '@/components/page-header';

function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full">
      <AnimatedBackground />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <PageHeader />
          <main className="relative z-10 flex-grow">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
