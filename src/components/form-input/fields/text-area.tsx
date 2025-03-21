import React from "react";
import { Textarea } from "../../ui/textarea";
import { TextareaFieldProps } from "../types";
import { ControllerRenderProps } from "react-hook-form";

interface TextAreaProps {
  props: TextareaFieldProps;
  field: ControllerRenderProps;
}

const TextArea = ({ props, field }: TextAreaProps) => {
  return (
    <Textarea placeholder={props.placeholder} rows={props.rows} {...field} />
  );
};

export default TextArea;
