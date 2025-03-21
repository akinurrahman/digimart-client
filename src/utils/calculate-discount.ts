interface PriceDetailsInput {
  originalPrice: number;
  discountPercentage?: number;
  sellingPrice?: number;
}

interface PriceDetailsOutput {
  discountAmount: number;
  sellingPrice?: number;
  discountPercentage?: number;
}

export const calculatePriceDetails = ({
  originalPrice,
  discountPercentage,
  sellingPrice,
}: PriceDetailsInput): PriceDetailsOutput => {
  if (originalPrice !== undefined && discountPercentage !== undefined) {
    // Case 1: Original Price + Discount Percentage → Calculate Discount Amount & Selling Price
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const calculatedSellingPrice = originalPrice - discountAmount;
    return { discountAmount, sellingPrice: calculatedSellingPrice };
  }

  if (originalPrice !== undefined && sellingPrice !== undefined) {
    // Case 2: Original Price + Selling Price → Calculate Discount Percentage & Discount Amount
    const discountAmount = originalPrice - sellingPrice;
    const calculatedDiscountPercentage = (discountAmount / originalPrice) * 100;
    return { discountAmount, discountPercentage: calculatedDiscountPercentage };
  }

  throw new Error(
    "Invalid input: Provide either (originalPrice & discountPercentage) OR (originalPrice & sellingPrice)"
  );
};

// calculatePriceDetails({ originalPrice: 1000, discountPercentage: 20 });
// Output: { discountAmount: 200, sellingPrice: 800 }

// calculatePriceDetails({ originalPrice: 1000, sellingPrice: 800 });
// Output: { discountAmount: 200, discountPercentage: 20 }
