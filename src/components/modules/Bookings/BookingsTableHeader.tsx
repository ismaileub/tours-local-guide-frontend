"use client";

import { TableHeader, TableHead, TableRow } from "@/components/ui/table";

const BookingsTableHeader = () => (
  <TableHeader className="sticky top-0 z-10 bg-gray-100">
    <TableRow>
      <TableHead>Tourist</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Phone</TableHead>
      <TableHead>Booking Type</TableHead>
      <TableHead>Date & Time</TableHead>
      <TableHead>Details</TableHead>
      <TableHead>Total</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="">Action</TableHead>
    </TableRow>
  </TableHeader>
);

export default BookingsTableHeader;
