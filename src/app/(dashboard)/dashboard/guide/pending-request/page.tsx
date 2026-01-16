import PendingBookingsTable from "@/components/modules/Bookings/PandingBookingTable";
import { getUserSession } from "@/helpers/getUserSession";

const PendingBookingsPage = async () => {
  const session = await getUserSession();
  const token = session?.user?.accessToken as string;
  return <PendingBookingsTable token={token} />;
};

export default PendingBookingsPage;
