import React from "react";

const InfoSection = () => {
  return (
    <div className="relative flex flex-col items-center gap-20  self-stretch bg-[#FFF]">
      <div className="container flex flex-col gap-6  items-start p-[80px_40px] ">
        <h1 className=" relative font-bold text-[41px] ">
          About q/acc
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
          <p>
            Quadratic Acceleration (q/acc) combines the strengths of Quadratic
            Funding (QF) with those of Augmented Bonding Curves (ABC) in order
            to create a new mechanism for launching tokens with built-in
            liquidity, a passive revenue stream and a clear path to community
            growth.
          </p>

          <p>
            The Quadratic Accelerator is a collaborative entity under Giveth
            building the q/acc protocol based on the research of Commons Stack.
          </p>
        </div>
      </div>
      <div className=" absolute bottom-0 left-0 bg-[#FBBA80] h-[26px] w-full"></div>
    </div>
  );
};

export default InfoSection;
