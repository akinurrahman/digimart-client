import { useMutation, useQueryClient } from "@tanstack/react-query";
import generateApis from "@/services/api/rest-api";

const categoriesApi = generateApis("/category");

export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      subCategoryId,
    }: {
      categoryId: string;
      subCategoryId: string;
    }) => categoriesApi.deleteOne(subCategoryId),
    onSuccess: (_, { categoryId }) => {
      queryClient.invalidateQueries({
        queryKey: ["subcategories", categoryId],
      });
    },
  });
};
