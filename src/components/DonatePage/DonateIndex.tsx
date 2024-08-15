"use client";
import React, { useState } from "react";
import DonateNavbar from "./DonatePageNavbar";
import DonatePageBody from "./DonatePageBody";
import DonateSuccessPage from "./DonateSuccessPage";

const DonateIndex = () => {
  const [donataionSuccess, setDonationSuccess] = useState<boolean>(true);
  return donataionSuccess ? (
    <>
      <DonateNavbar />
      <DonateSuccessPage />
    </>
  ) : (
    <div>
      <DonateNavbar />
      <DonatePageBody />
    </div>
  );
};

export default DonateIndex;
