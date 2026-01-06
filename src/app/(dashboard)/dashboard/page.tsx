// app/dashboard/page.tsx
import { getUserSession } from "@/helpers/getUserSession";
import { redirect } from "next/navigation";

export default async function DashboardHome() {
  const session = await getUserSession();

  if (!session) {
    redirect("/login");
  }

  const role = session?.user?.role;

  if (role === "ADMIN") redirect("/dashboard/admin/admin-dashboard");
  if (role === "GUIDE") redirect("/dashboard/guide/guide-dashboard");
  if (role === "TOURIST") redirect("/dashboard/tourist/tourist-dashboard");

  return <div>Redirecting...</div>;
}
