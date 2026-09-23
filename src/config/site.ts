export const siteConfig = {
  name: "Qubi Official",
  tagline: "Çağdaş Moda",
  description: "Modern günlük giyim için düşünülmüş bir gardırop.",
  url: "https://qubiofficial.com",
  currency: "TRY" as const,
  locale: "tr-TR" as const,
  announcement: "3000 TL ÜZERİ SİPARİŞLERDE ÜCRETSİZ KARGO",
  social: [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "TikTok", href: "#", icon: "tiktok" },
    { label: "Pinterest", href: "#", icon: "pinterest" },
  ],
  newsletter: {
    heading: "QUBI AİLESİNE KATILIN",
    subheading:
      "Yeni gelenlerden, özel fırsatlardan ve stil ilhamından ilk siz haberdar olun.",
  },
  footer: {
    columns: [
      {
        title: "MAĞAZA",
        links: [
          { label: "Yeni Gelenler", href: "/kategori/yeni-gelenler" },
          { label: "Elbiseler", href: "/kategori/elbiseler" },
          { label: "Blazerlar", href: "/kategori/dis-giyim" },
          { label: "Üstler", href: "/kategori/ustler" },
          { label: "Altlar", href: "/kategori/altlar" },
          { label: "Aksesuarlar", href: "/kategori/aksesuarlar" },
        ],
      },
      {
        title: "HAKKIMIZDA",
        links: [
          { label: "Hikayemiz", href: "/hakkimizda" },
          { label: "Journal", href: "/journal" },
          { label: "İletişim", href: "/iletisim" },
        ],
      },
      {
        title: "YARDIM",
        links: [
          { label: "Kargo", href: "/kargo" },
          { label: "İade", href: "/iade" },
          { label: "SSS", href: "/sss" },
          { label: "Beden Rehberi", href: "/beden-rehberi" },
        ],
      },
      {
        title: "YASAL",
        links: [
          { label: "Gizlilik", href: "/gizlilik" },
          { label: "Koşullar", href: "/kosullar" },
          { label: "Çerezler", href: "/cerezler" },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} Qubi Official. Tüm hakları saklıdır.`,
  },
} as const;
