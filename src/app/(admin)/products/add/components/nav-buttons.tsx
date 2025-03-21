"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

interface NavInterface {
  onNext?: () => void;
  onPrevious?: () => void;
  disableNext?: boolean;
  disablePrevious?: boolean;
  nextButtonText?: string;
}

const NavButtons = (props: NavInterface) => {
  return (
    <div className="fixed bottom-0 flex w-full max-w-4xl justify-between border-t bg-white px-4 py-4">
      <Button
        onClick={props.onPrevious}
        disabled={props.disablePrevious}
        variant="outline"
      >
        <ArrowLeft />
        Previous
      </Button>
      <Button onClick={props.onNext} disabled={props.disableNext}>
        {props?.nextButtonText || "Save & Next"} <ArrowRight />
      </Button>
    </div>
  );
};

export default NavButtons;
