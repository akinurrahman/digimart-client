"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackButton({ fallback = "/" }: { fallback?: string }) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
      className="flex items-center gap-2 rounded-md px-2 py-2 text-gray-700 transition-all hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
      <span className="text-sm font-medium">Back</span>
    </Button>
  );
}
