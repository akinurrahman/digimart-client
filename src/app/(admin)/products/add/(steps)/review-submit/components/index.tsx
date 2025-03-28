"use client";

import FormLayoutWrapper from "../../../layout-wrapper";
import { useReviewSubmitContext } from "../context";
import ReviewSubmitSection from "./review-submit";

const ReviewSubmitForm = () => {
  const { onSubmit, onPrev, isLoading } = useReviewSubmitContext();

  return (
    <FormLayoutWrapper
      onNext={onSubmit}
      onPrevious={onPrev}
      nextButtonText="Submit"
      isLoading={isLoading}
    >
      <ReviewSubmitSection />
    </FormLayoutWrapper>
  );
};

export default ReviewSubmitForm;
