/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import ReviewModal from "../Review/ReviewModal";
import { getCompletedBookingId } from "@/helpers/hasCompletedBooking";
import ClientOnly from "@/components/ClientOnly";
import { useRouter } from "next/navigation";

interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  reviewer: {
    _id: string;
    name: string;
    picture: string;
  };
}

interface GuideDetailsProps {
  guide: any & { reviews: Review[]; avgRating: number; totalReviews: number };
  token?: string;
}

const GuideDetailsCard: React.FC<GuideDetailsProps> = ({ guide, token }) => {
  const [reviews, setReviews] = useState<Review[]>(guide.reviews || []);
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState(1);
  const [tourDate, setTourDate] = useState("");
  const [loading, setLoading] = useState(false);
  //const [canReview, setCanReview] = useState(false);
  const [checkingReview, setCheckingReview] = useState(true);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkBooking = async () => {
      if (!token) {
        setBookingId(null);
        setCheckingReview(false);
        return;
      }

      const id = await getCompletedBookingId(token, guide._id);
      setBookingId(id); // null OR bookingId
      setCheckingReview(false);
    };

    checkBooking();
  }, [token, guide._id]);

  const handleBooking = async () => {
    if (!token) {
      toast.error("To hire a guide, you need to login!");
      return;
    }
    if (!tourDate || hours < 1) {
      toast.error("Please select date and valid hours!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          bookingType: "GUIDE_HIRE",
          guideId: guide._id,
          tourDate,
          hourlyRate: guide.pricePerHour,
          hours,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Guide booked successfully!");
        setOpen(false);
        router.push("/dashboard/tourist/bookings");
      } else if (data.message?.includes("GUIDE_HIRE")) {
        toast.error("This guide does not have proper data available for hire.");
      } else if (data.message?.toLowerCase().includes("not permitted")) {
        toast.error("This feature is available only for tourists.");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  console.log(guide);

  return (
    <div className="space-y-6 mt-40">
      {/* Guide Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 border rounded-2xl shadow-lg bg-gradient-to-r from-white to-gray-50">
        {/* Guide Image */}
        <div className="shrink-0">
          <ClientOnly>
            <Image
              src={guide?.picture || "/avatar.jpg"}
              width={500}
              height={500}
              alt={guide.name}
              className="w-60 h-60 rounded-full object-cover border-4 border-orange-400 shadow-md"
            />
          </ClientOnly>
        </div>

        {/* Guide Details */}
        <div className="mt-4 md:mt-0 md:ml-6 flex-1">
          <h2 className="text-2xl font-bold text-gray-800">{guide.name}</h2>
          <p className="text-gray-600 mt-1">{guide.bio}</p>

          <div className="mt-3 space-y-2">
            <p className="flex items-center text-gray-700">
              <span className="material-icons mr-2 text-purple-400 font-bold">
                Email:{" "}
              </span>
              {guide.email}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="material-icons mr-2 text-purple-400 font-bold">
                Phone:{" "}
              </span>
              {guide.phone || "N/A"}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="material-icons mr-2 text-purple-400 font-bold">
                Location:
              </span>
              {guide.address || "N/A"}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="material-icons mr-2 text-purple-400 font-bold">
                Language:
              </span>
              <span className="uppercase">
                {guide.languages?.join(", ") || "N/A"}
              </span>
            </p>
            <p className="flex items-center text-gray-700">
              <span className="material-icons mr-2 text-purple-400 font-bold">
                Gender:{" "}
              </span>
              {guide.gender || "N/A"}
            </p>
            <p className="mt-1 font-semibold text-gray-800">
              Price:{" "}
              <span className="text-red-600">${guide.pricePerHour}/hr</span>
            </p>
          </div>
        </div>

        {/* Booking Button */}
        <div className="mt-4 md:mt-0  flex flex-col justify-between  items-center space-y-40 ">
          <Button
            onClick={() => setOpen(true)}
            className="bg-blue-400 hover:bg-blue-500 font-bold text-white cursor-pointer"
          >
            Hire The Guide
          </Button>
          <div className="text-center">
            <div className="flex gap-1  text-orange-400">
              {Array.from({ length: 5 }, (_, i) => (
                <span className="text-xl" key={i}>
                  {i < guide.avgRating ? "★" : "☆"}
                </span>
              ))}
            </div>
            <p className="text-base text-gray-500">
              Reviews: {guide.totalReviews}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book {guide.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-1 space-y-2">
              <Label htmlFor="tourDate">Date & Time</Label>
              <Input
                id="tourDate"
                type="datetime-local"
                value={tourDate}
                onChange={(e) => setTourDate(e.target.value)}
              />
            </div>
            <div className="grid gap-1 space-y-2.5">
              <Label htmlFor="hours">For Hours</Label>
              <Input
                id="hours"
                type="number"
                min={1}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleBooking}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/**Review modal */}
      <ReviewModal
        targetType="GUIDE"
        targetId={guide._id}
        token={token!}
        bookingId={bookingId!}
        disabled={!bookingId || checkingReview}
        onReviewCreated={(review) => setReviews((prev) => [...prev, review])}
      />

      {!checkingReview && !bookingId && (
        <p className="text-sm text-red-500">
          You can write a review only after completing a booking with this
          guide.
        </p>
      )}

      {/* Reviews Section */}

      <div>
        <h3 className="text-lg font-semibold mb-4">
          {guide?.totalReviews} Reviews
        </h3>
        <div className="space-y-4">
          {reviews?.map((review: any) => (
            <div key={review._id} className="flex gap-4 p-4 border rounded-lg">
              <ClientOnly>
                <Image
                  src={review?.reviewer?.picture || "/avatar.jpg"}
                  alt={review?.reviewer?.name}
                  width={100}
                  height={100}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </ClientOnly>
              <div>
                <p className="font-semibold">{review?.reviewer?.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-1">{review?.comment}</p>
                <div className="flex gap-1 mt-1 text-orange-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideDetailsCard;
