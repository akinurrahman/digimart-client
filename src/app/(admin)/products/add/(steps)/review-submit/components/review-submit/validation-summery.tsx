import { AlertCircle, Check } from "lucide-react";
import React from "react";
import { validateProduct } from "../../utils/validate-product";
import { useReviewSubmitContext } from "../../context";

const ValidationSummary = () => {
  const { imagesAndSizes, additionalDetails } = useReviewSubmitContext();

  if (!imagesAndSizes || !additionalDetails) {
    return null;
  }

  const validations = validateProduct(
    imagesAndSizes.productImages,
    additionalDetails.tags
  );

  return (
    <div className="bg-muted rounded-lg p-4">
      <h3 className="mb-3 font-medium">Validation Summary</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-green-600">
          <Check className="h-4 w-4" />
          <span>All required fields are filled</span>
        </div>
        {validations.map((validation, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm text-amber-600"
          >
            <AlertCircle className="h-4 w-4" />
            <span>{validation.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValidationSummary;
