# Qubi Official — Premium Fashion E-Commerce Storefront

## Context

Kullanıcı, "Qubi Official" adlı moda markası için üretim kalitesinde, orijinal bir e-ticaret vitrini istiyor. The UNDONE (theundone.com) yalnızca görsel yön referansı olarak kullanılacak — tipografi, boşluk, editorial kompozisyon ve ürün sunumu açısından. Site tamamen Türkçe olacak (tüm UI metinleri, menüler, butonlar, ürün açıklamaları). Repo şu an boş — sıfırdan inşa edilecek.

---

## Teknoloji

- Next.js 14+ (App Router)
- React + TypeScript
- Tailwind CSS
- Lucide React
- Google Fonts: **Cormorant Garamond** (display) + **DM Sans** (body/nav)

---

## Faz 1 — Proje Temeli

### 1.1 Başlatma
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias
npm install lucide-react clsx
```

### 1.2 Dosyalar
- `.gitignore` — standart Next.js
- `tailwind.config.ts` — CSS custom property'leri tüketen extended tema (renkler, fontlar, spacing, animasyonlar)
- `postcss.config.mjs`
- `next.config.ts` — image optimization ayarları

### 1.3 Design Token'ları (`src/styles/tokens.css`)

| Token | Değer | Kullanım |
|---|---|---|
| `--color-background` | `#FAF9F7` | Sayfa arka planı |
| `--color-foreground` | `#1A1A1A` | Ana metin |
| `--color-muted` | `#F0EEEB` | Bölüm arka planları |
| `--color-muted-foreground` | `#6B6560` | İkincil metin |
| `--color-accent` | `#C4B5A3` | Vurgu rengi |
| `--color-border` | `#E5E2DD` | Çizgi/border |
| `--font-display` | Cormorant Garamond | Başlıklar, hero, marka |
| `--font-body` | DM Sans | Nav, buton, gövde metin |
| `--header-height` | `72px` | Sabit header yüksekliği |
| `--drawer-width` | `420px` | Sepet çekmecesi genişliği |

### 1.4 Global Stiller (`src/styles/globals.css`)
- tokens.css import
- Tailwind base/components/utilities
- Base layer: body styling, heading font-display, selection color, scrollbar gizleme

### 1.5 Tip Tanımları (`src/types/index.ts`)
- `Product`, `ProductColor`, `ProductImage`, `Collection`, `Category`
- `HeroSlide`, `LookbookItem`, `CartItem`

### 1.6 Site Config (`src/config/site.ts`)
- Marka adı, açıklama, para birimi (TRY/₺), duyuru çubuğu metni
- Sosyal medya linkleri, newsletter ayarları
- Footer sütunları
- **Tüm metinler Türkçe**

### 1.7 Root Layout (`src/app/layout.tsx`)
- Google Fonts yükleme (Cormorant Garamond + DM Sans)
- `lang="tr"` ayarı
- Metadata, context provider'lar, Header, Footer sarmalı

---

## Faz 2 — Layout Bileşenleri

### 2.1 Navigasyon Verisi (`src/data/navigation.ts`)
Menü öğeleri Türkçe:
- YENİ GELENLER, GİYİM (Alt: Elbiseler, Üstler, Altlar, Dış Giyim, Triko), AKSESUARLAR, KOLEKSİYON, LOOKBOOK

### 2.2 UI Temelleri (`src/components/ui/`)
- **Container.tsx** — max-w-[1440px], responsive padding (32/24/16px)
- **Button.tsx** — Varyantlar: primary (siyah), secondary (kenarlıklı), ghost, link. Köşesiz, uppercase, geniş tracking
- **Accordion.tsx** — Ürün detay ve SSS için animasyonlu açılır/kapanır

### 2.3 Logo (`src/components/brand/Logo.tsx`)
- "QUBI OFFICIAL" tipografi logosu, Cormorant Garamond, geniş letter-spacing
- dark/light varyantları (hero üzerinde beyaz, normal sayfada siyah)

### 2.4 Header (`src/components/layout/Header.tsx`)
- Sabit pozisyon, scroll'da transparent → solid geçiş
- Sol: Logo | Orta: DesktopNav | Sağ: Arama, Favori, Sepet ikonları
- Mobil: Logo + Hamburger + Sepet
- Sepet ikonu üzerinde ürün sayısı badge'i

### 2.5 Desktop Nav (`src/components/layout/DesktopNav.tsx`)
- Uppercase nav linkleri, hover'da alt çizgi animasyonu
- Alt menüler (dropdown) hover'da görünür

### 2.6 Mobil Nav (`src/components/layout/MobileNav.tsx`)
- Tam ekran slide-in overlay
- Büyük display font'lu menü öğeleri
- Alt menüler accordion ile açılır

### 2.7 Footer (`src/components/layout/Footer.tsx`)
- Koyu arka plan (`bg-foreground text-background`)
- 4 sütun: Mağaza, Hakkımızda, Yardım, Yasal
- Newsletter signup, sosyal linkler, telif hakkı

### 2.8 Duyuru Çubuğu (`src/components/layout/AnnouncementBar.tsx`)
- "3000 TL ÜZERİ SİPARİŞLERDE ÜCRETSİZ KARGO"
- Kapatılabilir, config'den okunur

---

## Faz 3 — Veri Katmanı

### 3.1 Ürün Verisi (`src/data/products.ts`)
12+ ürün, Türkçe isim ve açıklamalarla:
1. İpek Drapeli Midi Elbise (₺12.950)
2. Oversize Yün Blazer (₺15.900)
3. Kaşmir Triko Kazak (₺10.500)
4. Geniş Paça Kumaş Pantolon (₺8.990)
5. Keten Relaxed Gömlek (₺6.450)
6. Deri Çapraz Çanta (₺14.750)
7. Merinos Balıkçı Yaka (₺7.200)
8. İpek Askılı Üst (₺5.400)
9. Yapısal Trençkot (₺19.500)
10. Pileli Midi Etek (₺7.990)
11. Altın Zincir Kolye (₺6.100)
12. Yün Atkı (₺4.750)

Her ürün: id, slug, name, description, price, images, colors, sizes, category, tags, badge

### 3.2 Koleksiyonlar (`src/data/collections.ts`)
- yeni-gelenler, giyim, aksesuarlar, koleksiyon, cok-satanlar

### 3.3 Kategoriler (`src/data/categories.ts`)
- Elbiseler, Dış Giyim, Triko, Aksesuarlar, Yeni Gelenler, Koleksiyon

### 3.4 Ana Sayfa İçeriği (`src/data/homepage.ts`)
- Hero slide'ları, marka açıklaması, editorial hikaye, kampanya banner'ı — tümü Türkçe

### 3.5 Lookbook (`src/data/lookbook.ts`)
- 6-8 lookbook öğesi, asimetrik layout tanımlarıyla

### 3.6 Veri Erişim Katmanı (`src/lib/products.ts`)
```ts
getProducts(), getProductBySlug(), getProductsByCategory()
getProductsByCollection(), searchProducts(), getFeaturedProducts()
getRelatedProducts()
```
Şu an statik veri, ileride Shopify/Medusa/API'ye geçiş için bu dosya değiştirilir, UI dokunulmaz.

### 3.7 Arama (`src/lib/search.ts`)
- İsim, kategori, etiket üzerinden arama, Türkçe karakter desteği

---

## Faz 4 — Context Provider'lar

### 4.1 Sepet (`src/context/CartContext.tsx`)
- `useReducer` ile state yönetimi
- Aksiyonlar: ekle, çıkar, miktar güncelle, sepeti aç/kapat
- localStorage'a kayıt (`qubi-cart`), SSR hydration guard

### 4.2 Favoriler (`src/context/WishlistContext.tsx`)
- `useState` ile ürün ID listesi
- toggleWishlist, isInWishlist
- localStorage'a kayıt (`qubi-wishlist`)

---

## Faz 5 — Ana Sayfa Bileşenleri

Sırayla:
1. **Hero** — Tam ekran editorial kampanya, overlay metin, CTA butonu. "YENİ SEZON / QUBI KOLEKSİYONU"
2. **Marka Açıklaması** — Geniş boşluklu, merkezli tipografik blok
3. **Öne Çıkan Ürünler** — 4 sütun grid, ProductCard ile
4. **Editorial Hikaye** — Asimetrik 2 sütun (60/40), büyük görsel + metin
5. **Kategoriler** — Asimetrik grid, hover'da zoom
6. **Kampanya Banner** — Tam genişlik immersive görsel
7. **Lookbook** — Dergi tarzı asimetrik grid
8. **Bülten** — "QUBI AİLESİNE KATILIN", email input + abone ol
9. **Sosyal Grid** — @QUBIOFFICIAL, 6 kare görsel

Her bileşen `src/components/home/` altında ayrı dosya.

---

## Faz 6 — Ürün Bileşenleri

### ProductCard (`src/components/product/ProductCard.tsx`)
- Görsel (3:4 oran), hover'da ikinci görsel + hafif zoom
- Badge (YENİ), ürün adı, fiyat
- Favori kalp ikonu (hover'da görünür)

### ProductGrid (`src/components/product/ProductGrid.tsx`)
- Responsive: 2 sütun mobil, 3 tablet, 4 desktop
- Ürün listesi ve sütun sayısı prop olarak alır

### ProductGallery (`src/components/product/ProductGallery.tsx`)
- Desktop: küçük resimler sol, büyük resim sağ
- Mobil: yatay kaydırmalı galeri

### ProductInfo (`src/components/product/ProductInfo.tsx`)
- Marka, ürün adı, fiyat, renk seçici, beden seçici, sepete ekle
- Accordion: Açıklama, Detaylar, Bakım, Kargo & İade

### AddToCart (`src/components/product/AddToCart.tsx`)
- Beden seçimi zorunlu, sepete ekleyince drawer açılır

---

## Faz 7 — Sepet ve Arama

### CartDrawer (`src/components/cart/CartDrawer.tsx`)
- Sağdan slide-in, backdrop ile
- Ürün listesi, miktar düzenleme, silme
- Alt kısım: Ara toplam, ödeme butonu
- Boş sepet durumu

### SearchOverlay (`src/components/search/SearchOverlay.tsx`)
- Tam ekran overlay, büyük input
- Debounced arama, sonuçlar anlık gösterilir
- ESC ile kapatılır

---

## Faz 8 — Sayfalar

### Ana Sayfa (`src/app/page.tsx`)
- Tüm home bileşenlerini sırayla render eder

### Koleksiyon Sayfası (`src/app/collections/[slug]/page.tsx`)
- Koleksiyon başlığı, açıklama, ürün sayısı
- Sıralama kontrolü (Öne Çıkan, Fiyat Artan, Fiyat Azalan, En Yeni)
- ProductGrid

### Ürün Detay (`src/app/products/[slug]/page.tsx`)
- Desktop: galeri sol (60%), bilgi sağ (40%)
- Mobil: galeri üst, bilgi alt
- İlgili ürünler bölümü

### Favoriler (`src/app/wishlist/page.tsx`)
- Favorilenen ürünlerin grid'i
- Boş durum mesajı

### 404 (`src/app/not-found.tsx`)

---

## Faz 9 — Placeholder Görseller

`public/images/` altında SVG placeholder'lar:
- `products/` — ~24 dosya (12 ürün x 2 görsel, 3:4 oran)
- `hero/` — 2-3 dosya (16:9)
- `editorial/` — 2 dosya (3:4)
- `categories/` — 6 dosya (3:4)
- `campaign/` — 1 dosya (16:9)
- `lookbook/` — 6 dosya (karışık)
- `social/` — 6 dosya (1:1)

Toplamda ~50 SVG. Her biri şık nötr renk dolgusu + tanımlayıcı metin etiketi.

---

## Faz 10 — Cilalama ve Doğrulama

### Responsive Test
- 1440, 1280, 1024, 768, 430, 390, 375, 360px

### Animasyonlar
- `cubic-bezier(0.22, 1, 0.36, 1)` editorial easing
- Image hover: 300-600ms, drawer: 300ms, fade-in: 400-700ms
- `prefers-reduced-motion` desteği

### Erişilebilirlik
- Semantik HTML, heading hiyerarşisi, alt text, klavye navigasyonu
- ARIA etiketleri, erişilebilir dialog'lar, focus tuzağı

### SEO
- Türkçe metadata: "Qubi Official — Çağdaş Moda"
- Dinamik meta description ürün ve koleksiyon sayfaları için
- Open Graph etiketleri

### FONT_ANALYSIS.md
- Referans font analizi, kullanılan fontlar, neden seçildi, alternatifler

### Son Doğrulama
- `npm run build` hatasız
- Tüm sayfalar çalışıyor
- Sepet, favoriler, arama, mobil menü çalışıyor
- localStorage persistence çalışıyor
- Yatay taşma yok
- Hydration hataları yok

---

## Türkçe Dil Detayları

Tüm kullanıcıya görünen metinler Türkçe:
- Nav: YENİ GELENLER, GİYİM, AKSESUARLAR, KOLEKSİYON, LOOKBOOK
- Header aksiyonları: ARA, SEPET, FAVORİLER
- Butonlar: SEPETE EKLE, SATIN AL, ABONE OL, KEŞFETİN
- Duyuru: "3000 TL ÜZERİ SİPARİŞLERDE ÜCRETSİZ KARGO"
- Newsletter: "QUBI AİLESİNE KATILIN"
- Footer: MAĞAZA, HAKKIMIZDA, YARDIM, YASAL
- Ürün detay: Açıklama, Detaylar, Bakım, Kargo ve İade, Beden Rehberi
- Sepet: Sepetiniz, Ara Toplam, Ödemeye Geç, Alışverişe Devam Et
- Arama: "Ne arıyorsunuz?"
- Boş durumlar: "Sepetiniz boş", "Favori listeniz boş"
- `lang="tr"` HTML attribute

Teknik kod (değişken isimleri, dosya isimleri, prop isimleri) İngilizce kalır.

---

## Kritik Dosya Listesi

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── collections/[slug]/page.tsx
│   ├── products/[slug]/page.tsx
│   └── wishlist/page.tsx
├── components/
│   ├── brand/Logo.tsx
│   ├── layout/Header.tsx, DesktopNav.tsx, MobileNav.tsx, Footer.tsx, AnnouncementBar.tsx
│   ├── home/Hero.tsx, BrandStatement.tsx, FeaturedProducts.tsx, EditorialStory.tsx,
│   │        CategoryGrid.tsx, CampaignBanner.tsx, Lookbook.tsx, Newsletter.tsx, SocialGrid.tsx
│   ├── product/ProductCard.tsx, ProductGrid.tsx, ProductGallery.tsx, ProductInfo.tsx, AddToCart.tsx
│   ├── cart/CartDrawer.tsx
│   ├── search/SearchOverlay.tsx
│   └── ui/Container.tsx, Button.tsx, Accordion.tsx
├── context/CartContext.tsx, WishlistContext.tsx
├── data/products.ts, categories.ts, collections.ts, homepage.ts, navigation.ts, lookbook.ts
├── config/site.ts
├── lib/products.ts, search.ts, utils.ts
├── hooks/useScrollPosition.ts, useLockBodyScroll.ts, useMediaQuery.ts, useDebounce.ts, useInView.ts
├── styles/tokens.css, globals.css
└── types/index.ts
public/images/{products,hero,editorial,categories,campaign,lookbook,social}/*.svg
FONT_ANALYSIS.md
```
