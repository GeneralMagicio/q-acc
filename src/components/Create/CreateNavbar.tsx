import React from "react";
import { Button, ButtonColor, ButtonStyle } from "@/components/Button";

interface CreateNavbarProps {
  title: string;
  onBack?: (event: any) => void;
  nextLabel?: "privado" | "project" | "team";
  backLabel?: string;
  disabled?: boolean;
}
const CreateNavbar = ({
  title,
  onBack,
  nextLabel,
  disabled,
}: CreateNavbarProps) => {
  const testLabels = {
    privado: "Next: Verify your account",
    profile: "Next: Create your project",
    project: "Next: Add your team",
    team: "",
  };

  return (
    <div>
      <div className="flex justify-between bg-white p-4 rounded-2xl px-10 mt-5">
        <div className="flex items-center gap-2 ">
          {onBack && (
            <Button
              className="   text-sm text-black"
              color={ButtonColor.Base}
              onClick={onBack}
            >
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          )}
          <span className="font-bold text-lg">{title}</span>
        </div>
        <div className="flex text-xs md:text-lg md:flex-row flex-col items-center gap-4">
          {nextLabel && (
            <span className="font-bold ">{testLabels[nextLabel]}</span>
          )}
          <Button
            className="p-4 shadow-2xl rounded-full text-xs md:text-md min-w-[150px] justify-center"
            color={ButtonColor.Pink}
            type="submit"
            disabled={disabled ? true : false}
          >
            {nextLabel ? "Save & Continue" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNavbar;
