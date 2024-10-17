import React from 'react';
import { IconCheckCircleFilled } from './Icons/IconCheckCircleFilled';
import { IconCheck } from './Icons/IconCheck';

export const KycCompleteBox = () => {
  return (
    <div className='p-8 shadow-baseShadow rounded-xl relative bg-white'>
      <h1 className='text-2xl text-gray-800 font-bold mb-3'>KYC Complete</h1>
      <p className='text-gray-600 pb-2 border-b-[1px]'>
        Your identity verification with Privado ID was successful.
      </p>
      <div className='flex items-center justify-between mt-8'>
        <div className='flex items-center gap-2 p-4 rounded-lg border border-success-700 text-sm text-success-600 bg-success-100'>
          <IconCheckCircleFilled />
          <p>Your account has been successfully verified.</p>
        </div>
        <div className='py-4 px-10 flex gap-2 text-sm text-success-600 rounded-full shadow-baseShadow'>
          <p>Verified</p>
          <IconCheck />
        </div>
      </div>
    </div>
  );
};
