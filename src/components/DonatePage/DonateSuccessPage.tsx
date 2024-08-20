import React from "react";
import { Button, ButtonColor } from "../Button";
import { IconXSocial } from "../Icons/IconXSocial";
import { IconTokenSchedule } from "../Icons/IconTokenSchedule";
import { IconFacebook } from "../Icons/IconFacebook";
import { IconLinkedin } from "../Icons/IconLinkedin";
import { IconViewTransaction } from "../Icons/IconViewTransaction";
const DonateSuccessPage = () => {
  return (
    <div className="bg-[#F7F7F9] w-full  py-10 absolute z-40 my-20">
      <div className="container w-full flex  flex-col gap-14 ">
        <div className="flex  flex-col w-full lg:flex-row ">
          {/* About Project */}
          <div className="w-full lg:w-1/2 shadow-xl  lg:rounded-l-xl h-[450px] p-8 gap-8 flex flex-col">
            <div
              className="w-full h-[288px] bg-cover bg-center rounded-3xl relative"
              style={{
                backgroundImage: "url('/images/project-card/card-image.jpeg')",
              }}
            ></div>

            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-[#121B4B] text-lg  font-bold">
                  The Giveth Community of Makers
                </h1>
                <h3 className="font-redHatText text-[#E1458D]">Lauren Luz</h3>
              </div>
              <div className="text-[#4F576A] font-redHatText">
                <p>
                  The Commons Simulator is a gamified simulation tool powered by
                  a cadCAD backend that was developed by the Commons Stacks
                  Decentralized Dev community.
                </p>
              </div>
            </div>
          </div>

          {/* Your are Giver Now */}
          <div className="w-full bg-white lg:w-1/2 lg:rounded-r-xl  flex flex-col gap-8 p-10 shadow-xl h-[450px] ">
            <div
              className="w-full h-[288px] flex flex-col gap-8  "
              style={{
                backgroundImage: "url('/images/successbg.png')",
              }}
            >
              <h1 className="text-3xl text-[#121B4B] font-bold text-center">
                You&apos;re are Giver Now
              </h1>
              <p className="bg-white ">
                Thank you for supporting Ethereum Colombia and thanks for your
                donation to this project!
              </p>
            </div>

            {/* Token Lock Schedule */}

            <div className="flex flex-col p-4 border-[1px] border-[#D7DDEA] rounded-lg  gap-2">
              <div className="flex gap-2 items-center">
                <h1 className="font-medium  text-[#1D1E1F]">
                  Token Lock Schedule{" "}
                </h1>
                <IconTokenSchedule size={17} />
              </div>
              <hr />
              <h2 className="text-[#4F576A]">
                One year lock followed by{" "}
                <span className="font-medium">one year unlock stream</span>.
              </h2>
            </div>

            {/* Socials */}
            <div className=" flex flex-col gap-2 text-center font-redHatText">
              <h2 className="text-xl">Share this with your friends</h2>
              <div className="flex gap-6  justify-center">
                <IconXSocial size={25} />
                <IconLinkedin size={25} />
                <IconFacebook size={25} />
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details */}

        <div className="flex flex-col items-center gap-4">
          <div className=" text-[#1D1E1F]  text-center">
            <p>Your transactions have been submitted.</p>
            <p>You can view them on a blockchain explorer here:</p>
          </div>

          <div className="text-xl font-redHatText">
            <h3 className="text-[#82899A] flex gap-2">
              Donation to Ethereum Colombia
              <span className="text-[#E1458D] text-xl flex gap-2">
                {" "}
                View the transaction <IconViewTransaction size={25} />
              </span>
            </h3>
          </div>

          <Button
            color={ButtonColor.Giv}
            className={`text-white justify-center w-[242px] text-sm`}
          >
            See More Projects
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonateSuccessPage;
