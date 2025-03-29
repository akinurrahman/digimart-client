import { TIME_IN_MS } from "@/constants";
import { ApiResponse } from "@/constants/interface-constants";
import generateApis from "@/services/api/rest-api";
import { Product } from "@/types/product-interface";
import { useQuery } from "@tanstack/react-query";

const productApis = generateApis("/product");

export const useFetchProducts = () => {
  return useQuery<ApiResponse<Product[]>>({
    queryKey: ["product"],
    queryFn: () => productApis.getAll(),
    staleTime: TIME_IN_MS.THIRTY_MINUTES,
  });
};
