import { DeleteConfirmDialog } from "@/components/modals/delete-confirmation-dialog";
import { useFetchSubCategories } from "../hooks/useFetchCategories";
import { useDeleteSubCategory } from "../hooks/useDeleteCategory";
import { useDeleteDialog } from "@/hooks/use-delete-dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const SubcategoryList = ({ categoryId }: { categoryId: string }) => {
  const { data: subCategories, isLoading } = useFetchSubCategories(categoryId);
  const { mutate: deleteSubCategory } = useDeleteSubCategory();

  const { isDialogOpen, openDeleteDialog, closeDeleteDialog, itemToDeleteId } =
    useDeleteDialog();

  const handleDeleteAction = () => {
    if (itemToDeleteId) {
      deleteSubCategory({ categoryId, subCategoryId: itemToDeleteId });
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
              {subCategories?.data.map(({ _id, subCategory }) => (
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
                      onClick={() => openDeleteDialog(_id)}
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
      {isDialogOpen && (
        <DeleteConfirmDialog
          title="Delete Subcategory"
          description="Are you sure you want to delete this subcategory? This action cannot be undone."
          onConfirm={handleDeleteAction}
          onCancel={closeDeleteDialog}
        />
      )}
    </div>
  );
};
export default SubcategoryList;
