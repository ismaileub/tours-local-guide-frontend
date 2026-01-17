import Sidebar from "@/components/shared/Sidebar";
import MobileSidebar from "@/components/shared/MobileSidebar";
import { getUserSession } from "@/helpers/getUserSession";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();

  if (!session) redirect("/login");

  return (
    <main className="h-screen flex bg-gray-50 overflow-hidden">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* CONTENT AREA */}
      <section className="flex-1 overflow-y-auto">
        {/* MOBILE HEADER */}
        <div className="md:hidden flex items-center gap-3 border-b bg-white px-4 py-3">
          <MobileSidebar />
          <h1 className="text-sm font-semibold">Dashboard</h1>
        </div>

        {/* PAGE CONTENT */}
        <div className="px-3 py-4 md:p-6">{children}</div>
      </section>
    </main>
  );
}
