"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { useSession } from "next-auth/react";

export const NavMenu = (props: NavigationMenuProps) => {
  const { data: session, status } = useSession();
  const role = session?.user?.role;

  // Decide dashboard link based on role
  let dashboardLink: string | null = null;

  if (role === "ADMIN") {
    dashboardLink = "/dashboard/admin/admin-dashboard";
  } else if (role === "GUIDE") {
    dashboardLink = "/dashboard/guide/guide-dashboard";
  } else if (role === "TOURIST") {
    dashboardLink = "/dashboard/tourist/tourist-dashboard";
  }

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start font-medium">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/about">About Us</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/tours">Tours</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/guides">Guides</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/*  Show Dashboard ONLY when logged in */}
        {status === "authenticated" && dashboardLink && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href={dashboardLink}>Dashboard</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
