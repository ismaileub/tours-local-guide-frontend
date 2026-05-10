import DashboardCard from "@/components/shared/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDashboardData } from "@/helpers/getDashboardData";

type DashboardSummary = {
  totalUsers: number;
  totalGuides: number;
  totalTourists: number;
  totalTours: number;
  totalCompletedBookings: number;
  totalRevenue: number;
};

const AdminDashboardPage = async () => {
  const fallbackData: DashboardSummary = {
    totalUsers: 0,
    totalGuides: 0,
    totalTourists: 0,
    totalTours: 0,
    totalCompletedBookings: 0,
    totalRevenue: 0,
  };

  let data: DashboardSummary = fallbackData;
  let isLiveData = false;

  try {
    const res = await getDashboardData();
    data = {
      ...fallbackData,
      ...(res?.data ?? {}),
    } as DashboardSummary;
    isLiveData = true;
  } catch {
    data = fallbackData;
  }

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("en-US").format(value);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const revenuePerUser =
    data.totalUsers > 0 ? data.totalRevenue / data.totalUsers : 0;

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">
                Admin Dashboard
              </h1>
              <Badge className="bg-white/15 text-white hover:bg-white/20">
                {isLiveData ? "Live" : "Offline"}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-white/70">
              Monitor platform health, growth, and operational performance.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              className="bg-white/10 text-white hover:bg-white/20"
              variant="ghost"
            >
              Download Report
            </Button>
            <Button className="bg-white text-slate-900 hover:bg-slate-100">
              Create Announcement
            </Button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wide text-white/60">
              Revenue per user
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {formatCurrency(revenuePerUser)}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wide text-white/60">
              Completed bookings
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {formatNumber(data.totalCompletedBookings)}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wide text-white/60">
              Total revenue
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {formatCurrency(data.totalRevenue)}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Key metrics</h2>
          <p className="text-sm text-muted-foreground">
            Live summary of users, tours, and bookings.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <DashboardCard
            title="Total Users"
            value={formatNumber(data.totalUsers)}
          />
          <DashboardCard
            title="Total Guides"
            value={formatNumber(data.totalGuides)}
          />
          <DashboardCard
            title="Total Tourists"
            value={formatNumber(data.totalTourists)}
          />
          <DashboardCard
            title="Total Tours"
            value={formatNumber(data.totalTours)}
          />
          <DashboardCard
            title="Completed Bookings"
            value={formatNumber(data.totalCompletedBookings)}
          />
          <DashboardCard
            title="Total Revenue"
            value={formatCurrency(data.totalRevenue)}
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6 shadow-sm lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold">Operational insights</h3>
              <p className="text-sm text-muted-foreground">
                Review platform performance signals at a glance.
              </p>
            </div>
            <Badge variant="secondary">Updated now</Badge>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Guides coverage
              </p>
              <p className="mt-2 text-xl font-semibold">
                {data.totalGuides > 0 ? "Healthy" : "Needs growth"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Keep onboarding guides to cover demand spikes.
              </p>
            </div>
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Tourist demand
              </p>
              <p className="mt-2 text-xl font-semibold">
                {data.totalTourists > 0 ? "Active" : "Monitor"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Use campaigns to keep engagement consistent.
              </p>
            </div>
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Tour catalog
              </p>
              <p className="mt-2 text-xl font-semibold">
                {data.totalTours > 0 ? "Diverse" : "Build inventory"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Add premium experiences to lift revenue.
              </p>
            </div>
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Booking throughput
              </p>
              <p className="mt-2 text-xl font-semibold">
                {data.totalCompletedBookings > 0 ? "Stable" : "Starting"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Ensure booking flow stays frictionless.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h3 className="text-base font-semibold">Quick actions</h3>
          <p className="text-sm text-muted-foreground">
            Run common admin workflows quickly.
          </p>
          <div className="mt-5 space-y-3">
            <Button className="w-full" variant="secondary">
              Review new tour submissions
            </Button>
            <Button className="w-full" variant="outline">
              Verify guide profiles
            </Button>
            <Button className="w-full" variant="outline">
              Export bookings
            </Button>
            <Button className="w-full" variant="ghost">
              Configure pricing rules
            </Button>
          </div>
          <div className="mt-6 rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">System status</p>
              <Badge variant="secondary">All systems normal</Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Payments, auth, and bookings are operational.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
