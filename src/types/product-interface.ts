import { Category, SubCategory } from "./category-interface";

interface ProductImage {
  url: string;
  thumbnail: string;
  _id: string;
}

export interface Product {
  _id: string;
  product_name: string;
  product_description: string;
  category: Category;
  sub_category: Omit<SubCategory, "categoryId">; // Excludes categoryId;
  originalPrice: number;
  discountPercentage: number;
  isBestSeller: boolean;
  productImages: ProductImage[];
  sizes: string[];
  stock: number;
  tags: string[];
  status: "draft" | "active";
  notes: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
