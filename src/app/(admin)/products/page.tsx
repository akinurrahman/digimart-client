"use client";

import { DataTable } from "@/components/table/data-table";
import React from "react";
import { productColumns } from "./product-columns";
import { AutoBreadcrumb } from "@/components/layout/auto-breadcrump";

const data = [
  {
    createdAt: new Date().toISOString(),
    product_name: "Test Product",
    category: "Category",
    sub_category: "sub category",
    isBestSeller: true,
    originalPrice: 100,
    discountPercentage: 10,
    stock: 55,
    status: "draft",
    description:
      "This is a sample product description that demonstrates the textarea field type.",
    releaseDate: new Date().toISOString(),
  },
];

const Products = () => {
  const [products, setProducts] = React.useState(data);

  const handleDataUpdate = (updatedProduct: any) => {
    // Find and update the product in the state
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.product_name === updatedProduct.product_name
          ? updatedProduct
          : product
      )
    );

    console.log("Updated product:", updatedProduct);
  };

  return (
    <div>
      <AutoBreadcrumb />
      <DataTable
        data={products}
        columns={productColumns}
        onDataUpdate={handleDataUpdate}
      />
    </div>
  );
};

export default Products;
