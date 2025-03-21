"use client";
import { cn } from "@/lib/utils";
import { getFromLocalStorage } from "@/utils";
import { Check } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

interface ProgressBarTypes {
  steps: { label: string; href: string }[];
}

const ProgressBar = ({ steps }: ProgressBarTypes) => {
  const currentPath = usePathname();
  const completedSteps = getFromLocalStorage("completedSteps") || [];

  // Get current step index
  const currentStepIndex =
    steps.findIndex((step) => step.href === currentPath) + 1;

  return (
    <div className="mb-5">
      {/* Progress Steps */}
      <div className="mx-auto hidden items-center md:flex">
        {steps.map((step, index) => (
          <div key={step.href} className="flex w-full flex-col">
            <div className="flex w-full items-center">
              {/* Step Circle */}
              <div className="flex cursor-pointer items-center" role="button">
                <div
                  className={cn(
                    "flex size-7 flex-shrink-0 items-center justify-center rounded-full border-2",
                    completedSteps.includes(step.href)
                      ? "border-primary bg-primary text-primary-foreground"
                      : currentPath === step.href
                        ? "border-primary text-primary"
                        : "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {completedSteps.includes(step.href) ? (
                    <Check className="size-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
              </div>

              {/* Connector Line (Hidden on Last Step) */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-1 flex-grow",
                    completedSteps.includes(step.href)
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  )}
                ></div>
              )}
            </div>

            {/* Step Label (Placed Below Circle) */}
            <span className="text-muted-foreground mt-1 text-xs">
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile Progress Indicator */}
      <div className="md:hidden">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
              {currentStepIndex}
            </div>
            <span className="ml-2 font-medium">
              {steps[currentStepIndex - 1]?.label || ""}
            </span>
          </div>
          <div className="text-muted-foreground text-sm">
            Step {currentStepIndex} of {steps.length}
          </div>
        </div>
        <div className="bg-muted-foreground/30 h-2 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStepIndex / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
