export const getAcceptedFormats = (accept: string): string => {
  if (accept.trim() === "*") {
    return "All file types are accepted";
  }

  const fileTypes: Record<string, string> = {
    "image/png": "PNG",
    "image/jpeg": "JPG",
    "image/webp": "WEBP",
    "image/*": "PNG, JPG, WEBP",
    "application/pdf": "PDF",
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
  };

  return accept
    .split(",")
    .map((type) => fileTypes[type.trim()] || type.trim()) // Default to the provided type if not mapped
    .join(", ");
};
