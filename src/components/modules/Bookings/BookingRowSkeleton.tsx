"use client";

import { TableCell, TableRow } from "@/components/ui/table";

const Skeleton = ({ w }: { w: string }) => (
  <div className={`h-4 ${w} bg-gray-200 rounded animate-pulse`} />
);

const BookingRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton w="w-22.5" />
    </TableCell>
    <TableCell>
      <Skeleton w="w-35" />
    </TableCell>
    <TableCell>
      <Skeleton w="w-25" />
    </TableCell>
    <TableCell>
      <Skeleton w="w-26.25" />
    </TableCell>
    <TableCell>
      <Skeleton w="w-37.5" />
    </TableCell>

    <TableCell className="space-y-2">
      <Skeleton w="w-[140px]" />
      <Skeleton w="w-[110px]" />
    </TableCell>

    <TableCell>
      <Skeleton w="w-[50px]" />
    </TableCell>

    <TableCell>
      <div className="h-6 w-22.5 bg-gray-200 rounded-md animate-pulse" />
    </TableCell>

    <TableCell>
      <div className="h-8 w-25 bg-gray-200 rounded-md animate-pulse" />
    </TableCell>
  </TableRow>
);

export default BookingRowSkeleton;
