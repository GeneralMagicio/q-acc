import { IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";

const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: "400" });

export const Banner = () => {
  return (
    <div className="relative bg-particle-pattern py-32 flex flex-col justify-center items-center">
      <Image
        className="p-16 object-contain"
        src="/images/home/banner-vector.svg"
        alt="Banner Vector"
        fill
      />
      <h1 className="uppercase text-white text-center text-nowrap relative font-tusker-grotesk">
        <div className="text-9xl tracking-[-4px]">the future of</div>
        <div className="text-9xl font-black text-peach tracking-[-2px]">
          tokenization
        </div>
      </h1>
      <div className={`text-white text-4xl mt-4 ${plex.className}`}>
        q/acc = QF*ABC
      </div>
    </div>
  );
};
