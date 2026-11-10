"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

// Scroll values above this are irrelevant to the header, so capping stops re-renders.
const SCROLL_CAP = 60;

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const scrollY = useScrollPosition(SCROLL_CAP);
  const { cartCount, dispatch } = useCart();

  const scrolled = scrollY > 50;

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 z-[var(--z-header)] transition-[background-color,border-color] duration-300",
          scrolled
            ? "bg-[var(--color-bg)] border-b border-[var(--color-border)]"
            : "bg-transparent"
        )}
        style={{
          // Follows the announcement bar as it scrolls away, then sticks to the top.
          top: `max(0px, calc(var(--announcement-height) - ${scrollY}px))`,
        }}
      >
        <div className="mx-auto flex w-full items-center justify-between px-4 sm:px-6 lg:px-8" style={{ height: "var(--header-height)" }}>
          {/* Left: Menu (mobile) + Logo */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden -m-2 p-2 text-[var(--color-fg)] cursor-pointer"
              aria-label="Menüyü aç"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Logo />
          </div>

          {/* Center: Desktop Navigation */}
          <DesktopNav />

          {/* Right: Action Icons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="-m-2 p-2 text-[var(--color-fg)] transition-colors hover:text-[var(--color-muted-fg)] cursor-pointer"
              aria-label="Ara"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/wishlist"
              className="hidden lg:block -m-2 p-2 text-[var(--color-fg)] transition-colors hover:text-[var(--color-muted-fg)]"
              aria-label="Favoriler"
            >
              <Heart className="h-5 w-5" />
            </Link>

            <button
              type="button"
              onClick={() => dispatch({ type: "OPEN_CART" })}
              className="relative -m-2 p-2 text-[var(--color-fg)] transition-colors hover:text-[var(--color-muted-fg)] cursor-pointer"
              aria-label={cartCount > 0 ? `Sepet, ${cartCount} ürün` : "Sepet"}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-fg)] text-[9px] font-[family-name:var(--font-body)] text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
