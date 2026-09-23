import { cn } from "@/lib/utils";

const sizeMap = {
  default: "max-w-[1200px]",
  narrow: "max-w-[680px]",
  wide: "max-w-[1440px]",
} as const;

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof sizeMap;
}

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeMap[size], className)}>
      {children}
    </div>
  );
}
