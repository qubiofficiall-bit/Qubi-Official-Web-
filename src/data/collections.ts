import type { Collection } from "@/types";

export const collections: Collection[] = [
  {
    id: "col-001",
    slug: "yeni-gelenler",
    name: "Yeni Gelenler",
    description:
      "Bu sezonun en yeni parçalarını keşfedin. Modern çizgiler ve özenli kumaşlarla tasarlanmış koleksiyon.",
    image: "/images/collections/yeni-gelenler.svg",
    href: "/koleksiyon/yeni-gelenler",
    productIds: ["prod-001", "prod-002", "prod-006", "prod-009"],
  },
  {
    id: "col-002",
    slug: "giyim",
    name: "Giyim",
    description:
      "Elbiselerden blazerlara, trikolardan pantolonlara kadar tüm giyim parçaları bir arada.",
    image: "/images/collections/giyim.svg",
    href: "/koleksiyon/giyim",
    productIds: [
      "prod-001",
      "prod-002",
      "prod-003",
      "prod-004",
      "prod-005",
      "prod-007",
      "prod-008",
      "prod-009",
      "prod-010",
    ],
  },
  {
    id: "col-003",
    slug: "aksesuarlar",
    name: "Aksesuarlar",
    description:
      "Stilinizi tamamlayacak el yapımı deri çantalar, zarif takılar ve yumuşacık atkılar.",
    image: "/images/collections/aksesuarlar.svg",
    href: "/koleksiyon/aksesuarlar",
    productIds: ["prod-006", "prod-011", "prod-012"],
  },
  {
    id: "col-004",
    slug: "koleksiyon",
    name: "Sonbahar / Kış Koleksiyonu",
    description:
      "Sıcak tonlar, zengin dokular ve katmanlı stiller. Sezonun ruhunu yansıtan özel seçki.",
    image: "/images/collections/sonbahar-kis.svg",
    href: "/koleksiyon/koleksiyon",
    productIds: [
      "prod-002",
      "prod-003",
      "prod-007",
      "prod-009",
      "prod-012",
    ],
  },
  {
    id: "col-005",
    slug: "cok-satanlar",
    name: "Çok Satanlar",
    description:
      "En sevilen ve en çok tercih edilen parçalar. Qubi müşterilerinin favorileri.",
    image: "/images/collections/cok-satanlar.svg",
    href: "/koleksiyon/cok-satanlar",
    productIds: [
      "prod-001",
      "prod-003",
      "prod-004",
      "prod-007",
      "prod-011",
    ],
  },
];
