import Sidebar from "@/components/shared/Sidebar";
import { getUserSession } from "@/helpers/getUserSession";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <section className="flex-1 p-6">{children}</section>
    </main>
  );
}
