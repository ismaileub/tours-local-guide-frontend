import PayNowButton from "@/components/PayNowButton";
import { Button } from "@/components/ui/button";
import { getUserSession } from "@/helpers/getUserSession";
import Link from "next/link";

interface Booking {
  _id: string;
  bookingType: "GUIDE_HIRE" | "TOUR_PACKAGE";
  tourDate: string;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  guideId?: string;
  tourId?: string;
}

const TouristPaymentPage = async () => {
  const session = await getUserSession();
  const token = session?.user?.accessToken as string;
  //console.log(token);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/booking/need-payment`,
    {
      method: "GET",
      headers: {
        authorization: token,
      },
    }
  );

  const data = await res.json();
  const UnPaidBookings = data.data || [];
  //console.log(PaidBookings);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/booking/paid-booking`,
    {
      method: "GET",
      headers: {
        authorization: token,
      },
    }
  );

  const result = await response.json();
  // console.log(result);
  const paidBookings = result.data || [];
  //console.log(PaidBookings);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-5">Pending Payments</h1>
        {UnPaidBookings?.length < 1 && (
          <p className="text-green-600">No Pending Payment</p>
        )}

        {UnPaidBookings?.map((booking: Booking) => (
          <div
            key={booking._id}
            className="border rounded-xl p-5 flex justify-between items-center"
          >
            <div className="space-y-1">
              <p className="font-semibold text-blue-600">
                {booking.bookingType === "GUIDE_HIRE"
                  ? "Guide Hire"
                  : "Tour Package"}
              </p>

              <p className="text-sm text-gray-500">
                Date: {new Date(booking.tourDate).toDateString()}
              </p>

              <p className="text-sm">
                Booking Status:{" "}
                <span className="font-medium text-green-600">
                  {booking.status}
                </span>
              </p>

              <p className="text-sm">
                Payment Status:{" "}
                <span className="font-medium text-red-500">
                  {booking.paymentStatus}
                </span>
              </p>

              <p className="font-bold text-lg">$ {booking.totalPrice}</p>
            </div>

            <Link
              href={`/dashboard/tourist/payment-page?bookingId=${booking._id}`}
            >
              <Button className="btn cursor-pointer bg-primary">Pay Now</Button>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-5">Paid Payments</h1>
        {paidBookings?.length < 1 && (
          <p className="text-green-600">No paid Payment</p>
        )}

        {paidBookings?.map((booking: Booking) => (
          <div
            key={booking._id}
            className="border rounded-xl p-5 flex justify-between items-center"
          >
            <div className="space-y-1">
              <p className="font-semibold text-blue-600">
                {booking.bookingType === "GUIDE_HIRE"
                  ? "Guide Hire"
                  : "Tour Package"}
              </p>

              <p className="text-sm text-gray-500">
                Date: {new Date(booking.tourDate).toDateString()}
              </p>

              <p className="text-sm">
                Booking Status:{" "}
                <span className="font-medium text-green-600">
                  {booking.status}
                </span>
              </p>

              <p className="text-sm">
                Payment Status:{" "}
                <span className="font-medium text-red-500">
                  {booking.paymentStatus}
                </span>
              </p>

              <p className="font-bold text-lg">$ {booking.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TouristPaymentPage;
