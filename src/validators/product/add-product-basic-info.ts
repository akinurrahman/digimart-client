import { z } from "zod";

export const basicProductSchema = z.object({
  product_name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters long")
    .max(100, "Product name must not exceed 100 characters"),

  product_description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters long")
    .max(1000, "Description must not exceed 1000 characters"),

  category: z.string().trim().min(1, "Category is required"),

  sub_category: z.string().trim().optional(),
});

export const pricingAndStockSchema = z.object({
  originalPrice: z
    .number()
    .positive({ message: "Original price must be greater than 0" }),
  discountPercentage: z.number().min(0).max(100).default(0),
  stock: z.number().positive({ message: "Stock must be greater than 0" }),
});

export const imagesAndSizesSchema = z.object({
  productImages: z
    .array(
      z.object({
        url: z.string().url("Invalid URL format for image"),
        thumbnail: z.string().url("Invalid URL format for thumbnail"),
      })
    )
    .min(1, "At least one product image is required")
    .max(8, "Your can't upload more than 8 image"),

  sizes: z
    .array(z.enum(["XS", "S", "M", "L", "XL", "XXL"]))
    .min(1, "At least one size must be selected"),
});

export const additionalDetailsSchema = z.object({
  tags: z
    .array(z.string().min(1, "tags cannot be empty"))
    .min(1, "At least 1 tags is required")
    .max(5, "You can't add more than five tags"),
  isBestSeller: z.boolean(),
  status: z.enum(["draft", "active"]),
  notes: z.string().optional(),
});

export type BasicProductType = z.infer<typeof basicProductSchema>;
export type PriceAndStockType = z.infer<typeof pricingAndStockSchema>;
export type ImagesAndSizesType = z.infer<typeof imagesAndSizesSchema>;
export type AdditionalDetailsType = z.infer<typeof additionalDetailsSchema>;

export type ProductFormData = {
  basicInfo: BasicProductType;
  pricingAndStock: PriceAndStockType;
  imagesAndSizes: ImagesAndSizesType;
  additionalDetails: AdditionalDetailsType;
};
