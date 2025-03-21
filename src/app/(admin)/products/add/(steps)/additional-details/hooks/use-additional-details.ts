import { useMultiStepForm } from "@/hooks/form/use-multistep-form";
import { usePersistedForm } from "@/hooks/form/user-persistant-form";
import { getFromLocalStorage } from "@/utils";
import {
  additionalDetailsSchema,
  AdditionalDetailsType,
} from "@/validators/product/add-product-basic-info";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const useAdditionalDetails = () => {
  const formData = getFromLocalStorage("additionalDetails");
  const defaultValues = formData || {
    status: "draft",
    tags: [],
    isBestSeller: false,
    notes: "",
  };
  const form = useForm<AdditionalDetailsType>({
    defaultValues,
    resolver: zodResolver(additionalDetailsSchema),
  });

  usePersistedForm(form, "additionalDetails");

  const router = useRouter();
  const { markAsCompleted } = useMultiStepForm();
  const onPrevious = () => router.push("/products/add/images-and-sizes");
  const onNext = async () => {
    if (!(await form.trigger())) return;
    markAsCompleted();
    router.push("/products/add/review-submit");
  };

  return { onNext, onPrevious, form };
};
