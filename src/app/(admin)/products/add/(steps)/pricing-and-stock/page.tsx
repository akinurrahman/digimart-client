"use client";
import React from "react";
import FormLayoutWrapper from "../../layout-wrapper";
import { usePricingAndStockForm } from "./hooks/use-pricing-and-size";
import PricingAndStockForm from "./components/pricing-and-stock";

const PricingAndStock = () => {
  const props = usePricingAndStockForm();

  return (
    <FormLayoutWrapper
      onNext={props.handleNext}
      onPrevious={props.handlePrevious}
    >
      <PricingAndStockForm {...props} />
    </FormLayoutWrapper>
  );
};

export default PricingAndStock;
