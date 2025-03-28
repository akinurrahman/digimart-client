"use client";

import type * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CustomColumnMeta } from "@/types/table-interface";

interface EditableCellProps {
  column: any;
  value: any;
  isEditing: boolean;
  onChange: (value: any) => void;
  renderDefault: () => React.ReactNode;
}

export function EditableCell({
  column,
  value,
  isEditing,
  onChange,
  renderDefault,
}: EditableCellProps) {
  const meta = column.columnDef.meta as CustomColumnMeta | undefined;

  // If not editing this cell or field is not editable, render normal cell
  if (!isEditing || meta?.editable === false) {
    return renderDefault();
  }

  // Render different input types based on field type
  if (!meta?.fieldType) {
    return renderDefault();
  }

  switch (meta.fieldType) {
    case "select":
      return (
        <Select value={String(value)} onValueChange={(val) => onChange(val)}>
          <SelectTrigger className="h-8 w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {meta.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "input":
      return (
        <Input
          className="h-8 w-full"
          value={value || ""}
          placeholder={meta.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "number":
      return (
        <Input
          className="h-8"
          type="number"
          value={value || 0}
          min={meta.min}
          max={meta.max}
          step={meta.step || 1}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    case "checkbox":
      return (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange(checked)}
          />
        </div>
      );
    case "textarea":
      return (
        <Textarea
          value={value || ""}
          rows={meta.rows || 3}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "date":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-8 w-full justify-start text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? (
                format(new Date(value), "dd-MM-yyyy HH:mm")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value ? new Date(value) : undefined}
              onSelect={(date) => {
                if (date) {
                  // Fix timezone issue by preserving the selected date exactly
                  const year = date.getFullYear();
                  const month = date.getMonth();
                  const day = date.getDate();

                  // Create a date string in ISO format but with time set to noon to avoid timezone issues
                  const isoDate = new Date(
                    year,
                    month,
                    day,
                    12,
                    0,
                    0
                  ).toISOString();
                  onChange(isoDate);
                } else {
                  onChange(null);
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );
    default:
      return renderDefault();
  }
}
