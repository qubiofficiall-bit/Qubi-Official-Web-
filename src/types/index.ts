export interface ProductColor {
  name: string;
  hex: string;
  slug: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  compareAtPrice: number | null;
  description: string;
  details: string[];
  care: string[];
  category: string;
  subcategory: string;
  tags: string[];
  colors: ProductColor[];
  sizes: string[];
  images: ProductImage[];
  featured: boolean;
  isNew: boolean;
  bestSeller: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  href: string;
  productIds: string[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  href: string;
}

export interface HeroSlide {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  ctaHref: string;
  image: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  description: string;
  image: string;
  layout: "full" | "half" | "third";
  href: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  color: ProductColor;
  quantity: number;
  image: string;
  slug: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
