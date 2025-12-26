import GuideSchedule from "@/components/modules/Bookings/GuideSchedule";
import { getUserSession } from "@/helpers/getUserSession";

const GuideSchedulePage = async () => {
  const session = await getUserSession();
  const token = session?.user?.accessToken as string;
  return <GuideSchedule token={token} />;
};

export default GuideSchedulePage;
