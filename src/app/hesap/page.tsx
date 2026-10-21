"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="pt-[calc(var(--header-height)+var(--announcement-height))]">
      <Container size="narrow">
        <div className="py-16 md:py-24">
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-light text-center mb-2">
            {isLogin ? "Giriş Yap" : "Hesap Oluştur"}
          </h1>
          <p className="text-sm text-[var(--color-muted-fg)] font-[family-name:var(--font-body)] text-center mb-10">
            {isLogin
              ? "Hesabınıza giriş yapın"
              : "Yeni bir hesap oluşturarak siparişlerinizi takip edin"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
            {!isLogin && (
              <div>
                <label className="block text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-body)] mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[var(--color-border)] px-4 py-3 text-sm font-[family-name:var(--font-body)] outline-none transition-colors focus:border-[var(--color-fg)] bg-transparent"
                  placeholder="Adınız Soyadınız"
                />
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-body)] mb-2">
                E-posta
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[var(--color-border)] px-4 py-3 text-sm font-[family-name:var(--font-body)] outline-none transition-colors focus:border-[var(--color-fg)] bg-transparent"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-body)] mb-2">
                Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[var(--color-border)] px-4 py-3 text-sm font-[family-name:var(--font-body)] outline-none transition-colors focus:border-[var(--color-fg)] bg-transparent"
                placeholder="••••••••"
              />
            </div>

            <Button variant="primary" size="lg" className="w-full">
              {isLogin ? "GİRİŞ YAP" : "HESAP OLUŞTUR"}
            </Button>
          </form>

          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-[family-name:var(--font-body)] text-[var(--color-muted-fg)] hover:text-[var(--color-fg)] transition-colors underline underline-offset-4 cursor-pointer"
            >
              {isLogin
                ? "Hesabınız yok mu? Hesap Oluşturun"
                : "Zaten hesabınız var mı? Giriş Yapın"}
            </button>
          </div>

          {isLogin && (
            <div className="text-center mt-4">
              <button
                type="button"
                className="text-xs font-[family-name:var(--font-body)] text-[var(--color-muted-fg)] hover:text-[var(--color-fg)] transition-colors underline underline-offset-4 cursor-pointer"
              >
                Şifremi Unuttum
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
