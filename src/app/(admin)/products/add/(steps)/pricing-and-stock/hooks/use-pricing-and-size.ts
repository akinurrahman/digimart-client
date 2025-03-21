import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  pricingAndStockSchema,
  PriceAndStockType,
} from "@/validators/product/add-product-basic-info";
import { getFromLocalStorage } from "@/utils";
import { useQueryNavigation } from "@/hooks/use-query-navigation";
import { usePersistedForm } from "@/hooks/form/user-persistant-form";
import { useMultiStepForm } from "@/hooks/form/use-multistep-form";
import { calculatePriceDetails } from "@/utils/calculate-discount";

export const usePricingAndStockForm = () => {
  const storedData = getFromLocalStorage("pricingAndStock");
  const defaultValues = storedData || {
    originalPrice: 0,
    discountPercentage: 0,
    stock: 0,
  };

  const form = useForm<PriceAndStockType>({
    resolver: zodResolver(pricingAndStockSchema),
    defaultValues,
  });

  usePersistedForm(form, "pricingAndStock");

  const { updateQuery } = useQueryNavigation();
  const { markAsCompleted } = useMultiStepForm();

  const originalPrice = form.watch("originalPrice") || 0;
  const discountPercentage = form.watch("discountPercentage") || 0;

  const { discountAmount, sellingPrice } = calculatePriceDetails({
    originalPrice,
    discountPercentage,
  });

  const handleNext = async () => {
    if (!(await form.trigger())) return;
    markAsCompleted();
    updateQuery({ redirectPath: "/products/add/images-and-sizes" });
  };

  const handlePrevious = async () => {
    updateQuery({ redirectPath: "/products/add/basic-info" });
  };

  return {
    form,
    discountAmount,
    discountPercentage,
    sellingPrice,
    handleNext,
    handlePrevious,
  };
};
