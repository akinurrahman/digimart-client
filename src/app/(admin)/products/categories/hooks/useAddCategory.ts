import generateApis from "@/services/api/rest-api";
import { getErrorMessage } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const categoryApis = generateApis("/category");

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => categoryApis.create({ name }),
    onSuccess: () => {
      toast.success("Category added successfully!");
      queryClient.invalidateQueries({
        queryKey: ["category"],
      });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useAddSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, name }: { categoryId: string; name: string }) =>
      categoryApis.createOne(categoryId, { subCategory: name }),
    onSuccess: ({ categoryId }) => {
      toast.success("SubCategory created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["subcategories", categoryId],
      });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};
