import BookingsTableForTourist from "@/components/modules/Bookings/BookingsTableForTourist";
import { getUserSession } from "@/helpers/getUserSession";
import React from "react";

const BookingsPage = async () => {
  const session = await getUserSession();
  const token = session?.user?.accessToken as string;
  return <BookingsTableForTourist token={token} />;
};

export default BookingsPage;
