import React from "react";

interface PricingSummeryProps {
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  sellingPrice: number | undefined;
}

const PricingSummery = (props: PricingSummeryProps) => {
  const { originalPrice, discountPercentage, discountAmount, sellingPrice } =
    props;
  return (
    <div className="bg-muted rounded-lg p-4">
      <h3 className="mb-2 font-medium">Pricing Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Original Price:</span>
          <span className="font-medium">₹{originalPrice}</span>
        </div>
        {/* Show discount details only if there is a discount */}
        {discountPercentage > 0 && (
          <>
            <div className="flex justify-between">
              <span>Discount Percentage:</span>
              <span className="text-destructive font-medium">
                {discountPercentage}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Discount Amount:</span>
              <span className="text-destructive font-medium">
                -₹{discountAmount}
              </span>
            </div>
          </>
        )}
        <div className="flex justify-between">
          <span>Discounted Price:</span>
          <span className="font-medium">₹{sellingPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default PricingSummery;
