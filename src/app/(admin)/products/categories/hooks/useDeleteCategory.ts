import { useMutation, useQueryClient } from "@tanstack/react-query";
import generateApis from "@/services/api/rest-api";

const categoriesApi = {
  category: generateApis("/category"),
  subCategory: generateApis("/subcategory"),
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: string) =>
      categoriesApi.category.deleteOne(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category"],
      });
    },
  });
};

export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      subCategoryId,
    }: {
      categoryId: string;
      subCategoryId: string;
    }) => categoriesApi.subCategory.deleteOne(subCategoryId),
    onSuccess: (_, { categoryId }) => {
      queryClient.invalidateQueries({
        queryKey: ["subcategories", categoryId],
      });
    },
  });
};
