import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  basicProductSchema,
  BasicProductType,
} from "@/validators/product/add-product-basic-info";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils";
import { usePersistedForm } from "@/hooks/form/user-persistant-form";
import { useMultiStepForm } from "@/hooks/form/use-multistep-form";
import { useCategoryData } from "@/hooks/category/use-category-data";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useBasicInfoForm = () => {
  const storedData = getFromLocalStorage("basicInfo");
  const defaultValues = storedData || {
    product_name: "",
    product_description: "",
    category: "",
    sub_category: "",
  };

  const form = useForm<BasicProductType>({
    resolver: zodResolver(basicProductSchema),
    defaultValues,
  });

  usePersistedForm(form, "basicInfo");

  const router = useRouter();
  const { markAsCompleted } = useMultiStepForm();
  const selectedCategory = form.watch("category");
  const { categories, subCategories } = useCategoryData(selectedCategory);

  useEffect(() => {
    if (categories.length > 0) {
      saveToLocalStorage("categories", categories);
      saveToLocalStorage("subCategories", subCategories);
    }
  }, [categories, subCategories]);

  const handleNext = async () => {
    if (!(await form.trigger())) return;
    markAsCompleted();
    router.push("/products/add/pricing-and-stock");
  };

  return { form, categories, subCategories, handleNext };
};
