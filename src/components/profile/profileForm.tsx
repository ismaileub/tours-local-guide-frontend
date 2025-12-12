/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";

export default function ProfileForm({ user, token }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    pricePerHour: user?.pricePerHour || "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user?.picture || null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(user?.picture || null);
    }
  }, [file, user?.picture]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(form));
      if (file) formData.append("file", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/users/updateMe`,
        {
          method: "PATCH",
          headers: { authorization: `${token}` },
          body: formData,
        }
      );

      const result = await res.json();
      console.log("Updated User:", result);

      toast.success("Profile Updated Successfully!");
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="flex flex-col items-center">
        {/* Profile Picture */}
        <div className="relative w-62 h-62 mb-4 rounded-full overflow-hidden border-4 border-blue-500">
          {preview ? (
            <Image src={preview} alt="Profile" fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
              No Image
            </div>
          )}
        </div>

        {!isEditing ? (
          <>
            <h2 className="text-2xl font-semibold mb-2">{user?.name}</h2>
            <p className="text-gray-500 mb-1">Email: {user?.email}</p>
            <p className="text-gray-500 mb-1">Role: {user?.role}</p>
            <p className="text-gray-500 mb-1">Phone: {user?.phone || "N/A"}</p>
            <p className="text-gray-500 mb-1">
              Address: {user?.address || "N/A"}
            </p>
            {user?.role === "GUIDE" && (
              <p className="text-gray-500 mb-1">
                Price/Hour: {user?.pricePerHour} $
              </p>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <div className="w-full mt-6 space-y-4">
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email (read-only) */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Email</label>
              <input
                value={user?.email}
                readOnly
                className="border p-3 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Role (read-only) */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Role</label>
              <input
                value={user?.role}
                readOnly
                className="border p-3 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price Per Hour for Guide */}
            {user?.role === "GUIDE" && (
              <div className="flex flex-col">
                <label className="text-gray-600 mb-1">Price Per Hour($)</label>
                <input
                  name="pricePerHour"
                  type="number"
                  value={form.pricePerHour}
                  onChange={handleChange}
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Profile Picture */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Profile Picture</label>
              <input
                type="file"
                onChange={(e: any) => setFile(e.target.files[0])}
                className="border p-2 rounded-lg"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex items-center justify-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3-3 3h4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                ) : null}
                {loading ? "Updating..." : "Update"}
              </button>

              <button
                onClick={() => setIsEditing(false)}
                disabled={loading}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
