"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Tours", href: "/tours" },
  { name: "Guides", href: "/guides" },
  { name: "Contact", href: "/contact" },
];

export const NavMenu = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center gap-8", className)}>
      {links.map((link) => {
        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className="relative font-medium text-gray-800 hover:text-orange-500 transition"
          >
            {link.name}

            {/* underline animation */}
            <span
              className={cn(
                "absolute -bottom-1 left-0 h-[2px] w-full bg-orange-500 transition-all duration-300",
                active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
              )}
            />
          </Link>
        );
      })}
    </div>
  );
};
