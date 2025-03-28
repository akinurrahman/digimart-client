import { Badge } from "@/components/ui/badge";
import { getFromLocalStorage } from "@/utils";
import React from "react";
import { useReviewSubmitContext } from "../../context";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Category {
  label: string;
  value: string;
}

const ProductDetailsSection = () => {
  const {
    basicInfo,
    pricingAndStock,
    sellingPrice,
    additionalDetails,
    imagesAndSizes,
  } = useReviewSubmitContext();

  if (!basicInfo || !pricingAndStock || !additionalDetails || !imagesAndSizes) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please complete all previous steps before reviewing your product
          details.
        </AlertDescription>
      </Alert>
    );
  }

  const categories: Category[] = getFromLocalStorage("categories");
  const subCategories: Category[] = getFromLocalStorage("subCategories");

  const category = categories.find(
    (cat) => cat.value === basicInfo.category
  )?.label;
  const subcategory = subCategories.find(
    (cat) => cat.value === basicInfo.sub_category
  )?.label;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold">{basicInfo?.product_name}</h3>
        <div className="mt-1 flex gap-2">
          <Badge variant="outline">{category}</Badge>
          <Badge variant="outline">{subcategory}</Badge>
          {additionalDetails?.isBestSeller && (
            <Badge
              variant="secondary"
              className="bg-amber-100 text-amber-800 hover:bg-amber-100"
            >
              Best Seller
            </Badge>
          )}
        </div>
      </div>

      <p className="text-muted-foreground">{basicInfo?.product_description}</p>

      <div className="flex items-center gap-2">
        <span className="text-xl font-bold">₹{sellingPrice}</span>
        {pricingAndStock.originalPrice && (
          <span className="text-muted-foreground line-through">
            ₹{pricingAndStock.originalPrice}
          </span>
        )}
        {pricingAndStock.originalPrice && (
          <Badge variant="destructive" className="ml-auto">
            {pricingAndStock?.discountPercentage}% OFF
          </Badge>
        )}
      </div>

      <div>
        <span className="text-muted-foreground text-sm">Available Sizes:</span>
        <div className="mt-1 flex flex-wrap gap-2">
          {imagesAndSizes.sizes?.map((size) => (
            <Badge key={size} variant="outline">
              {size}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <span className="text-muted-foreground text-sm">Tags:</span>
        <div className="mt-1 flex flex-wrap gap-2">
          {additionalDetails.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">Status:</span>
        <Badge
          variant={
            additionalDetails.status === "active" ? "default" : "outline"
          }
          className={
            additionalDetails.status === "draft"
              ? "bg-muted text-muted-foreground"
              : ""
          }
        >
          {additionalDetails.status.charAt(0).toUpperCase() +
            additionalDetails.status.slice(1)}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">Stock:</span>
        <span className="font-medium">{pricingAndStock.stock} units</span>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
