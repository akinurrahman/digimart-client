"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchCategories } from "../../../../../hooks/category/use-fetch-categories";
import { useAddSubCategory } from "../hooks/useAddCategory";

export function SubcategoryForm() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { data: categories } = useFetchCategories();
  const { mutate: addSubCategory, isPending } = useAddSubCategory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    if (!categoryId) {
      return;
    }
    addSubCategory({ categoryId, name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="parent-category">Parent Category</Label>
        <Select value={categoryId} onValueChange={setCategoryId} required>
          <SelectTrigger id="parent-category" className="w-full">
            <SelectValue placeholder="Select a parent category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.data.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Subcategory Name</Label>
        <Input
          id="name"
          placeholder="Enter subcategory name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating..." : "Create Subcategory"}
      </Button>
    </form>
  );
}
