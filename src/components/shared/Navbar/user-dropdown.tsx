"use client";

import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

const UserDropdown = () => {
  const { data } = useSession();

  const user = data?.user;
  console.log(data);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Image
          src={
            "https://res.cloudinary.com/djvsrgph0/image/upload/v1766677797/file-1766677775424-347957077.jpg"
          }
          alt="avatar"
          width={36}
          height={36}
          sizes="22"
          className="rounded-full border cursor-pointer"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-red-600" onClick={() => signOut()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
