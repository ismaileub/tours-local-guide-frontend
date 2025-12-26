"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

interface NavMenuProps extends NavigationMenuProps {
  session?: Session; // pass session if available
}

export const NavMenu = ({ ...props }: NavMenuProps) => {
  const session = useSession();
  const role = session.data?.user.role;
  // console.log(session.data?.user.role);

  // console.log({ role });

  // Decide dashboard link based on role
  let dashboardLink = "/login"; // default fallback
  if (role === "ADMIN") dashboardLink = "/dashboard/admin/admin-dashboard";
  if (role === "GUIDE") dashboardLink = "/dashboard/guide/guide-dashboard";
  if (role === "TOURIST")
    dashboardLink = "/dashboard/tourist/tourist-dashboard";

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
            <Link href="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/tours">Tour</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/guides">Guides</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={dashboardLink}>Dashboard</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
