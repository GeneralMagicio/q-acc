import Image from "next/image";
import React from "react";
import { Hanken_Grotesk } from "next/font/google";

const grotesk = Hanken_Grotesk({ subsets: ["latin"] });

export const Banner = () => {
  return (
    <div
      className={`bg-particle-pattern py-16 flex flex-col justify-center items-center ${grotesk.className}`}
    >
      <Image
        src="/images/home/banner-vector.svg"
        alt="Banner Vector"
        height={447}
        width={895}
      />
      <h1 className="uppercase text-white text-center text-nowrap ">
        <div className="text-9xl tracking-[-9px]">the future of</div>
        <div className="text-9xl font-black text-peach tracking-[-2px]">
          tokenization
        </div>
      </h1>
    </div>
  );
};
