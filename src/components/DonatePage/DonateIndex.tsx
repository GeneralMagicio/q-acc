import React from "react";
import DonateNavbar from "./DonatePageNavbar";
import DonatePageBody from "./DonatePageBody";

const DonateIndex = () => {
  const donataionSuccess = false;
  return (
    <div>
      <DonateNavbar />
      {donataionSuccess ? <h1>Succes Page</h1> : <DonatePageBody />}
    </div>
  );
};

export default DonateIndex;
