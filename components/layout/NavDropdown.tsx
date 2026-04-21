"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type DropdownItem = { label: string; href: string };

export default function NavDropdown({
  label,
  items,
  active = false,
}: {
  label: string;
  items: DropdownItem[];
  active?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };

  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 250);
  };

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm transition ${
          active
            ? "bg-emerald-50 font-medium text-emerald-600"
            : "text-navy-900/75 hover:bg-navy-900/5 hover:text-navy-900"
        }`}
        type="button"
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute left-0 right-0 top-full h-4 ${open ? "block" : "hidden"}`}
      />

      <div
        className={`absolute left-0 top-[calc(100%+1rem)] z-50 min-w-[240px] rounded-2xl border border-white/10 bg-navy-900/95 p-2 shadow-2xl backdrop-blur-xl transition-all duration-200 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-xl px-4 py-2.5 text-sm transition ${
              pathname === item.href
                ? "bg-white/10 text-emerald-300"
                : "text-white/80 hover:bg-white/10 hover:text-emerald-300"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
