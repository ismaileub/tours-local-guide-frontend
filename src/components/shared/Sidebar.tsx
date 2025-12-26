/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  PlusCircle,
  LogOut,
  Users,
  Calendar,
  Map,
  User,
  CalendarCheck,
  Clock,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session, status } = useSession();
  const role = session?.user?.role;

  // ROLE-BASED MENU CONFIG
  const menuItems: Record<string, any[]> = {
    ADMIN: [
      { label: "Home", href: "/", icon: Home },
      {
        label: "Create Blog",
        href: "/dashboard/create-blog",
        icon: PlusCircle,
      },
      { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
      {
        label: "All Bookings",
        href: "/dashboard/admin/bookings",
        icon: Calendar,
      },
      { label: "My Profile", href: "/dashboard/profile", icon: User },
    ],

    GUIDE: [
      { label: "Home", href: "/", icon: Home },
      { label: "My Listings", href: "/dashboard/guide/tours", icon: Map },
      {
        label: "Schedule",
        href: "/dashboard/guide/schedule",
        icon: CalendarCheck,
      },
      {
        label: "Pending Requests",
        href: "/dashboard/guide/pending-request",
        icon: Clock,
      },
      { label: "My Profile", href: "/dashboard/profile", icon: User },
    ],

    TOURIST: [
      { label: "Home", href: "/", icon: Home },

      {
        label: "My Bookings",
        href: "/dashboard/tourist/bookings",
        icon: Calendar,
      },
      { label: "My Profile", href: "/dashboard/profile", icon: User },
    ],
  };

  // Fallback if no role yet
  const links = role ? menuItems[role] : [];

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-black text-white">
      {/* Top navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-500">
        {status === "authenticated" && (
          <Button
            variant="destructive"
            className="w-full justify-start gap-2 cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        )}
      </div>
    </aside>
  );
}
