"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectFieldProps } from "../types";
import { FormControl } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";

interface SelectProps {
  props: SelectFieldProps;
  field: ControllerRenderProps;
}

const SelectField = ({ props, field }: SelectProps) => {
  return (
    <Select
      disabled={props.disabled}
      onValueChange={(value) => value && field.onChange(value)}
      value={field.value}
    >
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {props.options.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectField;
