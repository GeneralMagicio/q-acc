import React from "react";
import { Button, ButtonColor, ButtonStyle } from "@/components/Button";

interface TempNavProps {
  onNext?: () => void;
  onBack: () => void;
  nextLabel: "profile" | "project" | "team";
  backLabel?: string;
}
const TempNav = ({ onNext, onBack, nextLabel }: TempNavProps) => {
  const buttonLabels = [
    { profile: "Save & Continue", project: "Save & Continue", team: "Save" },
  ];
  const testLabels = {
    profile: "Next: Create your project",
    project: "Next: Add your team",
    team: "",
  };

  return (
    <div>
      <div className="flex justify-between bg-whitep p-4 bg-white rounded-2xl px-10 mt-5">
        <Button
          className="   text-sm text-black"
          color={ButtonColor.Base}
          onClick={onBack}
        >
          <div className="flex items-center gap-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M25.3332 15.9993H6.6665M6.6665 15.9993L15.9998 25.3327M6.6665 15.9993L15.9998 6.66602"
                stroke="#030823"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Go Back
          </div>
        </Button>
        <div className="flex text-xs md:text-lg md:flex-row flex-col items-center gap-2">
          <span className="font-bold ">{testLabels[nextLabel]}</span>
          <Button
            className="p-4 shadow-2xl rounded-full text-xs md:text-md min-w-[150px] justify-center"
            color={ButtonColor.Pink}
            onClick={onNext}
            type="submit"
          >
            {nextLabel === "team" ? "Save" : "Save & Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TempNav;
