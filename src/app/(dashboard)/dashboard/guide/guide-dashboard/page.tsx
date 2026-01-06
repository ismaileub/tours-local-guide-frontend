import DashboardCard from "@/components/shared/DashboardCard";
import { getDashboardData } from "@/helpers/getDashboardData";

const GuideDashboardPage = async () => {
  const res = await getDashboardData();
  const data = res.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Guide Dashboard</h1>
        <p className="text-gray-500">
          Manage your tours, bookings, and earnings
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="My Tours"
          value={data?.myTours}
          color="text-blue-600"
        />
        <DashboardCard
          title="Total Bookings"
          value={data?.totalBookings}
          color="text-indigo-600"
        />
        <DashboardCard
          title="Pending Requests"
          value={data?.pendingRequests}
          color="text-yellow-600"
        />
        <DashboardCard
          title="Confirmed Bookings"
          value={data?.totalConfirmed}
          color="text-green-600"
        />
        <DashboardCard
          title="Cancelled Bookings"
          value={data?.totalCancelled}
          color="text-red-600"
        />
        <DashboardCard
          title="Completed Bookings"
          value={data?.completedBookings}
          color="text-teal-600"
        />
        <DashboardCard
          title="Total Earnings"
          value={`$${data?.totalEarnings}`}
          color="text-purple-600"
        />
        <DashboardCard
          title="Pending Payment"
          value={`$${data?.pendingPayment}`}
          color="text-orange-600"
        />
      </div>
    </div>
  );
};

export default GuideDashboardPage;
