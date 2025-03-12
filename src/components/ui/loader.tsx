import { LucideLoader } from "lucide-react";
import React from "react";

interface ButtonLoaderProps {
  size?: number;
  color?: string;
  loadingText?: string;
}

export const ButtonLoader = ({ size = 20, loadingText }: ButtonLoaderProps) => {
  return (
    <div className="flex items-center space-x-2">
      <LucideLoader className={`animate-spin`} size={size} />
      {loadingText && <span>{loadingText}</span>}
    </div>
  );
};

export const FullPageLoader = () => {
  return (
    <div className="bg-background flex h-screen w-screen items-center justify-center">
      <div className="border-primary h-16 w-16 animate-spin rounded-full border-t-4"></div>
    </div>
  );
};
