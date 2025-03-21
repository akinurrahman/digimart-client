import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "../ui/label";
import { FormInputProps } from "./types";
import { renderFieldByType } from "./render-field-by-types";

export function FormInput(props: FormInputProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field }) => {
        return (
          <FormItem>
            {props.label && (
              <Label className="text-sm font-semibold text-gray-800">
                {props.label}{" "}
                {props.required && <span className="text-destructive">*</span>}
              </Label>
            )}
            <FormControl>{renderFieldByType(props, field)}</FormControl>
            {props.description && (
              <FormDescription>{props.description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
