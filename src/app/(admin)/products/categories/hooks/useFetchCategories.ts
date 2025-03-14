import { TIME_IN_MS } from "@/constants";
import { ApiResponse } from "@/constants/interface-constants";
import generateApis from "@/services/api/rest-api";
import { useQuery } from "@tanstack/react-query";

interface Category {
  _id: string;
  name: string;
}

interface SubCategory {
  _id: string;
  categoryId: string;
  subCategory: string;
}

const categoriesApi = generateApis("/category");

export const useFetchCategories = () => {
  return useQuery<ApiResponse<Category[]>>({
    queryKey: ["category"],
    queryFn: () => categoriesApi.getAll(),
    staleTime: TIME_IN_MS.TEN_MINUTES,
  });
};

export const useFetchSubCategories = (id: string) => {
  return useQuery<ApiResponse<SubCategory[]>>({
    queryKey: ["subcategories", id],
    queryFn: () => categoriesApi.getOne(id),
    staleTime: TIME_IN_MS.TEN_MINUTES,
    enabled: !!id, // Prevents execution if ID is not provided
  });
};
