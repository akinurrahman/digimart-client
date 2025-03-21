"use client";

import { Checkbox } from "@/components/ui/checkbox"; // ShadCN Checkbox

export function CheckboxField() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="terms" className="border-primary" />
    </div>
  );
}
