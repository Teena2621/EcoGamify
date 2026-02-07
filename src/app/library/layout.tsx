
import DashboardLayout from '../dashboard/layout';

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
