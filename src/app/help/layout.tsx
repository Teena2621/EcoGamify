
import DashboardLayout from '../dashboard/layout';

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
