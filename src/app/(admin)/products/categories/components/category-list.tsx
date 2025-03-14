"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import { DeleteConfirmDialog } from "@/components/modals/delete-confirmation-dialog";
import { useDeleteDialog } from "@/hooks/use-delete-dialog";
import SubcategoryList from "./sub-category-list";

export function CategoryList() {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const { mutate: deleteCategory } = useDeleteCategory();
  const { data: categories } = useFetchCategories();

  const { isDialogOpen, openDeleteDialog, closeDeleteDialog, handleDelete } =
    useDeleteDialog();

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
                onClick={(e) => {
                  e.stopPropagation(); // Stop event from reaching parent
                  openDeleteDialog(category._id);
                }}
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

      {/* Delete Confirmation Dialog */}
      {isDialogOpen && (
        <DeleteConfirmDialog
          title="Delete Category"
          description="Are you sure you want to delete this category? This action cannot be undone."
          onConfirm={() => handleDelete(deleteCategory)}
          onCancel={closeDeleteDialog}
        />
      )}
    </div>
  );
}
