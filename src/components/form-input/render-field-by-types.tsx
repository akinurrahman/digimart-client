import { renderFileByVariant } from "./fields/file-upload";
import SelectField from "./fields/select-field";
import SliderField from "./fields/slider-field";
import TextArea from "./fields/text-area";
import { FormInputProps } from "./types";
import { renderInputByType } from "./fields/input";
import { CheckboxField } from "./fields/check-box";
import SwitchField from "./fields/switch-field";
import RadioGroupComponent from "./fields/radio-group";

export function renderFieldByType(props: FormInputProps, field: any) {
  switch (props.fieldType) {
    case "input":
      return renderInputByType(props, field);
    case "textarea":
      return <TextArea props={props} field={field} />;
    case "select":
      return <SelectField props={props} field={field} />;
    case "slider":
      return <SliderField props={props} />;
    case "file":
      return renderFileByVariant(props);
    case "checkbox":
      return <CheckboxField />;
    case "switch":
      return <SwitchField props={props} />;
    case "radio-group":
      return <RadioGroupComponent props={props} field={field} />;
    default:
      return null;
  }
}
