export interface Category {
  _id: string;
  name: string;
}

export interface SubCategory {
  _id: string;
  categoryId: string;
  subCategory: string;
}
