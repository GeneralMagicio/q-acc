import { IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";
import { FC } from "react";

const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: "400" });

interface BannerProps {
  title1: string;
  title2: string;
  subTitle: string;
}

export const Banner: FC<BannerProps> = ({ title1, title2, subTitle }) => {
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
          {title1}
        </div>
        <div className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl xl:tracking-[-2px] font-black text-peach ">
          {title2}
        </div>
      </h1>
      <div
        className={`text-white text-lg sm:text-xl lg:text-3xl xl:text-4xl mt-4 ${plex.className}`}
      >
        {subTitle}
      </div>
    </div>
  );
};
