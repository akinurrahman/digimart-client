"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useFetchCategories,
  useFetchSubCategories,
} from "../hooks/useFetchCategories";
import { useDeleteSubCategory } from "../hooks/useDeleteCategory";
import { DeleteConfirmDialog } from "@/components/modals/delete-confirmation-dialog";

export function CategoryList() {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const { data: categories } = useFetchCategories();

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <div className="space-y-3">
      {categories?.data.map((category) => (
        <div
          key={category._id}
          className="overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md"
        >
          <div
            className="bg-muted/50 flex cursor-pointer items-center justify-between p-3"
            onClick={() => toggleCategory(category._id)}
          >
            <div className="flex items-center gap-2">
              {expandedCategories[category._id] ? (
                <ChevronDown className="text-primary h-5 w-5" />
              ) : (
                <ChevronRight className="text-primary h-5 w-5" />
              )}
              <h3 className="font-medium">{category.name}</h3>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>

          {expandedCategories[category._id] && (
            <SubcategoryList categoryId={category._id} />
          )}
        </div>
      ))}
    </div>
  );
}

const SubcategoryList = ({ categoryId }: { categoryId: string }) => {
  const { data: subCategories, isLoading } = useFetchSubCategories(categoryId);
  const { mutate: deleteSubCategory } = useDeleteSubCategory();

  const [selectedSubCategory, setSelectedSubCategory] = useState<{
    categoryId: string;
    subCategoryId: string;
  } | null>(null);

  const handleDelete = () => {
    if (selectedSubCategory) {
      deleteSubCategory(selectedSubCategory);
      setSelectedSubCategory(null);
    }
  };

  return (
    <div className="p-3 pt-0">
      {isLoading ? (
        <p className="text-muted-foreground text-sm">
          Loading subcategories...
        </p>
      ) : (
        <div className="mt-3 space-y-2 pl-6">
          {subCategories?.data.length === 0 ? (
            <p className="text-muted-foreground text-sm">No subcategories</p>
          ) : (
            <div className="space-y-2">
              {subCategories?.data.map(({ _id, subCategory, categoryId }) => (
                <div
                  key={_id}
                  className="bg-background flex items-center justify-between rounded-md border p-2"
                >
                  <div className="flex items-center gap-2 px-2">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                    <h5 className="font-medium">{subCategory}</h5>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Pencil className="h-3.5 w-3.5" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive h-7 w-7"
                      onClick={() =>
                        setSelectedSubCategory({
                          categoryId,
                          subCategoryId: _id,
                        })
                      }
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedSubCategory && (
        <DeleteConfirmDialog
          title="Delete Subcategory"
          description="Are you sure you want to delete this subcategory? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setSelectedSubCategory(null)}
        />
      )}
    </div>
  );
};
