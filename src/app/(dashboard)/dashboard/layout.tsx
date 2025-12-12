import Sidebar from "@/components/shared/Sidebar";
import { getUserSession } from "@/helpers/getUserSession";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();

  // If no session, redirect to login
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen flex bg-gray-50">
      <Sidebar /> {/* Sidebar role-based */}
      <section className="flex-1 p-6">
        {children} {/* Dashboard Home / Other pages */}
      </section>
    </main>
  );
}
