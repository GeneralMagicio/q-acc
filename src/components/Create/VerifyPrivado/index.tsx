"use client";
import React, { useState } from "react";
import CreateNavbar from "../CreateNavbar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import Routes from "@/lib/constants/Routes";

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      d="M14.8591 12.8919L9.09312 3.08857C8.98862 2.91104 8.83155 2.76234 8.63892 2.65859C8.44629 2.55484 8.22544 2.5 8.00031 2.5C7.77517 2.5 7.55433 2.55484 7.3617 2.65859C7.16907 2.76234 7.012 2.91104 6.9075 3.08857L1.14085 12.8919C1.04235 13.0593 0.994037 13.2466 1.00059 13.4355C1.00714 13.6244 1.06833 13.8086 1.17825 13.9703C1.28816 14.132 1.44308 14.2657 1.62803 14.3585C1.81297 14.4513 2.02168 14.5 2.23397 14.5H13.766C13.9783 14.5 14.187 14.4513 14.372 14.3585C14.5569 14.2657 14.7118 14.132 14.8218 13.9703C14.9317 13.8086 14.9929 13.6244 14.9994 13.4355C15.006 13.2466 14.9577 13.0593 14.8591 12.8919ZM7.38311 6.53375C7.38311 6.38809 7.44811 6.2484 7.5638 6.1454C7.67948 6.0424 7.83639 5.98454 8 5.98454C8.16361 5.98454 8.32052 6.0424 8.4362 6.1454C8.55189 6.2484 8.61689 6.38809 8.61689 6.53375V9.82899C8.61689 9.97465 8.55189 10.1143 8.4362 10.2173C8.32052 10.3203 8.16361 10.3782 8 10.3782C7.83639 10.3782 7.67948 10.3203 7.5638 10.2173C7.44811 10.1143 7.38311 9.97465 7.38311 9.82899V6.53375ZM8.03084 12.8551H8.01357C7.7703 12.8544 7.53674 12.77 7.36176 12.6196C7.18677 12.4691 7.08391 12.2642 7.07467 12.0478C7.07023 11.9401 7.08992 11.8328 7.1326 11.732C7.17529 11.6312 7.2401 11.539 7.32327 11.4608C7.40643 11.3826 7.50627 11.3199 7.61696 11.2764C7.72764 11.2329 7.84696 11.2095 7.96792 11.2075H7.98519C8.22842 11.2078 8.46211 11.2918 8.63734 11.4419C8.81258 11.5921 8.91577 11.7968 8.92533 12.0132C8.93011 12.1211 8.91062 12.2287 8.86801 12.3298C8.82539 12.4309 8.76051 12.5234 8.67718 12.6018C8.59384 12.6802 8.49373 12.7431 8.38274 12.7866C8.27175 12.8301 8.1521 12.8534 8.03084 12.8551Z"
                      fill="#C71D06"
                    />
                  </svg>
                  <span className="text-[#C71D06] font-redHatText text-sm">
                    We can&apos;t verify your account, please contact Qacc
                    support team <b>qacc@giveth.io</b>
                  </span>
                </>
              ) : verified.isVerified ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      d="M8 1.5C4.14024 1.5 1 4.64024 1 8.5C1 12.3598 4.14024 15.5 8 15.5C11.8598 15.5 15 12.3598 15 8.5C15 4.64024 11.8598 1.5 8 1.5ZM11.643 6.15399L7.11995 11.5386C7.07034 11.5977 7.0086 11.6454 6.93892 11.6786C6.86925 11.7118 6.79326 11.7295 6.71611 11.7308H6.70702C6.63155 11.7307 6.55692 11.7148 6.48799 11.6841C6.41905 11.6534 6.35735 11.6085 6.30688 11.5524L4.36841 9.39856C4.31918 9.34634 4.28089 9.28481 4.25578 9.21759C4.23067 9.15036 4.21925 9.07879 4.22219 9.00709C4.22513 8.93539 4.24238 8.86499 4.27292 8.80005C4.30345 8.73511 4.34666 8.67692 4.40001 8.62892C4.45335 8.58091 4.51575 8.54406 4.58354 8.52051C4.65133 8.49697 4.72315 8.48721 4.79476 8.49182C4.86638 8.49643 4.93635 8.5153 5.00057 8.54734C5.06478 8.57937 5.12195 8.62392 5.1687 8.67837L6.69288 10.3718L10.8185 5.46139C10.9111 5.3544 11.042 5.28812 11.183 5.27689C11.324 5.26565 11.4638 5.31036 11.5721 5.40134C11.6804 5.49233 11.7486 5.62229 11.7619 5.76313C11.7751 5.90397 11.7324 6.04437 11.643 6.15399Z"
                      fill="#1B8C82"
                    />
                  </svg>
                  <span className="text-[#1B8C82] font-redHatText text-sm">
                    You account has been successfully verified.
                  </span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 8.5C16 12.9183 12.4183 16.5 8 16.5C3.58172 16.5 0 12.9183 0 8.5C0 4.08172 3.58172 0.5 8 0.5C12.4183 0.5 16 4.08172 16 8.5ZM8 13.5C7.72386 13.5 7.5 13.2761 7.5 13L7.5 7C7.5 6.72386 7.72386 6.5 8 6.5C8.27614 6.5 8.5 6.72386 8.5 7V13C8.5 13.2761 8.27614 13.5 8 13.5ZM8 5.5C8.55229 5.5 9 5.05228 9 4.5C9 3.94772 8.55229 3.5 8 3.5C7.44772 3.5 7 3.94772 7 4.5C7 5.05228 7.44772 5.5 8 5.5Z"
                      fill="#8668FC"
                    />
                  </svg>
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
