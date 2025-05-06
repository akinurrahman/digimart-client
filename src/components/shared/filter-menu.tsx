"use client";

import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";

interface FilterMenuProps {
  filters: string[];
  className?: string;
  title?: string;
}

const FilterMenu = ({
  filters,
  className,
  title = "Filter by Status",
}: FilterMenuProps) => {
  const [filterQuery, setFilterQuery] = useQueryState<string[]>("filter", {
    defaultValue: [],
    parse: (value) => (value ? JSON.parse(value) : []), // Parse string to array
    serialize: (value) => JSON.stringify(value), // Serialize array to string
  });
  const [open, setOpen] = useState(false);

  // Count active filters
  const activeFiltersCount = filterQuery?.length;

  // Clear all filters
  const clearFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setFilterQuery([]); // Clear the filter
  };

  // Update state when filters change
  const handleFilterChange = (status: string) => {
    const isCurrentlyChecked = filterQuery.includes(status);
    const newQuery = isCurrentlyChecked
      ? filterQuery.filter((item) => item !== status)
      : [...filterQuery, status];

    setFilterQuery(newQuery);
  };

  useEffect(() => {
    // Ensure the dropdown closes if the filters are empty
    if (activeFiltersCount === 0) setOpen(false);
  }, [activeFiltersCount]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "flex h-9 items-center gap-2 border-gray-200 hover:bg-gray-50",
            activeFiltersCount > 0 &&
              "border-primary/50 bg-primary/5 text-primary hover:bg-primary/10",
            className
          )}
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary ml-1 h-5 rounded-full border-none px-2 py-0 text-xs font-medium"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 p-0"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="border-b p-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">{title}</h4>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground h-7 px-2 text-xs font-medium"
                onClick={clearFilters}
              >
                Clear all
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-[300px] overflow-y-auto py-2">
          {filters.length === 0 ? (
            <p className="text-muted-foreground px-3 py-2 text-sm">
              No filters available
            </p>
          ) : (
            filters.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={filterQuery.includes(status)}
                onSelect={(e) => {
                  e.preventDefault();
                  handleFilterChange(status);
                }}
                className="cursor-pointer px-3 py-1.5"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="ml-5 text-sm">{status}</span>
                  {filterQuery.includes(status) && (
                    <Badge
                      variant="outline"
                      className="bg-primary/5 text-primary border-primary/20 ml-2 h-5 px-1.5 py-0 text-[10px]"
                    >
                      Active
                    </Badge>
                  )}
                </div>
              </DropdownMenuCheckboxItem>
            ))
          )}
        </div>

        {activeFiltersCount > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="bg-muted flex justify-end rounded-b-lg p-3">
              <Button
                size="sm"
                className="h-8 text-xs"
                onClick={() => setOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterMenu;
