import { useState } from "react";

export function useDeleteDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);

  const openDeleteDialog = (id: string) => {
    setItemToDeleteId(id);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
    setItemToDeleteId(null);
  };

  const handleDelete = (mutateDelete: (itemToDeleteId: string) => void) => {
    if (itemToDeleteId) {
      mutateDelete(itemToDeleteId);
      closeDeleteDialog();
    }
  };

  return {
    isDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    handleDelete,
    itemToDeleteId,
  };
}
