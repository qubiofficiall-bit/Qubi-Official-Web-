import Link from "next/link";
import Image from "next/image";
import { lookbookItems } from "@/data/lookbook";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Lookbook() {
  return (
    <section className="py-16 md:py-24">
      <Container size="wide">
        <h2 className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.15em] mb-10 text-center">
          LOOKBOOK
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[350px]">
          {lookbookItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "group relative overflow-hidden",
                item.layout === "full" && "md:col-span-3 md:row-span-2",
                item.layout === "half" && "md:col-span-2",
                item.layout === "third" && "md:col-span-1"
              )}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-105"
                sizes={
                  item.layout === "full"
                    ? "100vw"
                    : item.layout === "half"
                      ? "66vw"
                      : "33vw"
                }
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-end p-6">
                <span className="text-white text-sm uppercase tracking-[0.1em] font-[family-name:var(--font-body)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
