import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export function Logo({ className, variant = "dark" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex flex-col items-center leading-none",
        variant === "dark" ? "text-[var(--color-fg)]" : "text-white",
        className
      )}
    >
      <span className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.3em]">
        QUBI
      </span>
      <span className="font-[family-name:var(--font-display)] text-[8px] uppercase tracking-[0.5em]">
        OFFICIAL
      </span>
    </Link>
  );
}
