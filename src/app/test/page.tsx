import React from 'react';
import { SquidDonationForm } from './SquidDonationForm';

const page = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Donate with Squid
      </h1>
      <SquidDonationForm />
    </div>
  );
};

export default page;
