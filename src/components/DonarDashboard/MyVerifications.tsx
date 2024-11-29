import React from 'react';
import { GitcoinVerifySection } from '../Verification/GitcoinVerifySection';
import { ZkidVerifySection } from '../Verification/ZkidVerifySection';

export const MyVerifications = () => {
  return (
    <div className='container'>
      <div className='w-full bg-white flex flex-col p-8 gap-10 rounded-2xl  text-xl font-redHatText leading-9 mb-14 md:mb-48 mt-14'>
        <GitcoinVerifySection />
        <ZkidVerifySection />
      </div>
    </div>
  );
};
