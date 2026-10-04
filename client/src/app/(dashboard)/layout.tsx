import ProtectedRoute from "@/components/ui/ProtectedRoute";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="container-x py-10">
        <div className="flex flex-col gap-6 md:flex-row">
          <Sidebar />
          <section className="min-w-0 flex-1">{children}</section>
        </div>
      </div>
    </ProtectedRoute>
  );
}