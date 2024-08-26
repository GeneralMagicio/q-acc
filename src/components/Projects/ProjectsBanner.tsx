import Image from "next/image";
import React from "react";

export const ProjectsBanner = () => {
  return (
    <div className="relative bg-particle-pattern py-32 flex flex-col justify-center items-center">
      <Image
        className="p-16 object-contain"
        src="/images/home/banner-vector.svg"
        alt="Banner Vector"
        fill
      />
      <h1 className="uppercase text-white text-center text-nowrap relative font-tusker-grotesk">
        <div className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl xl:tracking-[-4px]">
          Welcome to season one
        </div>
      </h1>
    </div>
  );
};
