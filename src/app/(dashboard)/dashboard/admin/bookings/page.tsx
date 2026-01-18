"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/ui/pagination";
import { Booking } from "@/types/booking";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookingDetailsDialog from "@/components/modules/Bookings/BookingDetailsDialog";

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
        },
      );
      const data = await res.json();

      setBookings(data?.data || []);
      setTotalPages(data?.meta?.totalPage || 1);
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
  }, [currentPage, status]);

  if (status === "loading") {
    return <p className="text-center py-6 text-gray-500">Loading session...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Bookings ({totalItems})</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Tourist</TableHead>
              <TableHead>Guide</TableHead>
              <TableHead>Booking</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Payment</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <TableCell key={j}>
                        <div className="h-4 bg-gray-200 rounded w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : bookings?.map((b) => (
                  <TableRow key={b._id}>
                    <TableCell>
                      <p className="font-semibold">{b.tourist.name}</p>
                      <p className="text-xs text-gray-500">{b.tourist.email}</p>
                    </TableCell>

                    <TableCell>
                      <p className="font-semibold">{b.guide.name}</p>
                      <p className="text-xs text-gray-500">{b.guide.email}</p>
                    </TableCell>

                    <TableCell>
                      <p className="font-semibold">
                        {b.bookingType === "GUIDE_HIRE"
                          ? "Guide Hire"
                          : "Tour Package"}
                      </p>
                      {b.tour && (
                        <p className="text-xs text-gray-500">{b.tour.title}</p>
                      )}
                    </TableCell>

                    <TableCell className="text-center">
                      {new Date(b.tourDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-center font-semibold">
                      $ {b.totalPrice}
                    </TableCell>

                    <TableCell className="text-center">
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
                    </TableCell>

                    <TableCell className="text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          b.paymentStatus === "PAID"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {b.paymentStatus}
                      </span>
                    </TableCell>

                    <TableCell className="text-center">
                      <BookingDetailsDialog
                        bookingId={b._id}
                        token={token}
                        trigger={
                          <button className="ml-2 cursor-pointer px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                            View
                          </button>
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        {!loading && bookings.length === 0 && (
          <p className="text-center py-6 text-gray-500">No bookings found</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
