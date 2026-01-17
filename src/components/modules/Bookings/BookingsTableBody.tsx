"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BookingRowSkeleton from "./BookingRowSkeleton";

interface Booking {
  _id: string;
  touristId?: { name?: string; email?: string; phone?: string };
  bookingType: string;
  tourDate: string;
  hours?: number;
  hourlyRate?: number;
  tourId?: { title?: string; duration?: string; location?: string };
  totalPrice: number;
  status: string;
  statusHistory?: { role: string }[];
}

const BookingsTableBody = ({
  bookings,
  loading,
  handleStatusChange,
}: {
  bookings: Booking[];
  loading: boolean;
  handleStatusChange: (id: string, status: string) => void;
}) => {
  const getCancelledText = (booking: Booking) => {
    if (booking.status !== "CANCELLED") return null;
    const last = booking.statusHistory?.at(-1);
    if (last?.role === "GUIDE") return "Cancelled by you";
    if (last?.role === "TOURIST") return "Cancelled by tourist";
    return "Cancelled";
  };

  if (loading) {
    return (
      <TableBody>
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <BookingRowSkeleton key={i} />
          ))}
      </TableBody>
    );
  }

  return (
    <TableBody>
      {bookings?.map((booking) => (
        <TableRow key={booking?._id}>
          <TableCell>{booking?.touristId?.name}</TableCell>
          <TableCell>{booking?.touristId?.email}</TableCell>
          <TableCell>{booking?.touristId?.phone || "N/A"}</TableCell>
          <TableCell>{booking?.bookingType}</TableCell>
          <TableCell>{new Date(booking.tourDate).toLocaleString()}</TableCell>

          <TableCell>
            {booking?.bookingType === "GUIDE_HIRE" ? (
              <span>
                {booking?.hours} hrs × ${booking.hourlyRate}
              </span>
            ) : booking?.bookingType === "TOUR_PACKAGE" ? (
              <span>
                {booking.tourId?.title || "Tour Info N/A"} <br />
                {booking.tourId?.duration} <br />
                {booking.tourId?.location}
              </span>
            ) : null}
          </TableCell>

          <TableCell>${booking?.totalPrice}</TableCell>

          <TableCell>
            {booking.status === "CONFIRMED" && (
              <span className="px-2 py-1 text-xs rounded bg-yellow-200 text-yellow-800">
                CONFIRMED
              </span>
            )}
            {booking.status === "COMPLETED" && (
              <div className="flex flex-col gap-1">
                <span className="px-2 py-1 text-xs rounded bg-green-200 text-red-800">
                  COMPLETED
                </span>
                <span className="text-[11px] text-red-600">
                  {getCancelledText(booking)}
                </span>
              </div>
            )}
          </TableCell>

          <TableCell className="">
            {booking.status === "CONFIRMED" ? (
              <Select
                onValueChange={(value) =>
                  handleStatusChange(booking._id, value)
                }
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COMPLETED">Complete</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <span className="text-xs text-gray-400 italic">No action</span>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default BookingsTableBody;
