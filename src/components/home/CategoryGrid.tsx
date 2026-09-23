import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/Container";

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <h2 className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.15em] mb-10 text-center">
          {"KATEGORILER"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Name */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <span className="text-white text-sm md:text-base uppercase tracking-[0.1em] font-[family-name:var(--font-body)]">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
