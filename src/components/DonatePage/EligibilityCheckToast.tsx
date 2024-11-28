import React from 'react';

export const EligibilityCheckToast = () => {
  return (
    <div className='flex p-4 rounded-lg border-[1px] border-violet-500 bg-violet-50 gap-2 font-redHatText text-violet-500 flex-col'>
      <h1 className='font-medium'>Verify Your Contribution Eligibility</h1>
      <p className='pb-2 '>
        To contribute up to $2,000 in POL, you need a minimum Gitcoin Passport
        score of 15. Don’t have a Gitcoin Passport or need to improve your
        score? Click Here
      </p>
      <p className='pb-2 '>
        To contribute more than $2,000 in POL, you need to complete zkID
        verification with Privado. Haven’t completed your KYC yet? Click Here
      </p>
    </div>
  );
};
