"use client";

import { Separator } from "@/components/ui/separator";
import { ProductFormData } from "@/validators/product/add-product-basic-info";
import React from "react";
import ValidationSummery from "./validation-summery";
import ImageDisplaySection from "./image-display-section";
import ProductDetailsSection from "./product-details-section";

interface ReviewProps {
  basicInfo: ProductFormData["basicInfo"];
  pricingAndStock: ProductFormData["pricingAndStock"];
  imagesAndSizes: ProductFormData["imagesAndSizes"];
  additionalDetails: ProductFormData["additionalDetails"];
  sellingPrice: number | undefined;
}

const ReviewSubmit = (props: ReviewProps) => {
  const { imagesAndSizes, additionalDetails, ...rest } = props;

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">Review & Submit</h2>
        <p className="text-muted-foreground">
          Review your product details before submitting
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <ImageDisplaySection productImages={imagesAndSizes.productImages} />
          <ProductDetailsSection
            {...rest}
            additionalDetails={additionalDetails}
            availableSizes={imagesAndSizes.sizes}
          />
        </div>

        <Separator />

        <ValidationSummery
          images={imagesAndSizes.productImages}
          tags={additionalDetails.tags}
        />

        <div className="bg-primary/5 border-primary/20 rounded-lg border p-4">
          <h3 className="text-primary mb-2 font-medium">Ready to Submit</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Your product is ready to be submitted. Click the Submit button below
            to add this product to your inventory.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit;
