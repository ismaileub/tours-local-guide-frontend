"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Pagination from "@/components/ui/pagination";
import Image from "next/image";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 8;

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  isActive: string;
  isDeleted: boolean;
  picture?: string;
}

export default function AdminAllUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();
  const token = session?.user.accessToken as string;

  const fetchUsers = async () => {
    if (!session?.user?.accessToken) return;

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/users/all-users?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
        {
          headers: { authorization: token },
          cache: "no-store",
        }
      );
      const data = await res.json();
      setUsers(data.data);
      setTotalPages(data?.meta?.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, status]);

  const handleDelete = async (userId: string) => {
    if (!session?.user?.accessToken) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            authorization: session.user.accessToken,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        await Swal.fire({
          title: "Deleted!",
          text: "User has been deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        fetchUsers(); // refresh table
      } else {
        Swal.fire("Failed!", "User could not be deleted.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  if (status === "loading") {
    return <p className="text-center py-6">Loading session...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="bg-white rounded-lg text-left shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center gap-2">
                  {user.picture && (
                    <Image
                      src={user.picture}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{user.name}</span>
                </td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phone || "-"}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  {user.isDeleted ? (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                      Deleted
                    </span>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        user.isActive === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.isActive}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  {user.isDeleted ? (
                    <button
                      disabled
                      className="px-3 py-1 bg-gray-300 text-gray-500 rounded text-xs cursor-not-allowed"
                    >
                      Deleted
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && <p className="text-center py-6">Loading users...</p>}
        {!loading && users?.length === 0 && (
          <p className="text-center py-6 text-gray-500">No users found</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
