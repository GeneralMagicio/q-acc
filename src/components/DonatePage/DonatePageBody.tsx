"use client";
import React from "react";
import { Button, ButtonColor } from "../Button";
import { IconRefresh } from "../Icons/IconRefresh";
import Image from "next/image";
import { useAccount } from "wagmi";
import { IconDiscord } from "../Icons/IconDiscord";

const DonatePageBody = () => {
  const { isConnected } = useAccount();
  const handleDonate = () => {
    console.log("Donated");
  };
  const handleAnoynmous = () => {
    console.log("");
  };
  return (
    <div className="container w-full flex  flex-col lg:flex-row gap-10 py-10">
      <div className="p-6 lg:w-1/2 flex flex-col gap-8 bg-white rounded-2xl shadow-[0px 3px 20px 0px rgba(212, 218, 238, 0.40)] font-redHatText">
        <h1 className=" font-medium text-[#4F576A]">
          How much do you want to donate?
        </h1>
        {/* Input Box */}

        <div className="flex flex-col gap-2 font-redHatText">
          <div className="border rounded-lg flex">
            <div className="w-40 flex gap-2 p-4 border">
              <Image
                src={"/images/polygon.png"}
                width={24}
                height={24}
                alt="polygon"
              />
              <h1 className=" font-medium">MATIC</h1>
            </div>
            <input
              type="number"
              className="w-full boder rounded-lg px-4"
            ></input>
          </div>

          {/* Avaliable token */}
          <div className="flex gap-1">
            <span className="text-sm">Available: 85000 MATIC</span>

            <IconRefresh />
          </div>
        </div>

        {/*  */}
        <div className="flex p-4 rounded-lg border-[1px] border-[#8668FC] bg-[#F6F3FF] gap-2 font-redHatText text-[#8668FC] flex-col">
          <h1 className="font-medium">Keeping it fair!</h1>
          <p className="">
            To keep it fair you can only{" "}
            <span className="font-medium"> hold 2% of total supply!</span> the
            more you donate the more total supply goes up.
          </p>
          <p>
            {" "}
            Current total supply <span className="font-medium">100k XYZ</span>
          </p>
        </div>

        {/* Token Lock Schedule */}

        <div className="flex flex-col p-4 border-[1px] border-[#D7DDEA] rounded-lg  gap-2">
          <h1 className="font-medium  text-[#1D1E1F]">Token Lock Schedule</h1>
          <hr />
          <h2 className="text-[#4F576A]">
            One year lock followed by{" "}
            <span className="font-medium">one year unlock stream</span>.
          </h2>
        </div>

        {/* Total Donation */}
        <div className="flex flex-col gap-2">
          <div className="flex p-2 bg-[#EBECF2] rounded-lg justify-between">
            <h2 className="font-medium text-[#1D1E1F]">Your total donation</h2>
          </div>

          <div className="flex justify-between p-[4px_8px]">
            <h2 className="text-[#4F576A]">
              Donating to{" "}
              <span className="font-medium">The Community of Makers</span>
            </h2>
            <span>---</span>
          </div>
        </div>

        {/* Donate Button */}

        <Button
          onClick={handleDonate}
          disabled={!isConnected}
          color={ButtonColor.Giv}
          className={`text-white justify-center ${
            isConnected ? "opacity-100" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Donate
        </Button>
        {/* Make it Anoynmous */}
        <div className="flex gap-2">
          <div>
            <input type="checkbox" onChange={handleAnoynmous} />
          </div>
          <div className="flex flex-col text-[#1D1E1F]">
            <h2 className="text-base">Make it anonymous</h2>
            <p className="text-xs">
              By checking this, we won&apos;t consider your profile information
              as a donor for this donation and won&apos;t show it on public
              pages.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-8 h-fit lg:w-1/2 bg-white rounded-2xl shadow-[0px 3px 20px 0px rgba(212, 218, 238, 0.40)]  font-redHatText">
        {/* Project Banner */}
        <div
          className="w-full h-[250px] bg-cover bg-center rounded-3xl relative"
          style={{
            backgroundImage: "url('/images/project-card/card-image.jpeg')",
          }}
        >
          <div className=" flex flex-col absolute  bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%] gap-2">
            <div className="border rounded-md bg-white p-1 block w-fit">
              <Image
                height={64}
                width={65}
                src={"/images/Vector.png"}
                alt="abc vector"
              />
            </div>
            <div className="flex flex-col text-white gap-2">
              <h1 className="text-2xl md:text-[41px]  font-bold leading-10">
                The amazing Pancake project
              </h1>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <IconDiscord />
              <span>ABC Price</span>
              <IconRefresh />
            </div>
            <div className="flex gap-8 font-redHatText">
              <h2 className="w-1/2">
                <span className="text-base font-medium text-[#4F576A] ">
                  ~ 2.020
                </span>{" "}
                in USD
              </h2>
              <h2 className="">
                <span>~ 2.020</span> in USD
              </h2>
            </div>
          </div>

          <div className="flex flex-col font-redHatText">
            <h2 className="text-sm text-[#82899A] bg-[#F7F7F9] rounded-md p-1 w-fit">
              Amount raised in this round
            </h2>
            <h1 className="text-4xl font-extrabold p-2">$ 1,200</h1>
            <p className="text-[#82899A]">
              Raised from <span className="font-medium text-[#1D1E1F]">25</span>{" "}
              contributors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePageBody;
