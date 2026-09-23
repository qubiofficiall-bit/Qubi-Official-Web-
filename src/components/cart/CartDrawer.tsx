"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { cn, formatPrice, generateCartItemKey } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { items, isOpen, dispatch, removeFromCart, updateQuantity, cartTotal, cartCount } =
    useCart();

  useLockBodyScroll(isOpen);

  function closeCart() {
    dispatch({ type: "CLOSE_CART" });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[var(--z-overlay)] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[var(--drawer-width)] bg-[var(--color-bg)] z-[var(--z-drawer)] flex flex-col transition-transform duration-500 ease-[var(--ease-editorial)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)]">
          <h2 className="text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-body)]">
            SEPETINIZ ({cartCount})
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="text-[var(--color-fg)] cursor-pointer"
            aria-label="Kapat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <p className="text-sm text-[var(--color-muted-fg)] font-[family-name:var(--font-body)]">
              Sepetiniz bos
            </p>
            <div className="mt-6">
              <Button onClick={closeCart}>
                <Link href="/koleksiyon/yeni-gelenler">
                  ALISVERISE BASLA
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-6">
                {items.map((item) => {
                  const key = generateCartItemKey(
                    item.productId,
                    item.size,
                    item.color.slug
                  );
                  return (
                    <div key={key} className="flex gap-4">
                      {/* Image */}
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="relative w-20 aspect-[3/4] flex-shrink-0 overflow-hidden bg-[var(--color-muted)]"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="text-sm font-[family-name:var(--font-body)] text-[var(--color-fg)] hover:text-[var(--color-muted-fg)] transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <p className="text-[10px] text-[var(--color-muted-fg)] font-[family-name:var(--font-body)] mt-1">
                            {item.color.name} / {item.size}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity */}
                          <div className="flex items-center border border-[var(--color-border)]">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(key, item.quantity - 1)
                              }
                              className="px-2 py-1 text-[var(--color-muted-fg)] hover:text-[var(--color-fg)] cursor-pointer"
                              aria-label="Azalt"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 py-1 text-xs font-[family-name:var(--font-body)] min-w-[32px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(key, item.quantity + 1)
                              }
                              className="px-2 py-1 text-[var(--color-muted-fg)] hover:text-[var(--color-fg)] cursor-pointer"
                              aria-label="Artir"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Price + Remove */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-[family-name:var(--font-body)]">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFromCart(key)}
                              className="text-[var(--color-muted-fg)] hover:text-[var(--color-error)] cursor-pointer"
                              aria-label="Kaldir"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[var(--color-border)] px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-body)]">
                  ARA TOPLAM
                </span>
                <span className="text-sm font-[family-name:var(--font-body)]">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <Button variant="primary" size="lg" className="w-full">
                ODEMEYE GEC
              </Button>
              <button
                type="button"
                onClick={closeCart}
                className="w-full text-center text-xs underline underline-offset-4 text-[var(--color-muted-fg)] hover:text-[var(--color-fg)] font-[family-name:var(--font-body)] transition-colors cursor-pointer"
              >
                Alisverise Devam Et
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
