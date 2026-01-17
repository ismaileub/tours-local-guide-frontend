/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Table } from "@/components/ui/table";
import Pagination from "@/components/ui/pagination";
import { toast } from "sonner";

import BookingsTableHeader from "./BookingsTableHeader";
import BookingsTableBody from "./BookingsTableBody";
import StatusBadge from "@/components/shared/StatusBadge";

const GuideSchedule = ({ token }: { token?: string }) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/booking/confirmed-complete?page=${page}&limit=8`,
        {
          headers: { Authorization: token || "" },
          cache: "no-store",
        },
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

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/booking/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify({ status }),
      });
      fetchBookings();
    } catch {
      toast.error("Failed to update booking");
    }
  };

  return (
    // <div className="border rounded-lg shadow overflow-x-auto">
    //   <h1 className="text-xl font-semibold text-center py-4">
    //     Your Schedule ({meta?.total || 0})
    //   </h1>

    //   {/* 🔑 THIS IS THE IMPORTANT PART */}
    //   <div className="relative w-full overflow-x-auto">
    //     <Table className="min-w-[1100px] table-fixed">
    //       <colgroup>
    //         <col className="w-22.5" />
    //         <col className="w-[150px]" />
    //         <col className="w-[100px]" />
    //         <col className="w-[105px]" />
    //         <col className="w-[150px]" />
    //         <col className="w-[220px]" />
    //         <col className="w-[60px] " />
    //         <col className="w-[100px]" />
    //         <col className="w-[115px] " />
    //       </colgroup>

    //       <BookingsTableHeader />
    //       <BookingsTableBody
    //         bookings={bookings}
    //         loading={loading}
    //         handleStatusChange={handleStatusChange}
    //       />
    //     </Table>
    //   </div>

    //   <Pagination
    //     currentPage={meta.page}
    //     totalPages={meta.totalPages}
    //     onPageChange={setPage}
    //   />
    // </div>

    <>
      {/* DESKTOP TABLE */}
      <div className="hidden md:block border rounded-lg shadow">
        <h1 className="text-xl font-semibold text-center py-4">
          Your Schedule ({meta?.total || 0})
        </h1>

        <div className="relative w-full overflow-x-auto">
          <Table className="min-w-275 table-fixed">
            <colgroup>
              <col className="w-22.5" />
              <col className="w-35" />
              <col className="w-25" />
              <col className="w-26.25" />
              <col className="w-37.5" />
              <col className="w-55" />
              <col className="w-15 " />
              <col className="w-25" />
              <col className="w-28.75 " />
            </colgroup>

            <BookingsTableHeader />
            <BookingsTableBody
              bookings={bookings}
              loading={loading}
              handleStatusChange={handleStatusChange}
            />
          </Table>
        </div>

        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        <h1 className="text-lg font-semibold px-1">
          Your Schedule ({meta?.total || 0})
        </h1>

        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-36 rounded-lg bg-gray-200 animate-pulse"
              />
            ))
          : bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-lg border bg-white p-4 shadow-sm space-y-3"
              >
                {/* TOP */}
                <div>
                  <p className="font-semibold">{booking.touristId?.name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[200px]">
                    {booking.touristId?.email}
                  </p>
                </div>

                {/* DETAILS */}
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium">Type:</span>{" "}
                    {booking.bookingType}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(booking.tourDate).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium">Total:</span> $
                    {booking.totalPrice}
                  </p>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between pt-2 border-t">
                  {/* STATUS BADGE AT BOTTOM */}
                  <StatusBadge status={booking.status} />

                  {/* VIEW LINK ONLY FOR TOUR PACKAGE */}
                  {booking.bookingType === "TOUR_PACKAGE" &&
                    booking.tourId?._id && (
                      <a
                        href={`/tours/${booking.tourId._id}`}
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    )}
                </div>

                {/* ACTION BUTTON */}
                {booking.status === "CONFIRMED" && (
                  <button
                    onClick={() => handleStatusChange(booking._id, "COMPLETED")}
                    className="w-full rounded-md bg-black py-2 text-sm text-white hover:bg-gray-900"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            ))}
      </div>
    </>
  );
};

export default GuideSchedule;
