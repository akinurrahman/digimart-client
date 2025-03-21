import {
  useFetchCategories,
  useFetchSubCategories,
} from "./use-fetch-categories";

export const useCategoryData = (selectedCategory: string) => {
  const { data: categories } = useFetchCategories();
  const { data: subCategories } = useFetchSubCategories(selectedCategory);

  return {
    categories:
      categories?.data?.map((cat) => ({ label: cat.name, value: cat._id })) ||
      [],
    subCategories:
      subCategories?.data?.map((sub) => ({
        label: sub.subCategory,
        value: sub._id,
      })) || [],
  };
};
