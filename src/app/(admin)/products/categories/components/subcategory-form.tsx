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
import type { Category, Subcategory } from "./category-management";

type SubcategoryFormProps = {
  onSubmit: (subcategory: Omit<Subcategory, "id">) => void;
  categories: Category[];
  initialValues?: { name: string; parentId: string };
};

export function SubcategoryForm({
  onSubmit,
  categories,
  initialValues = { name: "", parentId: "" },
}: SubcategoryFormProps) {
  const [name, setName] = useState(initialValues.name);
  const [parentId, setParentId] = useState(initialValues.parentId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    if (!parentId) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit({ name, parentId });
      setName("");
      setParentId("");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="parent-category">Parent Category</Label>
        <Select value={parentId} onValueChange={setParentId} required>
          <SelectTrigger id="parent-category" className="w-full">
            <SelectValue placeholder="Select a parent category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
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

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Subcategory"}
      </Button>
    </form>
  );
}
