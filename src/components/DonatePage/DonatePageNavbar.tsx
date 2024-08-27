import React from "react";
import Link from "next/link";
import { ConnectButton } from "../ConnectButton/ConnectButton";
import { IconGoBack } from "../Icons/IconGoBack";

const DonateNavbar = () => {
  const slug = "diamante-luz-center-for-regenerative-living";
  return (
    <div className="bg-white flex items-center justify-between px-10 p-6 gap-4 z-50   absolute w-full top-0  shadow-lg">
      <div className="flex gap-4">
        <Link href={`/project/${slug}`}>
          <div className="p-4 rounded-full flex items-center border shadow-md">
            <IconGoBack />
          </div>
        </Link>

        <div className="flex flex-col">
          <span className="font-redHatText text-sm font-medium leading-5 text-[#82899A]">
            Donating to
          </span>
          <p className="font-redHatText text-base font-medium text-[#1D1E1F]">
            Diamante Luz Center for Regenerative Living
          </p>
        </div>
      </div>
      <ConnectButton />
    </div>
  );
};

export default DonateNavbar;
