import TourDetailsClientWrapper from "@/components/modules/Tour/TourDetailsClientWrapper";
import { getUserSession } from "@/helpers/getUserSession";

interface Props {
  params: { id: string };
}

const TourDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const session = await getUserSession();
  const token = session?.user?.accessToken as string;
  console.log({ id });

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tours/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  const tour = data?.data;
  console.log(data);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {tour ? (
        <TourDetailsClientWrapper tour={tour} token={token} />
      ) : (
        <p className="text-center text-gray-500">Tour not found</p>
      )}
    </div>
  );
};

export default TourDetailsPage;
