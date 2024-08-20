"use client";
import React, { useState } from "react";
import CreateNavbar from "../CreateNavbar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import Routes from "@/lib/constants/Routes";
import { IconError } from "@/components/Icons/IconError";
import { IconVerified } from "@/components/Icons/IconVerified";
import { IconInfo } from "@/components/Icons/IconInfo";

interface IVerified {
  isVerified: boolean;
  error: boolean;
}
const VerifyPrivado = () => {
  const router = useRouter();
  const [verified, setVerified] = useState<IVerified>({
    isVerified: false,
    error: false,
  });

  const verifyAccount = () => {};
  const handleSubmit = (event: any) => {
    event.preventDefault();
    router.push(Routes.CreateProject);
  };
  return (
    <form onSubmit={handleSubmit}>
      <CreateNavbar
        onBack={(event) => {
          event.preventDefault();
          router.push(Routes.CreateProfile);
        }}
        disabled={!verified.isVerified}
      />
      <div className="w-full bg-white flex flex-col p-8 gap-10 rounded-2xl mt-6">
        <div>
          <h1 className="text-2xl text-[#1D1E1F] font-bold">
            Account Verification
          </h1>
        </div>
        <div className="flex flex-col gap-8">
          <div className="font-redHatText">
            <p className="text-[#1D1E1F] text-xl">
              All project owners and donors are required to verify their
              identity with our identity solution provider, Privado. You only
              need to do it once, and it shouldn&apos;t take long.
            </p>
          </div>
          <div className="flex flex-col gap-10 lg:flex-row justify-between">
            <div
              className={`flex p-4 border  rounded-lg gap-4 ${
                verified.error
                  ? "bg-[#FFD6D0] border-[#C71D06] "
                  : verified.isVerified
                  ? "bg-[#D2FFFB] border-[#1B8C82] "
                  : "bg-[#F6F3FF] border-[#8668FC] "
              }`}
            >
              {verified.error ? (
                <>
                  <IconError />
                  <span className="text-[#C71D06] font-redHatText text-sm">
                    We can&apos;t verify your account, please contact Qacc
                    support team <b>qacc@giveth.io</b>
                  </span>
                </>
              ) : verified.isVerified ? (
                <>
                  <IconVerified />
                  <span className="text-[#1B8C82] font-redHatText text-sm">
                    You account has been successfully verified.
                  </span>
                </>
              ) : (
                <>
                  <IconInfo size={17} color="#8668FC" />
                  <span className="text-[#8668FC] font-redHatText text-sm">
                    Identity credentials are required.
                  </span>
                </>
              )}
            </div>
            <div className="font-redHatText font-bold">
              {verified.error ? (
                <Button
                  type="button"
                  onClick={verifyAccount}
                  className="p-4 rounded-full shadow-baseShadow text-sm font-bold min-w-[200px] justify-center"
                >
                  Retry
                </Button>
              ) : verified.isVerified ? (
                <Button
                  disabled
                  type="button"
                  onClick={verifyAccount}
                  className="p-4 rounded-full opacity-100  shadow-baseShadow text-sm font-bold min-w-[200px] justify-center text-[#37B4A9]"
                >
                  Verified
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={verifyAccount}
                  className="p-4 rounded-full shadow-baseShadow text-sm font-bold min-w-[200px] justify-center"
                >
                  Verify My Account
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default VerifyPrivado;
