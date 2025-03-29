"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { Check, FileText, MoreHorizontal, Pencil, X } from "lucide-react";
import { format } from "date-fns";
import { CustomColumnMeta } from "@/types/table-interface";
import { Product } from "@/types/product-interface";

type CustomColumnDef<TData> = ColumnDef<TData> & {
  accessorKey?: string;
  meta?: CustomColumnMeta;
};

export const productColumns: CustomColumnDef<Product>[] = [
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    meta: {
      editable : false,
      fieldType : "date"
    },
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), "dd-MM-yyyy HH:mm"),
  },
  {
    accessorKey: "product_name",
    header: "Product Name",
    meta: {
      fieldType: "input",
      placeholder: "Enter product name",
    },
  },

  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.category.name,
    meta: {
      fieldType: "select",
      options: [
        { label: "Category 1", value: "category1" },
        { label: "Category 2", value: "cate2" },
      ],
    },
  },

  {
    accessorKey: "isBestSeller",
    header: "Best Seller",
    meta: {
      fieldType: "checkbox",
    },
    cell: ({ row }) => {
      return row.getValue("isBestSeller") ? "Yes" : "No";
    },
  },
  {
    accessorKey: "originalPrice",
    header: "Original Price",
    cell: ({ row }) => `₹${row.original.originalPrice}`,
    meta: {
      fieldType: "number",
      min: 0,
      step: 0.01,
    },
  },
  {
    accessorKey: "discountPercentage",
    header: "Discount %",
    cell: ({ row }) => `${row.original.discountPercentage}%`,
    meta: {
      fieldType: "number",
      min: 0,
      max: 100,
      step: 1,
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    meta: {
      fieldType: "number",
      min: 0,
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    meta: {
      fieldType: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Draft", value: "draft" },
      ],
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const meta = table.options.meta as any;
      const isEditing = meta?.editingRow === row.id;

      if (isEditing) {
        return (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full p-0 text-green-600 hover:bg-green-50 hover:text-green-700"
              onClick={() => meta?.saveEditing(row.original)}
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Save changes</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => meta?.cancelEditing()}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel changes</span>
            </Button>
          </div>
        );
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-background data-[state=open]:bg-background h-8 w-8 cursor-pointer rounded-full p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[160px] overflow-hidden rounded-xl border-none p-0 shadow-lg"
          >
            <DropdownMenuItem
              className="focus:bg-primary focus:text-primary-foreground cursor-pointer px-3 py-2.5"
              onClick={() => meta?.startEditing(row.id, row.original)}
            >
              <Pencil className="text-muted-foreground mr-2.5 h-3.5 w-3.5" />
              <span>Edit</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="focus:bg-primary focus:text-primary-foreground cursor-pointer px-3 py-2.5">
              <FileText className="text-muted-foreground mr-2.5 h-3.5 w-3.5" />
              <span>View details</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
