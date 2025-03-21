import { FormInput } from "@/components/form-input";
import { Label } from "@/components/ui/label";
import { AdditionalDetailsType } from "@/validators/product/add-product-basic-info";
import { DevTool } from "@hookform/devtools";
import React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface AdditionalDetailsProps {
  form: UseFormReturn<AdditionalDetailsType>;
}

const AdditionalDetailsForm = (props: AdditionalDetailsProps) => {
  const { form } = props;
  return (
    <FormProvider {...form}>
      <div className="space-y-6 p-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Additional Details</h2>
          <p className="text-muted-foreground">
            Add extra information to help customers find your product
          </p>
        </div>

        <form className="grid gap-6">
          <FormInput
            name="tags"
            fieldType="input"
            type="multi-item"
            label="Product Tags"
            placeholder="Add a Tag"
            required
          />

          <div className="flex gap-5">
            <FormInput name="isBestSeller" fieldType="switch" />
            <div className="space-y-0.5">
              <Label htmlFor="isBestSeller">Mark as Best Seller</Label>
              <p className="text-muted-foreground text-sm">
                Best seller products are highlighted on the homepage
              </p>
            </div>
          </div>

          <FormInput
            name="status"
            fieldType="radio-group"
            label="Product Status"
            options={[
              {
                value: "draft",
                label: "Draft",
                description:
                  "Save as draft to edit later. Not visible to customers.",
              },
              {
                value: "active",
                label: "Active",
                description:
                  "Product will be visible and available for purchase.",
              },
            ]}
          />

          <FormInput
            name="notes"
            label="Internal Notes (Optional)"
            fieldType="input"
            description="These notes are only visible to administrators"
            placeholder="Add notes for your team"
          />
        </form>
      </div>
      <DevTool control={form.control} />
    </FormProvider>
  );
};

export default AdditionalDetailsForm;
