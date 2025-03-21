import { imagesAndSizesSchema } from "@/validators/product/add-product-basic-info";
import { z } from "zod";

type ProductImages = z.infer<typeof imagesAndSizesSchema>["productImages"];

export const validateProduct = (images: ProductImages, tags: string[]) => {
  const validations = [];

  if (images.length < 8) {
    validations.push({
      message: `Consider adding more product images (${images.length}/8)`,
      type: "warning",
    });
  }

  if (!tags || tags.length < 3) {
    validations.push({
      message: "Adding more tags may improve product visibility",
      type: "warning",
    });
  }

  return validations;
};
