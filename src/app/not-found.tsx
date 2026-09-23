import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-20">
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light">
          Sayfa Bulunamadi
        </h1>
        <p className="mt-4 text-[var(--color-muted-fg)] font-[family-name:var(--font-body)]">
          Aradiginiz sayfa mevcut degil veya kaldirilmis olabilir.
        </p>
        <Link
          href="/"
          className="mt-8 text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-body)] underline underline-offset-4 text-[var(--color-fg)] hover:text-[var(--color-muted-fg)] transition-colors"
        >
          Ana Sayfaya Don
        </Link>
      </div>
    </Container>
  );
}
