"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function useQueryNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = ({
    params = {},
    removeParams = [],
    redirectPath,
  }: {
    params?: Record<string, string | undefined>;
    removeParams?: string | string[];
    redirectPath?: string;
  }) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    // Ensure removeParams is an array
    const removeList = Array.isArray(removeParams)
      ? removeParams
      : [removeParams];

    // Add or update query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        currentParams.set(key, value);
      }
    });

    // Remove specified query parameters
    removeList.forEach((param) => currentParams.delete(param));

    // Construct new URL
    const newUrl = `${redirectPath ?? pathname}?${currentParams.toString()}`;

    // Prevent unnecessary updates
    if (newUrl !== `${pathname}?${searchParams.toString()}`) {
      router.push(newUrl);
    }
  };

  return { updateQuery };
}
