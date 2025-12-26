/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Tour {
  _id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  description: string;
  coverPhoto: string;
  spots: string[];
  tourType: string;
}

interface Props {
  tour: Tour;
  token: string;
}

export default function TourDetailsCard({ tour, token }: Props) {
  const [open, setOpen] = useState(false);

  // Editable state
  const [title, setTitle] = useState(tour.title);
  const [price, setPrice] = useState(tour.price);
  const [duration, setDuration] = useState(tour.duration);
  const [description, setDescription] = useState(tour.description);
  const [tourType, setTourType] = useState(tour.tourType);
  const [spots, setSpots] = useState(tour.spots.join(", "));
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);

    await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tours/${tour._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",

        authorization: `${token}`,
      },
      body: JSON.stringify({
        title,
        price,
        duration,
        description,
        tourType,
        spots: spots.split(",").map((s) => s.trim()),
      }),
    });

    setLoading(false);
    setOpen(false);
    window.location.reload(); // refresh data
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
      {/* Cover Image */}
      <div className="relative w-full h-80">
        <Image
          src={tour.coverPhoto}
          alt={tour.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold">{tour.title}</h1>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-red-400">
                Edit Tour
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit Tour</DialogTitle>
              </DialogHeader>

              {/* Image Preview (Locked) */}
              <div className="relative w-full h-40 rounded overflow-hidden">
                <Image
                  src={tour.coverPhoto}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Cover photo cannot be changed
              </p>

              <div className="space-y-3">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label>Duration</Label>
                  <Input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Tour Type</Label>
                  <Input
                    value={tourType}
                    onChange={(e) => setTourType(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    rows={4}
                    value={description}
                    onChange={(e: any) => setDescription(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Spots (comma separated)</Label>
                  <Input
                    value={spots}
                    onChange={(e) => setSpots(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Tour"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <p className="text-gray-600 mt-1">{tour.location}</p>
        <p className="text-sm text-gray-500">Type: {tour.tourType}</p>
        <p className="text-lg font-semibold mt-2">$ {tour.price}</p>
        <p className="text-gray-600">Duration: {tour.duration}</p>

        <p className="mt-4">{tour.description}</p>

        <div className="mt-4">
          <h2 className="font-semibold">Tour Spots</h2>
          <ul className="list-disc list-inside">
            {tour.spots.map((spot, i) => (
              <li key={i}>{spot}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
