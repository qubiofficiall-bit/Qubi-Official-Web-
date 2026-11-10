import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes } from "react";

const variantStyles = {
  primary:
    "bg-[var(--color-fg)] text-white hover:bg-[var(--color-fg)]/90",
  secondary:
    "border border-[var(--color-fg)] text-[var(--color-fg)] hover:bg-[var(--color-fg)] hover:text-white",
  ghost: "text-[var(--color-fg)] hover:underline",
  link: "underline text-[var(--color-fg)]",
} as const;

const sizeStyles = {
  sm: "px-4 py-2",
  md: "px-6 py-3",
  lg: "px-8 py-4",
} as const;

const baseStyles =
  "inline-block uppercase tracking-[0.1em] text-xs font-[family-name:var(--font-body)] rounded-none transition-all duration-300 cursor-pointer";

/** Button class names — use on a `<Link>` when a navigation should look like a button. */
export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  className?: string;
} = {}) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}
