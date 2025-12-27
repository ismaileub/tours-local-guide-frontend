"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/ui/pagination";
import { Booking } from "@/types/booking";
import { useSession } from "next-auth/react";

const ITEMS_PER_PAGE = 8;

export default function AdminAllBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();
  const token = session?.user?.accessToken as string;

  const fetchBookings = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/booking?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
        {
          cache: "no-store",
          headers: { authorization: token },
        }
      );
      const data = await res.json();
      setBookings(data?.data || []);
      setTotalPages(data?.meta?.totalPages || 1);
      setTotalItems(data?.meta?.total || 0);
    } catch (error) {
      console.error("Failed to load bookings", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, status]);

  if (status === "loading") {
    return <p className="text-center py-6 text-gray-500">Loading session...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Bookings ({totalItems})</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Tourist</th>
              <th className="px-4 py-3 text-left">Guide</th>
              <th className="px-4 py-3 text-left">Booking</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-semibold">{b.tourist.name}</p>
                  <p className="text-xs text-gray-500">{b.tourist.email}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold">{b.guide.name}</p>
                  <p className="text-xs text-gray-500">{b.guide.email}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold">
                    {b.bookingType === "GUIDE_HIRE"
                      ? "Guide Hire"
                      : "Tour Package"}
                  </p>
                  {b.tour && (
                    <p className="text-xs text-gray-500">{b.tour.title}</p>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {new Date(b.tourDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center font-semibold">
                  ৳ {b.totalPrice}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      b.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : b.status === "CONFIRMED"
                        ? "bg-blue-100 text-blue-700"
                        : b.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      b.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {b.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && (
          <p className="text-center py-6 text-gray-500">Loading bookings...</p>
        )}
        {!loading && bookings.length === 0 && (
          <p className="text-center py-6 text-gray-500">No bookings found</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
