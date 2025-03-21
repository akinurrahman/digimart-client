import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Something went wrong!";
  } else if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred!";
};

export const saveToLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

export const removeFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Add a utility function to clear all form persistent data
export const clearPersistentFormData = () => {
  if (typeof window !== "undefined") {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith("form_")) {
        localStorage.removeItem(key);
      }
    });
  }
};
