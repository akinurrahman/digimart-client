import { z } from "zod";
import {
  basicProductSchema,
  pricingAndStockSchema,
  imagesAndSizesSchema,
  additionalDetailsSchema,
} from "@/validators/product/add-product-basic-info";

export type BasicProductType = z.infer<typeof basicProductSchema>;
export type PriceAndStockType = z.infer<typeof pricingAndStockSchema>;
export type ImagesAndSizesType = z.infer<typeof imagesAndSizesSchema>;
export type AdditionalDetailsType = z.infer<typeof additionalDetailsSchema>;

export interface ProductFormData {
  basicInfo: BasicProductType;
  pricingAndStock: PriceAndStockType;
  imagesAndSizes: ImagesAndSizesType;
  additionalDetails: AdditionalDetailsType;
}

export interface ReviewSubmitContextType {
  basicInfo: BasicProductType | null;
  pricingAndStock: PriceAndStockType | null;
  imagesAndSizes: ImagesAndSizesType | null;
  additionalDetails: AdditionalDetailsType | null;
  discountAmount: number;
  sellingPrice: number;
  isLoading: boolean;
  onPrev: () => void;
  onSubmit: () => Promise<void>;
}
