import TourDetailsCard from "@/components/modules/Tour/TourDetailsCard";
import { getUserSession } from "@/helpers/getUserSession";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const TourDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  // console.log(id);

  const session = await getUserSession();
  const token = session?.user?.accessToken as string;

  // Fetch single tour by ID
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tours/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  const tour = data?.data;

  // if (!tour) return <div className="text-center mt-10">Tour not found</div>;

  return (
    <div className="py-8 px-4">
      <TourDetailsCard tour={tour} token={token} />
    </div>
  );
};

export default TourDetailsPage;
