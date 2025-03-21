"use client";
import FormLayoutWrapper from "../../layout-wrapper";
import { useReviewSubmit } from "./hooks/use-review";
import ReviewSubmitSection from "./components/review-submit";

const ReviewSubmit = () => {
  const { onSubmit, onPrev, ...formData } = useReviewSubmit();
  return (
    <FormLayoutWrapper
      onNext={onSubmit}
      onPrevious={onPrev}
      nextButtonText="Submit"
    >
      <ReviewSubmitSection {...formData} />
    </FormLayoutWrapper>
  );
};

export default ReviewSubmit;
