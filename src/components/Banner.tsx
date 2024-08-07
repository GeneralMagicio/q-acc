import Image from "next/image";
import React from "react";

export const Banner = () => {
  return (
    <div className="bg-particle-pattern py-16 flex flex-col justify-center items-center">
      <Image
        src="/images/home/banner-vector.svg"
        alt="Banner Vector"
        height={447}
        width={895}
      />
    </div>
  );
};
