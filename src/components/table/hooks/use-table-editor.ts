"use client";

import { useState } from "react";

interface UseTableEditorProps<TData> {
  onDataUpdate?: (updatedData: TData) => void;
}

export function useTableEditor<TData>({
  onDataUpdate,
}: UseTableEditorProps<TData>) {
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Record<string, any>>({});

  // Function to start editing a row
  const startEditing = (rowId: string, rowData: any) => {
    setEditingRow(rowId);
    setEditedData({ ...rowData });
  };

  // Function to cancel editing
  const cancelEditing = () => {
    setEditingRow(null);
    setEditedData({});
  };

  // Function to save edited data
  const saveEditing = (originalRow: any) => {
    const updatedData = { ...originalRow, ...editedData };
    if (onDataUpdate) {
      onDataUpdate(updatedData as TData);
    }
    setEditingRow(null);
    setEditedData({});
  };

  // Function to handle field changes
  const handleFieldChange = (key: string, value: any) => {
    setEditedData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Get the current value for a field (from edited data or original)
  const getCurrentValue = (columnId: string, originalValue: any) => {
    return editedData[columnId] !== undefined
      ? editedData[columnId]
      : originalValue;
  };

  return {
    editingRow,
    editedData,
    startEditing,
    cancelEditing,
    saveEditing,
    handleFieldChange,
    getCurrentValue,
  };
}
