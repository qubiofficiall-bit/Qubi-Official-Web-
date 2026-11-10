"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { useDialog } from "@/hooks/useDialog";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const dialogRef = useDialog<HTMLDivElement>(isOpen, onClose);
  useLockBodyScroll(isOpen);

  function toggleExpand(href: string) {
    setExpandedItem((prev) => (prev === href ? null : href));
  }

  return (
    <div
      ref={dialogRef}
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Menü"
      inert={!isOpen}
      className={cn(
        "fixed inset-0 z-[var(--z-overlay)] bg-[var(--color-bg)] transition-transform duration-500 ease-[var(--ease-editorial)]",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6" style={{ height: "var(--header-height)" }}>
          <Logo />
          <button
            type="button"
            onClick={onClose}
            className="-m-2 p-2 text-[var(--color-fg)] cursor-pointer"
            aria-label="Menüyü kapat"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Nav Items */}
        <nav aria-label="Ana menü" className="flex-1 overflow-y-auto px-4 sm:px-6 pt-8">
          <div className="flex flex-col gap-2">
            {mainNavigation.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-fg)] transition-colors hover:text-[var(--color-muted-fg)]"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(item.href)}
                      className="p-2 text-[var(--color-muted-fg)] cursor-pointer"
                      aria-label={`${item.label} alt menüsü`}
                      aria-expanded={expandedItem === item.href}
                      aria-controls={`mobile-submenu-${item.href.replace(/\W+/g, "-")}`}
                    >
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform duration-300",
                          expandedItem === item.href && "rotate-180"
                        )}
                      />
                    </button>
                  )}
                </div>

                {item.children && expandedItem === item.href && (
                  <div
                    id={`mobile-submenu-${item.href.replace(/\W+/g, "-")}`}
                    className="ml-4 mt-2 flex flex-col gap-2 pb-2"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className="text-lg font-[family-name:var(--font-body)] text-[var(--color-muted-fg)] transition-colors hover:text-[var(--color-fg)]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Social Links */}
        <div className="border-t border-[var(--color-border)] px-4 sm:px-6 py-6">
          <div className="flex gap-6">
            {siteConfig.social.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-body)] text-[var(--color-muted-fg)] transition-colors hover:text-[var(--color-fg)]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (yeni sekmede açılır)`}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
