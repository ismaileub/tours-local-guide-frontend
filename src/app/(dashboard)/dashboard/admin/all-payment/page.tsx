"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { toast } from "sonner";
import Pagination from "@/components/ui/pagination";
import { useSession } from "next-auth/react";
import BookingDetailsDialog from "@/components/modules/Bookings/BookingDetailsDialog";

interface Payment {
  _id: string;
  bookingId: string;
  touristEmail: string;
  amount: number;
  method: string;
  transactionId: string;
  paymentDate: string;
}

const AllPayment = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalMoney, setTotalMoney] = useState(0);

  const { data: session, status } = useSession();
  const token = session?.user.accessToken as string;

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/payment?page=${currentPage}&limit=8`,
        {
          headers: { authorization: token },
          cache: "no-store",
        },
      );
      const data = await res.json();

      if (data.success) {
        setPayments(data.data);
        setTotalPages(data.meta.totalPages);
        setTotalMoney(data.meta.totalMoney);
      } else {
        toast.error("Failed to fetch payments");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchPayments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, status]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Payments</h1>
      <h1 className="text-2xl font-bold mb-4">Total ${totalMoney}</h1>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tourist Email</TableHead>
              <TableHead>Amount ($)</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment._id}>
                <TableCell>{payment.touristEmail}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.transactionId}</TableCell>
                <TableCell>
                  {new Date(payment.paymentDate).toLocaleString()}
                </TableCell>
                <TableCell>
                  <BookingDetailsDialog
                    bookingId={payment.bookingId}
                    token={token}
                    trigger={
                      <button className="ml-2 cursor-pointer px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                        View
                      </button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default AllPayment;
