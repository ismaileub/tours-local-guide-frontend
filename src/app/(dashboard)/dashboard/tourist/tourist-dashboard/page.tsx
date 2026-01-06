import DashboardCard from "@/components/shared/DashboardCard";
import { getDashboardData } from "@/helpers/getDashboardData";

const TouristDashboardPage = async () => {
  const res = await getDashboardData();
  const data = res.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Tourist Dashboard</h1>
        <p className="text-gray-500">
          Track your bookings, payments, and travel history
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Bookings"
          value={data.myBookings}
          color="text-indigo-600"
        />
        <DashboardCard
          title="Completed Bookings"
          value={data.completedTours}
          color="text-green-600"
        />
        <DashboardCard
          title="Total Spent"
          value={`$${data.totalSpent}`}
          color="text-purple-600"
        />
        <DashboardCard
          title="Unpaid Amount"
          value={`$${data.unpaidAmount}`}
          color="text-orange-600"
        />
        <DashboardCard
          title="Unpaid Bookings"
          value={data.unpaidBookings}
          color="text-yellow-600"
        />
      </div>
    </div>
  );
};

export default TouristDashboardPage;
