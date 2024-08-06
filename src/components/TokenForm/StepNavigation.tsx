import React from "react";
import { Button, ButtonColor, ButtonStyle } from "../Button";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onBack: () => void;
  nextLabel?: string;
  backLabel?: string;
  isFormValid?: boolean;
  isNextLoading?: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  nextLabel,
  backLabel,
  isFormValid,
  isNextLoading = false,
}) => {
  return (
    <div className="py-8 px-10 flex justify-between mt-4 border-t-2">
      <Button
        type="button"
        onClick={onBack}
        className={`btn btn-secondary ${currentStep === 1 ? "invisible" : ""}`}
        disabled={currentStep === 1}
        styleType={ButtonStyle.Text}
        color={ButtonColor.Giv}
      >
        {backLabel || "Back"}
      </Button>
      <Button
        type="submit"
        onClick={() => onNext?.()}
        className={`btn btn-primary`}
        disabled={!isFormValid}
        loading={isNextLoading}
      >
        {nextLabel || "Next"}
      </Button>
    </div>
  );
};

export default StepNavigation;
