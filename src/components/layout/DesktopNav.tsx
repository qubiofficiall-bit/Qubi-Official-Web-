"use client";

import { useState, type FocusEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { mainNavigation } from "@/data/navigation";

export function DesktopNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function handleBlur(e: FocusEvent<HTMLDivElement>) {
    // Close only when focus leaves the item and its dropdown entirely.
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setOpenDropdown(null);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape" && openDropdown) {
      setOpenDropdown(null);
      e.currentTarget.querySelector<HTMLAnchorElement>("a")?.focus();
    }
  }

  return (
    <nav aria-label="Ana menü" className="hidden lg:flex items-center gap-8">
      {mainNavigation.map((item) => {
        const isOpen = !!item.children && openDropdown === item.href;
        const dropdownId = `nav-dropdown-${item.href.replace(/\W+/g, "-")}`;

        return (
          <div
            key={item.href}
            className="relative"
            onMouseEnter={() =>
              item.children ? setOpenDropdown(item.href) : undefined
            }
            onMouseLeave={() => setOpenDropdown(null)}
            onFocus={() =>
              item.children ? setOpenDropdown(item.href) : undefined
            }
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          >
            <Link
              href={item.href}
              aria-haspopup={item.children ? "true" : undefined}
              aria-expanded={item.children ? isOpen : undefined}
              aria-controls={item.children ? dropdownId : undefined}
              className="group relative inline-flex items-center py-2 uppercase text-[11px] tracking-[0.1em] font-[family-name:var(--font-body)] text-[var(--color-fg)] transition-colors"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-fg)] transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
            </Link>

            {isOpen && item.children && (
              <div
                id={dropdownId}
                className="absolute left-1/2 top-full -translate-x-1/2 pt-2"
              >
                <ul className="min-w-[200px] border border-[var(--color-border)] bg-white p-4 shadow-sm flex flex-col gap-1">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block px-2 py-1.5 text-[11px] uppercase tracking-[0.1em] font-[family-name:var(--font-body)] text-[var(--color-muted-fg)] transition-colors hover:text-[var(--color-fg)] focus-visible:text-[var(--color-fg)]"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
