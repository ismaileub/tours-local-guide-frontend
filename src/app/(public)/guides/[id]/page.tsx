import GuideDetailsCard from "@/components/modules/Guides/GuideDetailsCard";
import { getUserSession } from "@/helpers/getUserSession";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const GuideDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const session = await getUserSession();
  const token = session?.user?.accessToken as string;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  const guide = data?.data;

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <GuideDetailsCard guide={guide} token={token} />
    </div>
  );
};

export default GuideDetailsPage;
