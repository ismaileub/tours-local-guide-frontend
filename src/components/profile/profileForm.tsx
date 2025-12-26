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
    languages: user?.languages?.join(", ") || "",
    bio: user?.bio || "",
    gender: user.gender || "",
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
      const payload = {
        ...form,
        languages:
          user?.role === "GUIDE"
            ? form.languages
                .split(",")
                .map((l: any) => l.trim())
                .filter(Boolean)
            : undefined,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (file) formData.append("file", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/users/updateMe`,
        {
          method: "PATCH",
          headers: {
            authorization: token || "",
          },
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
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* ===== Header ===== */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold">{user?.name}</h2>
              <p className="opacity-90">{user?.email}</p>
              <span className="inline-block mt-2 px-4 py-1 text-sm rounded-full bg-white/20">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* ===== Content ===== */}
        <div className="p-8">
          {!isEditing ? (
            <>
              {/* ===== View Mode ===== */}
              <div className="grid sm:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{user?.phone || "N/A"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{user?.address || "N/A"}</p>
                </div>

                {user?.role === "GUIDE" && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Price / Hour</p>
                      <p className="font-medium">{user?.pricePerHour || 0} $</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 ">Languages</p>
                      <p className="font-medium uppercase">
                        {user?.languages?.length
                          ? user.languages.join(", ")
                          : "None"}
                      </p>
                      <p className="text-sm text-gray-500 ">
                        Gender: {user.gender || "N/A"}
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <p className="text-sm text-gray-500">Bio</p>
                      <p className="font-medium">{user?.bio || "N/A"}</p>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                >
                  Edit Profile
                </button>
              </div>
            </>
          ) : (
            <>
              {/* ===== Edit Mode ===== */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Email
                  </label>
                  <input
                    value={user?.email}
                    readOnly
                    className="w-full border rounded-xl p-3 bg-gray-100"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Role
                  </label>
                  <input
                    value={user?.role}
                    readOnly
                    className="w-full border rounded-xl p-3 bg-gray-100"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Gender
                  </label>
                  <input
                    name="gender"
                    placeholder="Male/Female"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Address
                  </label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Guide Fields */}
                {user?.role === "GUIDE" && (
                  <>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">
                        Price Per Hour ($)
                      </label>
                      <input
                        name="pricePerHour"
                        type="number"
                        value={form.pricePerHour}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">
                        Languages
                      </label>
                      <input
                        name="languages"
                        value={form.languages}
                        onChange={handleChange}
                        placeholder="English, Bangla, Hindi"
                        className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-600 mb-1 block">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        rows={3}
                        maxLength={120}
                        className="w-full border rounded-xl p-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Max 120 characters
                      </p>
                    </div>
                  </>
                )}

                {/* Profile Image */}
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-600 mb-1 block">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    onChange={(e: any) => setFile(e.target.files[0])}
                    className="w-full border rounded-xl p-2"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="px-8 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium transition"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-3 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
