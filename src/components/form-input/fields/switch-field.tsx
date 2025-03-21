"use client";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { useFormContext } from "react-hook-form";
import { SwitchFieldProps } from "../types";

interface SwitchProps {
  props: SwitchFieldProps;
}

const SwitchField = ({ props }: SwitchProps) => {
  const { getValues, setValue } = useFormContext();
  const isChecked = getValues(props.name) || false;

  const onToggle = () => {
    setValue(props.name, !isChecked);
  };
  return (
    <div>
      <Switch id={props.name} checked={isChecked} onCheckedChange={onToggle} />
    </div>
  );
};

export default SwitchField;
