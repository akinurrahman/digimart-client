"use client";
import FormLayoutWrapper from "../../layout-wrapper";
import BasicInfoForm from "./components/basic-info";
import { useBasicInfoForm } from "./hooks/use-basic-form";

const BasicInfoPage = () => {
  const basicInfoForm = useBasicInfoForm();
  return (
    <FormLayoutWrapper onNext={basicInfoForm.handleNext} disablePrevious>
      <BasicInfoForm {...basicInfoForm} />
    </FormLayoutWrapper>
  );
};

export default BasicInfoPage;
