import { getUserSession } from "@/helpers/getUserSession";

export default async function DashboardHome() {
  const session = await getUserSession();
  const role = session?.user?.role;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">Welcome, {session?.user?.name}!</h1>
      <p className="text-gray-600">{session?.user?.email}</p>

      <div className="mt-6 p-6 bg-white rounded-xl shadow-md">
        {role === "ADMIN" && <AdminDashboard />}
        {role === "GUIDE" && <GuideDashboard />}
        {role === "TOURIST" && <TouristDashboard />}
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <p className="text-lg text-blue-600 font-semibold">
      Admin Panel: Manage users, bookings, and guides.
    </p>
  );
}

function GuideDashboard() {
  return (
    <p className="text-lg text-green-600 font-semibold">
      Guide Panel: Manage tours & schedules.
    </p>
  );
}

function TouristDashboard() {
  return (
    <p className="text-lg text-purple-600 font-semibold">
      Tourist Panel: View tours & book guides.
    </p>
  );
}
