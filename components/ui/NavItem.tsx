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
      className={`flex items-center gap-1 rounded-pill px-5 py-2 text-sm transition-all ${
        active
          ? "bg-white text-ink font-medium shadow-sm"
          : "text-ink/75 hover:bg-white/50 hover:text-ink"
      } ${className}`}
    >
      {children}
      {hasDropdown ? <ChevronDown className="h-3 w-3 opacity-60" /> : null}
    </Link>
  );
}
