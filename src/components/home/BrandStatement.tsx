import { homepage } from "@/data/homepage";
import { Container } from "@/components/ui/Container";

export function BrandStatement() {
  const { brandStatement } = homepage;

  return (
    <section className="py-24 md:py-32">
      <Container size="narrow">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-center font-light leading-snug">
          {brandStatement.heading}
        </h2>
        <p className="text-[var(--color-muted-fg)] text-center mt-6 text-lg leading-relaxed font-[family-name:var(--font-body)]">
          {brandStatement.body}
        </p>
      </Container>
    </section>
  );
}
