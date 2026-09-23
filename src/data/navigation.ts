import type { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  {
    label: "YENİ GELENLER",
    href: "/kategori/yeni-gelenler",
  },
  {
    label: "GİYİM",
    href: "/kategori/giyim",
    children: [
      { label: "Tümü", href: "/kategori/giyim" },
      { label: "Elbiseler", href: "/kategori/elbiseler" },
      { label: "Üstler", href: "/kategori/ustler" },
      { label: "Altlar", href: "/kategori/altlar" },
      { label: "Dış Giyim", href: "/kategori/dis-giyim" },
      { label: "Triko", href: "/kategori/triko" },
    ],
  },
  {
    label: "AKSESUARLAR",
    href: "/kategori/aksesuarlar",
    children: [
      { label: "Tümü", href: "/kategori/aksesuarlar" },
      { label: "Çantalar", href: "/kategori/cantalar" },
      { label: "Takılar", href: "/kategori/takilar" },
      { label: "Atkılar", href: "/kategori/atkilar" },
    ],
  },
  {
    label: "KOLEKSİYON",
    href: "/koleksiyon",
  },
  {
    label: "LOOKBOOK",
    href: "/lookbook",
  },
];
