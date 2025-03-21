"use client";

import FormLayoutWrapper from "../../layout-wrapper";
import ImagesAndSizesForm from "./components/images-and-sizes-form";
import { useImagesAndSizes } from "./hooks/use-images-and-sizes";

const ImagesAndSizes = () => {
  const { handleNext, handlePrev, ...formProps } = useImagesAndSizes();

  return (
    <FormLayoutWrapper onNext={handleNext} onPrevious={handlePrev}>
      <ImagesAndSizesForm {...formProps} />
    </FormLayoutWrapper>
  );
};

export default ImagesAndSizes;
