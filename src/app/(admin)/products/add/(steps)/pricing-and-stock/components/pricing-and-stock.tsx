import { FormInput } from "@/components/form-input";
import { PriceAndStockType } from "@/validators/product/add-product-basic-info";
import { DevTool } from "@hookform/devtools";
import React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import PricingSummery from "./pricing-summery";

interface PricingAndStockProps {
  form: UseFormReturn<PriceAndStockType>;
  discountPercentage: number;
  discountAmount: number;
  sellingPrice: number | undefined;
}

const PricingAndStockFrom = (props: PricingAndStockProps) => {
  const { form, ...pricingProps } = props;
  return (
    <FormProvider {...form}>
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">Pricing & Stock</h2>
        <p className="text-muted-foreground">
          Set your product&apos;s pricing and inventory details
        </p>
      </div>
      <form className="mt-5 grid gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <FormInput
            label="Original Price"
            name="originalPrice"
            fieldType="input"
            type="number"
            placeholder="Enter amount before discount"
            required
          />
          <FormInput
            label="Discount Percentage"
            name="discountPercentage"
            fieldType="input"
            type="number"
            placeholder="Enter discount percenter (0-100)"
            max={100}
            required
          />
        </div>

        <FormInput
          fieldType="slider"
          name="stock"
          sliderLabel="Stock Quantity"
          suffix="Unit"
          marks={[50, 100, 750, 1000]}
          max={1000}
        />

        <FormInput
          name="stock"
          fieldType="input"
          type="number"
          label="Stock Quantity (Manual Entry)"
          placeholder="Enter stock quantity"
          max={1000}
        />

        <PricingSummery
          originalPrice={form.watch("originalPrice")}
          {...pricingProps}
        />
      </form>
      <DevTool control={form.control} />
    </FormProvider>
  );
};

export default PricingAndStockFrom;
