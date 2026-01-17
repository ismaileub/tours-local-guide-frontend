"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { status, data: session } = useSession();
  console.log(session);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-xl">
      <div className=" mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-extrabold tracking-tight"
        >
          Guide<span className="text-orange-500">Hub</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex">
          <NavMenu />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 ">
          {status === "authenticated" && session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 cursor-pointer rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session?.user?.picture || ""}
                      alt={session?.user?.name || "User"}
                    />
                    <AvatarFallback>
                      {session.user.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {/* User info */}
                <div className="p-3 border-b">
                  <p className="text-sm font-semibold">{session.user.name}</p>
                  <p className="text-xs text-gray-500">{session.user.role}</p>
                </div>

                {/* Menu links */}
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="rounded-full px-6 py-2"
              variant="default"
            >
              <Link href="/login">Login</Link>
            </Button>
          )}

          {/* Mobile menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
