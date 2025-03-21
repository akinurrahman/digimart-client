import { getErrorMessage } from "@/utils";
import { toast } from "sonner";
import apiClient from "../api/api-client";

export const uploadToCloud = async (files: File | File[]) => {
  try {
    const formData = new FormData();

    if (Array.isArray(files)) {
      // Handle multiple files
      files.forEach((file) => formData.append("files", file));
      const response = await apiClient.post("/api/v1/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.data.urls; // Array of file URLs
    }
  } catch (error) {
    console.error("File upload failed:", error);
    toast.error(getErrorMessage(error));
    return null;
  }
};
