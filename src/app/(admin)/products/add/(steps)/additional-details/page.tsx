"use client";

import FormLayoutWrapper from "../../layout-wrapper";
import { useAdditionalDetails } from "./hooks/use-additional-details";
import AdditionalDetailsForm from "./components/additional-details-form";

export default function AdditionalDetailsStep() {
  const { onNext, onPrevious, ...formData } = useAdditionalDetails();
  return (
    <FormLayoutWrapper onNext={onNext} onPrevious={onPrevious}>
      <AdditionalDetailsForm {...formData} />
    </FormLayoutWrapper>
  );
}
