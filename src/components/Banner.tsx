import Image from "next/image";
import React from "react";
import { Hanken_Grotesk } from "next/font/google";

const grotesk = Hanken_Grotesk({ subsets: ["latin"] });

export const Banner = () => {
  return (
    <div
      className={`relative bg-particle-pattern py-32 flex flex-col justify-center items-center ${grotesk.className}`}
    >
      <Image
        className="p-16 object-contain"
        src="/images/home/banner-vector.svg"
        alt="Banner Vector"
        fill
      />
      <h1 className="uppercase text-white text-center text-nowrap relative ">
        <div className="text-9xl tracking-[-9px]">the future of</div>
        <div className="text-9xl font-black text-peach tracking-[-2px]">
          tokenization
        </div>
      </h1>
    </div>
  );
};
