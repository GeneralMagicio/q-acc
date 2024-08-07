import Image from "next/image";
import React from "react";
import { Schibsted_Grotesk } from "next/font/google";

const grotesk = Schibsted_Grotesk({ subsets: ["latin"] });

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
      <h1 className="uppercase text-white text-center text-nowrap">
        <div className="text-9xl">the future of</div>
        <div className="text-9xl font-extrabold text-peach">tokenization</div>
      </h1>
    </div>
  );
};
