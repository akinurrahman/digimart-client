import { useMultiStepForm } from "@/hooks/form/use-multistep-form";
import { usePersistedForm } from "@/hooks/form/user-persistant-form";
import { getFromLocalStorage } from "@/utils";
import {
  imagesAndSizesSchema,
  ImagesAndSizesType,
} from "@/validators/product/add-product-basic-info";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const useImagesAndSizes = () => {
  const storedData = getFromLocalStorage("imagesAndSizes");
  const defaultValues = storedData || {
    productImages: [],
    sizes: [],
  };

  const form = useForm<ImagesAndSizesType>({
    defaultValues,
    resolver: zodResolver(imagesAndSizesSchema),
  });

  usePersistedForm(form, "imagesAndSizes");

  const router = useRouter();
  const { markAsCompleted } = useMultiStepForm();

  const handleNext = async () => {
    if (!(await form.trigger())) return;
    markAsCompleted();
    router.push("/products/add/additional-details");
  };

  const handlePrev = () => {
    router.push("/products/add/pricing-and-stock");
  };

  const availableSizes: ImagesAndSizesType["sizes"] = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ];

  return { form, handleNext, handlePrev, availableSizes };
};
