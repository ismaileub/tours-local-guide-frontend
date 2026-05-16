"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import StatusTimeline from "./StatusTimeline";

interface BookingDialogProps {
  bookingId: string;
  token: string;
  trigger?: React.ReactNode;
}

interface StatusHistory {
  status: string;
  role: string;
  changedAt: string;
}

interface BookingData {
  _id: string;
  bookingType: "GUIDE_HIRE" | "TOUR_PACKAGE";
  totalPrice: number;
  tourDate: string;
  status: string;
  paymentStatus: string;
  statusHistory: StatusHistory[];
  touristId: {
    name: string;
    email: string;
    phone: string;
  };
  guide?: {
    _id: string;
    name: string;
    email: string;
  };
  tourId?: {
    _id: string;
    title: string;
  };
}

const BookingDetailsDialog: React.FC<BookingDialogProps> = ({
  bookingId,
  token,
  trigger,
}) => {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/booking/${bookingId}`,
        {
          headers: { authorization: token },
          cache: "no-store",
        },
      );
      const data = await res.json();
      console.log(data);

      if (data.success) {
        setBooking(data.data);
      }
    } catch (error) {
      toast.error("Failed to load booking");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookingId) fetchBooking();
  }, [bookingId]);

  const redirectLink =
    booking?.bookingType === "TOUR_PACKAGE"
      ? `/tours/${booking?.tourId?._id}`
      : `/guides/${booking?.guide?._id}`;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="dialog-animate">
        <DialogHeader>
          <DialogTitle className="flex items-center mt-5 justify-between">
            Booking Details
            <Badge variant="outline">
              {booking?.bookingType.replace("_", " ")}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="text-center py-10">Loading booking...</p>
        ) : booking ? (
          <div className="space-y-6">
            {/* Top summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoCard title="Tourist">
                <p>{booking?.touristId.name}</p>
                <p className="text-muted-foreground">
                  {booking?.touristId.email}
                </p>
                <p>{booking?.touristId.phone}</p>
              </InfoCard>

              <InfoCard title="Booking">
                <p>Date: {new Date(booking.tourDate).toLocaleString()}</p>
                <p>Total: ${booking.totalPrice}</p>
              </InfoCard>

              {booking.bookingType === "GUIDE_HIRE" && booking.guide && (
                <InfoCard title="Guide">
                  <p>{booking?.guide?.name}</p>
                  <p className="text-muted-foreground">{booking.guide.email}</p>
                </InfoCard>
              )}

              {booking.bookingType === "TOUR_PACKAGE" && booking.tourId && (
                <InfoCard title="Tour">
                  <p className="font-medium">{booking?.tourId?.title}</p>
                </InfoCard>
              )}
            </div>

            <Separator />

            {/* Status history */}
            {/* <div>
              <h3 className="font-semibold mb-3">Status Timeline</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {booking.statusHistory.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Badge variant="outline">{item.status}</Badge>
                      </TableCell>
                      <TableCell>{item.role}</TableCell>
                      <TableCell>
                        {new Date(item.changedAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div> */}
            <div>
              <h3 className="font-semibold mb-4">Status Timeline</h3>
              <StatusTimeline history={booking.statusHistory} />
            </div>

            <DialogFooter>
              <Button asChild>
                <a href={redirectLink}>
                  Go to the{" "}
                  {booking.bookingType === "TOUR_PACKAGE" ? "Tour" : "Guide"}
                </a>
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <p>No booking found</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsDialog;

/* ---------------- helper ---------------- */

const InfoCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl  border p-4">
    <p className="text-sm font-semibold mb-2 text-muted-foreground">{title}</p>
    <div className="text-sm space-y-1">{children}</div>
  </div>
);
