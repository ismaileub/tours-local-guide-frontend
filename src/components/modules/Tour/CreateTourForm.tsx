/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const TOUR_TYPES = [
  "Sea Beach",
  "City Life",
  "Village Life",
  "Hill Tracks",
  "Adventure",
  "Historical Place",
  "River Side",
  "Nightlife",
];

interface Props {
  onSuccess: () => void;
  token: string;
}

export default function CreateTourForm({ onSuccess, token }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<any>({
    title: "",
    location: "",
    price: "",
    duration: "",
    description: "",
    spots: "",
    tourType: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Basic validation
    if (
      !form.title ||
      !form.location ||
      !form.price ||
      !form.duration ||
      !form.description ||
      !form.spots ||
      !form.tourType ||
      !file
    ) {
      toast.error("Please fill in all fields and upload a cover photo.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append(
        "data",
        JSON.stringify({
          ...form,
          price: Number(form.price),
          spots: form.spots.split(",").map((s: string) => s.trim()),
        })
      );

      formData.append("file", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/tours/create`,
        {
          method: "POST",
          body: formData,
          headers: { authorization: token }, // token included
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create tour");
      }

      //const data = await res.json();

      toast.success("Tour created successfully!");
      onSuccess();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input name="title" required onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <Input name="location" required onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label>Price($)</Label>
        <Input type="number" name="price" required onChange={handleChange} />
        <p className="text-xs text-muted-foreground"></p>
      </div>

      <div className="space-y-2">
        <Label>Duration</Label>
        <Input
          name="duration"
          required
          placeholder="3 Days 2 Nights"
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label>Tour Type</Label>
        <select
          name="tourType"
          required
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select tour type</option>
          {TOUR_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea name="description" required onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label>Spots (comma separated)</Label>
        <Input name="spots" required onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label>Cover Photo</Label>
        <Input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <p className="text-xs text-muted-foreground">
          Upload a high-quality tour image
        </p>
      </div>

      <Button className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create Tour"}
      </Button>
    </div>
  );
}
