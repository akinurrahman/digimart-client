"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import React from "react";
import { BackButton } from "./back-button";
import { usePathname, useRouter } from "next/navigation";
import { useQueryNavigation } from "@/hooks/use-query-navigation";

interface AutoBreadcrumbProps {
  showBackButton?: boolean;
  invalidPaths?: string[];
  withQueryParams?: boolean;
}

export function AutoBreadcrumb({
  showBackButton = true,
  invalidPaths = [],
  withQueryParams = true,
}: AutoBreadcrumbProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { updateQuery } = useQueryNavigation();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  // Convert array to Set for quick lookup
  const invalidPathsSet = new Set(invalidPaths);

  const handleNavigation = (href: string) => {
    if (withQueryParams) {
      updateQuery({ redirectPath: href });
    } else {
      router.push(href);
    }
  };

  // Function to check if a path is invalid
  const isInvalidPath = (href: string, segment: string) => {
    return invalidPathsSet.has(href) || invalidPathsSet.has(segment);
  };

  return (
    <>
      {showBackButton && <BackButton />}
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("/");
              }}
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.map((segment, index) => {
            const href = "/" + pathSegments.slice(0, index + 1).join("/");
            const isLast = index === pathSegments.length - 1;

            return (
              <React.Fragment key={href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>
                      {segment.replace(/-/g, " ")}
                    </BreadcrumbPage>
                  ) : isInvalidPath(href, segment) ? (
                    <span className="text-gray-500">
                      {segment.replace(/-/g, " ")}
                    </span>
                  ) : (
                    <BreadcrumbLink
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(href);
                      }}
                    >
                      {segment.replace(/-/g, " ")}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
