"use client";
import type { ReactNode } from "react";

import { usePathname } from "next/navigation";
import { saveToLocalStorage } from "@/utils";
import ProgressBar from "../../../../components/ui/progress-bar";
import NavButtons from "./components/nav-buttons";
import { AutoBreadcrumb } from "@/components/layout/auto-breadcrump";

interface FormLayoutWrapperProps {
  children: ReactNode;
  onNext?: () => void;
  onPrevious?: () => void;
  disableNext?: boolean;
  disablePrevious?: boolean;
  nextButtonText?: string;
}

const steps = [
  {
    label: "Basic Information",
    href: "/products/add/basic-info",
  },
  {
    label: "Pricing & Stock",
    href: "/products/add/pricing-and-stock",
  },
  {
    label: "Images & Sizes",
    href: "/products/add/images-and-sizes",
  },
  {
    label: "Additional Details",
    href: "/products/add/additional-details",
  },
  {
    label: "Review",
    href: "/products/add/review-submit",
  },
];

export default function FormLayoutWrapper(props: FormLayoutWrapperProps) {
  const pathname = usePathname();
  saveToLocalStorage("currentStep", pathname);

  return (
    <div className="relative max-w-4xl px-6 pb-16">
      <AutoBreadcrumb invalidPaths={["add"]} />
      <ProgressBar steps={steps} />
      <main>{props.children}</main>
      <NavButtons
        onNext={props.onNext}
        onPrevious={props.onPrevious}
        disableNext={props.disableNext}
        disablePrevious={props.disablePrevious}
      />
    </div>
  );
}
