import generateApis from "@/services/api/rest-api";
import {
  getErrorMessage,
  getFromLocalStorage,
  removeBatchFromLocalStorage,
} from "@/utils";
import { calculatePriceDetails } from "@/utils/calculate-discount";
import {
  additionalDetailsSchema,
  basicProductSchema,
  FlattenedProductFormData,
  imagesAndSizesSchema,
  pricingAndStockSchema,
} from "@/validators/product/add-product-basic-info";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ProductFormData, ReviewSubmitContextType } from "../types";

export const useReviewSubmit = (): ReviewSubmitContextType => {
  const router = useRouter();

  const basicInfo = getFromLocalStorage("basicInfo") as
    | ProductFormData["basicInfo"]
    | null;
  const pricingAndStock = getFromLocalStorage("pricingAndStock") as
    | ProductFormData["pricingAndStock"]
    | null;
  const imagesAndSizes = getFromLocalStorage("imagesAndSizes") as
    | ProductFormData["imagesAndSizes"]
    | null;
  const additionalDetails = getFromLocalStorage("additionalDetails") as
    | ProductFormData["additionalDetails"]
    | null;

  const priceDetails = calculatePriceDetails({
    originalPrice: pricingAndStock?.originalPrice ?? 0,
    discountPercentage: pricingAndStock?.discountPercentage ?? 0,
  });

  const mutation = useMutation({
    mutationFn: (data: FlattenedProductFormData) =>
      generateApis("/product").create(data),
    onSuccess: () => {
      toast.success("Product submitted successfully!");
      removeBatchFromLocalStorage([
        "basicInfo",
        "pricingAndStock",
        "imagesAndSizes",
        "additionalDetails",
        "completedSteps",
        "currentStep",
      ]);

      router.push("/products");
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error) || "Submission failed! Please try again."
      );
    },
  });

  const onPrev = () => {
    router.push("/products/add/additional-details");
  };

  const onSubmit = async () => {
    if (
      !basicInfo ||
      !pricingAndStock ||
      !imagesAndSizes ||
      !additionalDetails
    ) {
      toast.error("Please complete all steps before submitting");
      return;
    }

    try {
      // Validation before submitting
      basicProductSchema.parse(basicInfo);
      pricingAndStockSchema.parse(pricingAndStock);
      imagesAndSizesSchema.parse(imagesAndSizes);
      additionalDetailsSchema.parse(additionalDetails);
    } catch (error) {
      toast.error(
        getErrorMessage(error) || "Validation Failed! Please fill all details."
      );
      return;
    }

    // Only submit if validation passes
    mutation.mutate({
      ...basicInfo,
      ...pricingAndStock,
      ...imagesAndSizes,
      ...additionalDetails,
    });
  };

  return {
    onPrev,
    onSubmit,
    basicInfo,
    pricingAndStock,
    imagesAndSizes,
    additionalDetails,
    discountAmount: priceDetails.discountAmount,
    sellingPrice: priceDetails.sellingPrice ?? 0,
    isLoading: mutation.isPending,
  };
};
