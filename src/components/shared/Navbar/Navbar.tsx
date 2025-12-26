"use client";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import handleLogout from "@/helpers/handleLogout";

const Navbar = () => {
  // const session = useSession();
  const { status } = useSession();
  // console.log({ status });
  // console.log({ session });

  return (
    <nav className="fixed top-6 inset-x-4 h-16 max-w-7xl mx-auto rounded-full bg-background border dark:border-slate-700/70 z-30">
      <div className="flex h-full items-center justify-between px-6 md:px-8">
        <Link href="/" className="shrink-0 text-4xl font-bold ">
          GuideHub
        </Link>

        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-4 md:gap-6">
          <div className="p-4 border-t border-gray-500">
            {status === "loading" ? (
              // prevent flicker: render nothing or a skeleton
              <div className="w-24 h-9 rounded-full bg-muted animate-pulse" />
            ) : status === "authenticated" ? (
              <Button
                variant="destructive"
                className="w-full justify-start gap-2 cursor-pointer"
                onClick={() => handleLogout()}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button className="rounded-full px-5 py-2 text-sm md:text-base">
                <Link href="/login" className="block w-full text-center">
                  Login
                </Link>
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
