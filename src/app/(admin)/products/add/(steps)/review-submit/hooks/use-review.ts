import { getErrorMessage, getFromLocalStorage } from "@/utils";
import { calculatePriceDetails } from "@/utils/calculate-discount";
import {
  additionalDetailsSchema,
  basicProductSchema,
  imagesAndSizesSchema,
  pricingAndStockSchema,
} from "@/validators/product/add-product-basic-info";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useReviewSubmit = () => {
  const router = useRouter();

  const basicInfo = getFromLocalStorage("basicInfo");
  const pricingAndStock = getFromLocalStorage("pricingAndStock");
  const imagesAndSizes = getFromLocalStorage("imagesAndSizes");
  const additionalDetails = getFromLocalStorage("additionalDetails");

  const { discountAmount, sellingPrice } = calculatePriceDetails({
    originalPrice: pricingAndStock.originalPrice,
    discountPercentage: pricingAndStock.discountPercentage,
  });

  const onPrev = () => {
    router.push("/products/add/additional-details");
  };

  const onSubmit = async () => {
    try {
      //check validation
      basicProductSchema.parse(basicInfo);
      pricingAndStockSchema.parse(pricingAndStock);
      imagesAndSizesSchema.parse(imagesAndSizes);
      additionalDetailsSchema.parse(additionalDetails);

      alert("all data is valid. susbmitting...");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return {
    onPrev,
    onSubmit,
    basicInfo,
    pricingAndStock,
    imagesAndSizes,
    additionalDetails,
    discountAmount,
    sellingPrice,
  };
};
