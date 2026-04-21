"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type NavItemProps = {
  href: string;
  active?: boolean;
  hasDropdown?: boolean;
  children: ReactNode;
  className?: string;
};

export function NavItem({
  href,
  active = false,
  hasDropdown = false,
  children,
  className = "",
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-1 rounded-pill px-4 py-2 text-sm transition-all ${
        active
          ? "bg-navy-900 text-white font-medium"
          : "text-navy-900/80 hover:bg-navy-900/5 hover:text-navy-900"
      } ${className}`}
    >
      {children}
      {hasDropdown ? <ChevronDown className="h-3 w-3 opacity-60" /> : null}
    </Link>
  );
}
