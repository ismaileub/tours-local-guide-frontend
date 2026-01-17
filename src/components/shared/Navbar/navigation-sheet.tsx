"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavigationSheet = () => {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Tours", href: "/tours" },
    { name: "Guides", href: "/guides" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <Sheet>
      <SheetTrigger className="p-2">
        <Menu size={26} />
      </SheetTrigger>

      <SheetContent side="right" className="w-30 p-4 bg-white">
        <VisuallyHidden>
          <SheetTitle>Mobile navigation menu</SheetTitle>
        </VisuallyHidden>

        <nav className="mt-8 flex flex-col gap-4">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={`text-base font-medium ${
                    active ? "text-orange-500" : "text-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
