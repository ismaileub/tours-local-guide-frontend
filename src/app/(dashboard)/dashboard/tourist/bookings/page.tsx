import BookingsTable from "@/components/modules/Bookings/BooingsTable";
import { getUserSession } from "@/helpers/getUserSession";
import React from "react";

const BookingsPage = async () => {
  const session = await getUserSession();
  const token = session?.user?.accessToken as string;
  return <BookingsTable token={token} />;
};

export default BookingsPage;
