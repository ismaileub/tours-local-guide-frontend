"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  //  CLOSE SIDEBAR ON ROUTE CHANGE
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open menu"
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 w-64">
        {/*  ACCESSIBILITY TITLE (HIDDEN) */}
        <VisuallyHidden>
          <SheetTitle>Dashboard Navigation</SheetTitle>
        </VisuallyHidden>

        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
