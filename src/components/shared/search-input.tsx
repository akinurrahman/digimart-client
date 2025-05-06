"use client";
import React from "react";
import { Input } from "../ui/input";
import { useDebouncedQueryState } from "@/hooks/use-debounce-query";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  className?: string;
}

const SearchInput = ({ className }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useDebouncedQueryState("search", 400);

  return (
    <div
      className={cn("relative flex w-full max-w-md items-center", className)}
    >
      {/* Search Icon */}
      <Search className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />

      {/* Input Field */}
      <Input
        type="search"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full py-2 pr-4 pl-10"
      />
    </div>
  );
};

export default SearchInput;
