/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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
import ReviewModal from "../Review/ReviewModal";
import { getCompletedBookingId } from "@/helpers/hasCompletedBooking";
import ClientOnly from "@/components/ClientOnly";
import { useRouter } from "next/navigation";

interface TourDetailsCardProps {
  tour: any;
  token?: string;
}

const TourDetailsCardForBooking: React.FC<TourDetailsCardProps> = ({
  tour,
  token,
}) => {
  const [open, setOpen] = useState(false);
  const [tourDate, setTourDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState(tour?.reviews || []);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [checkingReview, setCheckingReview] = useState(true);

  const router = useRouter();

  const handleBooking = async () => {
    if (!token) {
      toast.error("To book this tour, you need to login!");
      return;
    }

    if (!tourDate) {
      toast.error("Please select tour date & time!");
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
          bookingType: "TOUR_PACKAGE",
          tourId: tour._id,
          tourDate,
          price: tour.price,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Tour booked successfully!");
        setOpen(false);
        router.push("/dashboard/tourist/bookings");
      } else {
        toast.error("Guide can not book a tour");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkBooking = async () => {
      if (!token) {
        setBookingId(null);
        setCheckingReview(false);
        return;
      }

      const id = await getCompletedBookingId(token, tour._id);
      //console.log(id);
      setBookingId(id);
      setCheckingReview(false);
    };

    checkBooking();
  }, [token, tour._id]);

  return (
    <div className="space-y-10 mt-20">
      <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-800 rounded-md">
        <p className="font-semibold text-lg">
          Book this tour and get the guide for{" "}
          <span className="text-green-700">FREE!</span>
        </p>
      </div>
      {/* Banner */}
      <div className="relative w-full h-105 rounded-2xl overflow-hidden">
        <ClientOnly>
          <Image
            src={tour?.coverPhoto}
            alt={tour.title}
            fill
            className="object-cover"
          />
        </ClientOnly>
        <div className="absolute inset-0 bg-black/40 flex items-end p-6">
          <div>
            <h1 className="text-3xl font-bold text-white">{tour.title}</h1>
            <p className="text-gray-200">{tour.location}</p>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT: Tour Details */}
        <div className="md:col-span-2 space-y-4">
          <p className="text-gray-700">{tour.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <b>Duration:</b> {tour.duration}
            </p>
            <p>
              <b>Tour Type:</b> {tour.tourType}
            </p>
            <p>
              <b>Price:</b> ${tour.price}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mt-4 mb-2">Tour Spots</h4>
            <ul className="list-disc ml-6 text-gray-600">
              {tour.spots.map((spot: string, i: number) => (
                <li key={i}>{spot}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT: Guide Info */}
        <div>
          <div className="p-6 border rounded-xl shadow-md space-y-4 relative">
            {/* Top label */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
              Guide of this tour
            </div>

            <ClientOnly>
              <Image
                src={tour?.guide?.picture || "/avatar.jpg"}
                alt={tour.guide.name}
                width={120}
                height={120}
                className="rounded-full mx-auto"
              />
            </ClientOnly>

            <div className="text-center">
              <h3 className="font-bold text-lg">{tour.guide.name}</h3>
              <p className="text-sm text-gray-500">{tour.guide.bio}</p>
            </div>

            <div className="flex justify-center gap-1 text-orange-400">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>{i < tour.avgRating ? "★" : "☆"}</span>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500">
              {tour.totalReviews} Reviews
            </p>

            <Button
              onClick={() => setOpen(true)}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Book This Tour
            </Button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book {tour.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Label>Date & Time</Label>
            <Input
              type="datetime-local"
              value={tourDate}
              onChange={(e) => setTourDate(e.target.value)}
            />
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

      <ReviewModal
        targetType="TOUR"
        targetId={tour._id}
        token={token!}
        bookingId={bookingId!}
        disabled={!bookingId || checkingReview}
        onReviewCreated={(review) =>
          setReviews((prev: any) => [...prev, review])
        }
      />

      {/* Reviews */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          {tour.totalReviews} Reviews
        </h3>

        <div className="space-y-4">
          {reviews && reviews.length > 0 ? (
            reviews.map((review: any) => (
              <div
                key={review._id}
                className="flex gap-4 p-4 border rounded-lg"
              >
                <ClientOnly>
                  <Image
                    src={review?.reviewer.picture || "/avatar.jpg"}
                    alt={review.reviewer.name}
                    width={48}
                    height={48}
                    className="rounded-full w-20 h-20"
                  />
                </ClientOnly>
                <div>
                  <p className="font-semibold">{review.reviewer.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-1">{review.comment}</p>
                  <div className="flex gap-1 text-orange-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic">No reviews yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourDetailsCardForBooking;
