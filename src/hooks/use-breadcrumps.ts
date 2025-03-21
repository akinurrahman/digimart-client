"use client";

import { checkIfPathExists } from "@/utils/check-if-path-exists";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Custom hook to generate breadcrumb paths
export function useBreadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  const [validPaths, setValidPaths] = useState(new Set<string>());

  useEffect(() => {
    async function validatePaths() {
      const newValidPaths = new Set<string>();
      for (let i = 1; i <= pathSegments.length; i++) {
        const path = "/" + pathSegments.slice(0, i).join("/");
        if (await checkIfPathExists(path)) {
          newValidPaths.add(path);
        }
      }
      setValidPaths(newValidPaths);
    }
    validatePaths();
  }, [pathname, pathSegments]);

  return { pathSegments, validPaths };
}
