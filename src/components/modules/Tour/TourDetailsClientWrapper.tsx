/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";

const TourDetailsCardForBooking = dynamic(
  () => import("./TourDetailsCardForBooking"),
  { ssr: false }
);

interface Props {
  tour: any;
  token?: string;
}

const TourDetailsClientWrapper = ({ tour, token }: Props) => {
  return <TourDetailsCardForBooking tour={tour} token={token} />;
};

export default TourDetailsClientWrapper;
