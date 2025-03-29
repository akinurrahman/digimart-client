"use client";

import { DataTable } from "@/components/table/data-table";
import React from "react";
import { productColumns } from "./product-columns";
import { AutoBreadcrumb } from "@/components/layout/auto-breadcrump";
import { useFetchProducts } from "@/hooks/product/use-product";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const Products = () => {
  const { data: products } = useFetchProducts();

  const handleDataUpdate = () => {};

  return (
    <div>
      <AutoBreadcrumb />
      <div className="my-5 flex justify-end">
        <Link href="/products/add/basic-info">
          <Button>
            List Product
            <ShoppingBag />
          </Button>
        </Link>
      </div>
      <DataTable
        data={products?.data || []}
        columns={productColumns}
        onDataUpdate={handleDataUpdate}
      />
    </div>
  );
};

export default Products;
