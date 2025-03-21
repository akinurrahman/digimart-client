import { Input } from "@/components/ui/input";
import { InputFieldProps } from "../../types";
import { ControllerRenderProps } from "react-hook-form";

interface TextInputProps {
  props: InputFieldProps;
  field: ControllerRenderProps;
}

export function DefaultInput({ props, field }: TextInputProps) {
  return (
    <Input
      type={props.type || "text"}
      placeholder={props.placeholder}
      {...field}
    />
  );
}
