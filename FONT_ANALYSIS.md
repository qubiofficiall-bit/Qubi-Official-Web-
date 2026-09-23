# Qubi Official — Font Analizi

## Referans Site: The UNDONE (theundone.com)

### Tespit Edilen Fontlar

**Başlık / Display Fontu:**
- The UNDONE, heading ve editorial bölümlerde serif bir font kullanmaktadır
- Tespit: Görsel analiz ve Shopify tema yapısına dayanarak, premium moda e-ticaret sitelerinde yaygın olan "Cormorant" veya benzeri editorial serif fontlar kullanılmaktadır
- Karakteristikler: hafif ağırlık (300-400), geniş x-height, zarif serifleri, editorial hissiyat

**Gövde / Navigasyon Fontu:**
- Geometrik sans-serif, küçük boyutta iyi okunurluk
- Geniş tracking (letter-spacing) ile uppercase kullanım navigasyonda belirgin
- Karakteristikler: temiz, modern, nötr

### Qubi Official Font Kararları

**Display Font: Cormorant Garamond**
- Kaynak: Google Fonts (açık lisans, SIL Open Font License)
- Neden: The UNDONE'ın serif heading estetiğine en yakın yasal alternatif
- Ağırlıklar: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- Kullanım: Hero başlıkları, ürün isimleri (detay sayfası), marka logosu, editorial başlıklar, bölüm başlıkları

**Body Font: DM Sans**
- Kaynak: Google Fonts (açık lisans)
- Neden: Geometrik sans-serif, modern ve temiz. Inter'den daha sıcak ve moda-odaklı bir his veriyor
- Ağırlıklar: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)
- Kullanım: Navigasyon, butonlar, gövde metni, fiyatlar, etiketler, footer

### Tipografi Token'ları

| Element | Font | Ağırlık | Boyut | Letter-Spacing | Text-Transform |
|---------|------|---------|-------|----------------|----------------|
| Hero Başlık | Cormorant Garamond | 300 | clamp(3rem, 6vw, 5.5rem) | -0.02em | uppercase |
| Bölüm Başlık | Cormorant Garamond | 300 | clamp(1.75rem, 3vw, 2.5rem) | -0.01em | none |
| Navigasyon | DM Sans | 400 | 11px | 0.1em | uppercase |
| Butonlar | DM Sans | 500 | 11-12px | 0.1em | uppercase |
| Gövde Metin | DM Sans | 400 | 15-16px | 0 | none |
| Ürün Adı (kart) | DM Sans | 400 | 14px | 0 | none |
| Ürün Fiyat | DM Sans | 400 | 14px | 0 | none |
| Etiket / Badge | DM Sans | 500 | 10px | 0.1em | uppercase |
| Footer | DM Sans | 400 | 13px | 0.02em | none |

### Fallback Fontlar

- Display: `"Cormorant Garamond", Georgia, "Times New Roman", serif`
- Body: `"DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif`

### Sınırlamalar

- Referans sitenin kesin fontu ağ erişim kısıtlaması nedeniyle doğrulanamadı
- Font seçimi, premium moda e-ticaret sektöründeki yaygın pratiklere ve görsel benzerliklere dayanmaktadır
- Cormorant Garamond, The UNDONE'ın serif estetiğine çok yakın ancak birebir aynı olmayabilir
- Her iki font da Google Fonts üzerinden ücretsiz ve açık lisanslı olarak kullanılabilmektedir
