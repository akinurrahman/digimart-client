import { Input } from "@/components/ui/input";

interface TextInputProps {
  props: any;
  field: any;
}

export function TextInput({ props, field }: TextInputProps) {
  return (
    <Input
      type={props.type || "text"}
      placeholder={props.placeholder}
      {...field}
    />
  );
}
