import React from "react";
import { IconAbout } from "./Icons/IconAbout";

const About = () => {
  return (
    <div className="flex p-[60px] flex-col justify-center gap-20 bg-[#FFF]">
      <div className="flex  sm:flex-row flex-col flex-wrap justify-center gap-4">
        <div className="flex p-4 gap-2 items-center">
          <IconAbout />
          <span className="font-bold text-[#4F576A] text-xl leading-normal">
            Guaranteed Liquidity
          </span>
        </div>
        <div className="flex p-4 gap-2 items-center">
          <IconAbout />
          <span className="font-bold text-[#4F576A] text-xl leading-normal">
            Anti-rugpull
          </span>
        </div>
        <div className="flex p-4 gap-2 items-center">
          <IconAbout />
          <span className="font-bold text-[#4F576A] text-xl leading-normal">
            Sybil resistant
          </span>
        </div>
        <div className="flex p-4 gap-2 items-center">
          <IconAbout />
          <span className="font-bold text-[#4F576A] text-xl leading-normal">
            Programmatic Decentralization
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
