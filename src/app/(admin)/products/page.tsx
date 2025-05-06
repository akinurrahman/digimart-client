"use client";

import { DataTable } from "@/components/table/data-table";
import React from "react";
import { productColumns } from "./product-columns";
import { AutoBreadcrumb } from "@/components/layout/auto-breadcrump";
import { useFetchProducts } from "@/hooks/product/use-product";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import SearchInput from "@/components/shared/search-input";
import FilterComponent from "@/components/shared/filter-menu";

const Products = () => {
  const { data: products } = useFetchProducts();

  const handleDataUpdate = () => {};

  return (
    <div>
      <AutoBreadcrumb />
      <div className="my-5 flex flex-col-reverse items-end justify-between gap-4 sm:flex-row">
        <div className="flex flex-1 items-center gap-2">
          <SearchInput />
          <FilterComponent filters={["Active", "Inactive", "Pending"]} />
        </div>

        <Link href="/products/add/basic-info">
          <Button>
            List Product
            <ShoppingBag className="ml-2 h-4 w-4" />
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
