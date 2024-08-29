import React from 'react';
import DonateNavbar from '@/components/DonatePage/DonatePageNavbar';
import DonateSuccessPage from '@/components/DonatePage/DonateSuccessPage';

const page = () => {
  return (
    <div>
      <DonateNavbar />
      <DonateSuccessPage />
    </div>
  );
};

export default page;
