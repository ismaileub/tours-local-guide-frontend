/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/ui/pagination";
import { toast } from "sonner";

const PendingBookingsTable = ({ token }: { token?: string }) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getCancelledText = (booking: any) => {
    if (booking.status !== "CANCELLED") return null;
    const last = booking.statusHistory?.at(-1);
    if (last?.role === "GUIDE") return "Cancelled by you";
    if (last?.role === "TOURIST") return "Cancelled by tourist";
    return "Cancelled";
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/booking/pending?page=${page}&limit=10`,
        {
          headers: { Authorization: token || "" },
          cache: "no-store",
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setBookings(data.data);
      setMeta(data.meta);
    } catch (err: any) {
      toast.error(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page]);

  const handleStatusChange = async (bookingId: string, status: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/booking/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token || "",
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(`Booking ${status.toLowerCase()} successfully`);
      fetchBookings();
    } catch (err: any) {
      toast.error(err.message || "Failed to update booking");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading pending bookings...</p>;
  }

  return (
    <div className="mt-8 border rounded-lg shadow">
      <h1 className="text-xl font-semibold text-center p-4">
        Pending Bookings ({meta?.total || bookings?.length})
      </h1>

      <Table>
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>Tourist</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Booking Type</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings?.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell>{booking.touristId?.name}</TableCell>
              <TableCell>{booking.touristId?.email}</TableCell>
              <TableCell>{booking.touristId?.phone || "N/A"}</TableCell>
              <TableCell>{booking.bookingType}</TableCell>
              <TableCell>
                {new Date(booking.tourDate).toLocaleString()}
              </TableCell>

              {/* Dynamic Details Column */}
              <TableCell>
                {booking?.bookingType === "GUIDE_HIRE" ? (
                  <span>
                    {booking?.hours} hrs × ${booking?.hourlyRate}
                  </span>
                ) : booking?.bookingType === "TOUR_PACKAGE" ? (
                  <span>
                    {booking?.tourId?.title || "Tour Info N/A"} <br />
                    {booking?.tourId?.duration} <br />
                    {booking?.tourId?.location}
                  </span>
                ) : null}
              </TableCell>

              <TableCell>${booking?.totalPrice}</TableCell>

              <TableCell>
                {booking?.status === "PENDING" && (
                  <span className="px-2 py-1 text-xs rounded bg-yellow-200 text-yellow-800">
                    PENDING
                  </span>
                )}
                {booking?.status === "CANCELLED" && (
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-1 text-xs rounded bg-red-200 text-red-800">
                      CANCELLED
                    </span>
                    <span className="text-[11px] text-red-600">
                      {getCancelledText(booking)}
                    </span>
                  </div>
                )}
              </TableCell>

              <TableCell>
                {booking.status === "PENDING" ? (
                  <Select
                    onValueChange={(value) =>
                      handleStatusChange(booking?._id, value)
                    }
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CONFIRMED">Confirm</SelectItem>
                      <SelectItem value="CANCELLED">Cancel</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-xs text-gray-400 italic">
                    No action
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default PendingBookingsTable;
