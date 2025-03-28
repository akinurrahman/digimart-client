"use client";
import { createContext, useContext, ReactNode } from "react";
import { useReviewSubmit } from "./hooks/use-review";
import { ReviewSubmitContextType } from "./types";

const ReviewSubmitContext = createContext<ReviewSubmitContextType | undefined>(
  undefined
);

export const ReviewSubmitProvider = ({ children }: { children: ReactNode }) => {
  const reviewSubmit = useReviewSubmit();

  return (
    <ReviewSubmitContext.Provider value={reviewSubmit}>
      {children}
    </ReviewSubmitContext.Provider>
  );
};

export const useReviewSubmitContext = () => {
  const context = useContext(ReviewSubmitContext);
  if (context === undefined) {
    throw new Error(
      "useReviewSubmitContext must be used within a ReviewSubmitProvider"
    );
  }
  return context;
};
