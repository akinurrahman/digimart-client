import { InputFieldProps } from "../../types";
import { PasswordInput } from "./password-input";
import { NumberInput } from "./number-input";
import { DefaultInput } from "./default-input";
import { ItemListInput } from "./item-list-input";
import { ControllerRenderProps } from "react-hook-form";

export const renderInputByType = (
  props: InputFieldProps,
  field: ControllerRenderProps
) => {
  switch (props.type) {
    case "number":
      return <NumberInput props={props} field={field} />;
    case "password":
      return <PasswordInput props={props} field={field} />;
    case "multi-item":
      return <ItemListInput props={props} />;
    default:
      return <DefaultInput props={props} field={field} />;
  }
};
