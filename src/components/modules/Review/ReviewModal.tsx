/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ReviewModalProps {
  targetType: "GUIDE" | "TOUR";
  targetId: string;
  token: string;
  bookingId: string;
  onReviewCreated: (review: any) => void;
  disabled?: boolean;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  targetType,
  targetId,
  token,
  bookingId,
  onReviewCreated,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (rating < 1) {
      toast.error("Please select a rating");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          bookingId,
          targetType,
          targetId,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Review submitted successfully!");
        onReviewCreated(data.data);
        setOpen(false);
        setRating(0);
        setComment("");
      } else {
        toast.error(data.message || "Failed to submit review");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        disabled={disabled}
        className="bg-green-500 hover:bg-green-600 w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Write Review
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>

          <div className="py-2">
            <div className="flex gap-1 text-orange-400 mb-4">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`text-3xl cursor-pointer ${
                    i < rating ? "text-orange-500" : ""
                  }`}
                  onClick={() => setRating(i + 1)}
                >
                  ★
                </span>
              ))}
            </div>

            <Input
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="h-32 p-2"
            />
          </div>

          <DialogFooter>
            <Button
              onClick={submitReview}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReviewModal;
