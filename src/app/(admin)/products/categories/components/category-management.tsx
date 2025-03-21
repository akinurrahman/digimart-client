"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryForm } from "./category-form";
import { SubcategoryForm } from "./subcategory-form";
import { CategoryList } from "./category-list";
import { EditCategoryDialog } from "./edit-category-dialog";
import { EditSubcategoryDialog } from "./edit-subcategory-dialog";
import { DeleteConfirmDialog } from "@/components/modals/delete-confirmation-dialog";
import { useFetchCategories } from "../../../../../hooks/category/use-fetch-categories";

export type Category = {
  id: string;
  name: string;
  subcategories: Subcategory[];
};

export type Subcategory = {
  id: string;
  name: string;
  parentId: string;
};

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<{
    subcategory: Subcategory;
    parentCategory: Category;
  } | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null
  );
  const [deletingSubcategory, setDeletingSubcategory] = useState<{
    subcategory: Subcategory;
    parentCategory: Category;
  } | null>(null);

  const updateCategory = (updatedCategory: Category) => {
    setCategories(
      categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    setEditingCategory(null);
  };

  const updateSubcategory = (
    updatedSubcategory: Subcategory,
    parentCategory: Category
  ) => {
    setCategories(
      categories.map((category) => {
        if (category.id === parentCategory.id) {
          return {
            ...category,
            subcategories: category.subcategories.map((subcategory) =>
              subcategory.id === updatedSubcategory.id
                ? updatedSubcategory
                : subcategory
            ),
          };
        }
        return category;
      })
    );
    setEditingSubcategory(null);
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
    setDeletingCategory(null);
  };

  const deleteSubcategory = (
    subcategoryId: string,
    parentCategoryId: string
  ) => {
    setCategories(
      categories.map((category) => {
        if (category.id === parentCategoryId) {
          return {
            ...category,
            subcategories: category.subcategories.filter(
              (subcategory) => subcategory.id !== subcategoryId
            ),
          };
        }
        return category;
      })
    );
    setDeletingSubcategory(null);
  };

  const { data } = useFetchCategories();

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <div className="bg-accent p-4">
            <h2 className="text-accent-foreground text-xl font-semibold">
              Add New Category
            </h2>
          </div>
          <CardContent className="p-4">
            <CategoryForm />
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="bg-accent p-4">
            <h2 className="text-accent-foreground text-xl font-semibold">
              Add New Subcategory
            </h2>
          </div>
          <CardContent className="p-4">
            {!data?.data.length ? (
              <div className="text-muted-foreground py-4 text-center">
                No parent categories available. Create a category first.
              </div>
            ) : (
              <SubcategoryForm />
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="bg-accent p-4">
          <h2 className="text-accent-foreground text-xl font-semibold">
            Manage Categories
          </h2>
        </div>
        <CardContent className="">
          {!data?.data.length ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted mb-4 rounded-full p-3">
                <Plus className="text-muted-foreground h-6 w-6" />
              </div>
              <h3 className="mb-1 text-lg font-medium">No categories yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first category to get started
              </p>
            </div>
          ) : (
            <CategoryList />
          )}
        </CardContent>
      </Card>

      {editingCategory && (
        <EditCategoryDialog
          category={editingCategory}
          onSave={updateCategory}
          onCancel={() => setEditingCategory(null)}
        />
      )}

      {editingSubcategory && (
        <EditSubcategoryDialog
          subcategory={editingSubcategory.subcategory}
          parentCategory={editingSubcategory.parentCategory}
          onSave={(updatedSubcategory) =>
            updateSubcategory(
              updatedSubcategory,
              editingSubcategory.parentCategory
            )
          }
          onCancel={() => setEditingSubcategory(null)}
        />
      )}

      {deletingCategory && (
        <DeleteConfirmDialog
          title="Delete Category"
          description={`Are you sure you want to delete "${deletingCategory.name}" and all its subcategories? This action cannot be undone.`}
          onConfirm={() => deleteCategory(deletingCategory.id)}
          onCancel={() => setDeletingCategory(null)}
        />
      )}

      {deletingSubcategory && (
        <DeleteConfirmDialog
          title="Delete Subcategory"
          description={`Are you sure you want to delete "${deletingSubcategory.subcategory.name}"? This action cannot be undone.`}
          onConfirm={() =>
            deleteSubcategory(
              deletingSubcategory.subcategory.id,
              deletingSubcategory.parentCategory.id
            )
          }
          onCancel={() => setDeletingSubcategory(null)}
        />
      )}
    </div>
  );
}
