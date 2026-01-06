/* eslint-disable @typescript-eslint/no-explicit-any */
import CreateTourDialog from "@/components/modules/Tour/CreateTourDialog";
import TourCard from "@/components/modules/Tour/TourCard";
import { getUserSession } from "@/helpers/getUserSession";

const ToursPage = async () => {
  const session = await getUserSession();
  const token = session?.user?.accessToken as string;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/tours/my-tours`,
    {
      headers: {
        authorization: token || "",
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  const tours = data?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tours</h1>
        <CreateTourDialog token={token} />
      </div>

      {tours?.length === 0 ? (
        <p>No tours found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour: any) => (
            <TourCard key={tour._id} {...tour} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToursPage;
