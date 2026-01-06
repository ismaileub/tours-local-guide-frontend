import DashboardCard from "@/components/shared/DashboardCard";
import { getDashboardData } from "@/helpers/getDashboardData";

const AdminDashboardPage = async () => {
  const res = await getDashboardData();
  const data = res.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">
          Manage users, bookings, tours, and platform revenue
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Users" value={data?.totalUsers} />
        <DashboardCard title="Total Guides" value={data?.totalGuides} />
        <DashboardCard title="Total Tourists" value={data?.totalTourists} />
        <DashboardCard title="Total Tours" value={data?.totalTours} />

        <DashboardCard
          title="Completed Bookings"
          value={data.totalCompletedBookings}
        />

        <DashboardCard title="Total Revenue" value={`$${data?.totalRevenue}`} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
