import ProtectedAdmin from "@/components/ProtectedAdmin";
import Sidebar from "@/components/Sidebar";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedAdmin>
      <Sidebar />
      <main className="md:pl-60">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">{children}</div>
      </main>
    </ProtectedAdmin>
  );
}