'use client';
import React, { useState } from 'react';
import DonateNavbar from './DonatePageNavbar';
import DonatePageBody from './DonatePageBody';
import DonateSuccessPage from './DonateSuccessPage';

const DonateIndex = () => {
  return (
    <div>
      <DonateNavbar />
      <DonatePageBody />
    </div>
  );
};

export default DonateIndex;
