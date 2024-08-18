import React, { FC } from "react";

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
}

const InfoSection: FC<InfoSectionProps> = ({ title, children }) => {
  return (
    <div className="relative flex flex-col items-center gap-20  self-stretch bg-[#FFF]">
      <div className="container flex flex-col gap-6  items-start p-[80px_40px] ">
        <h1 className=" relative font-bold text-[41px] ">
          {title}
          <svg
            className=" absolute right-[-45%] top-[-30%]"
            xmlns="http://www.w3.org/2000/svg"
            width="31"
            height="32"
            viewBox="0 0 31 32"
            fill="none"
          >
            <path
              d="M31 31.8955C31 14.8025 17.0934 0.895508 0 0.895508V31.8955H31Z"
              fill="#FFCD7A"
            />
          </svg>
        </h1>
        <div className="text-[24px] leading-9 text-[#4F576A] font-redHatText flex flex-col gap-4">
          {children}
        </div>
      </div>
      <div className=" absolute bottom-0 left-0 bg-[#FBBA80] h-[26px] w-full"></div>
    </div>
  );
};

export default InfoSection;
