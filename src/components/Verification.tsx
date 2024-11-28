import React from 'react';
import { GitcoinVerifySection } from './Create/GetVerified/GitcoinVerifySection';
import { ZkidVerifySection } from './Create/GetVerified/ZkidVerifySection';

export const Verification = () => {
  return (
    <div className='w-full bg-white flex flex-col p-8 gap-10 rounded-2xl  text-xl font-redHatText leading-9 mb-14 md:mb-48 mt-14'>
      <p>
        The q/acc protocol prohibits citizens of the{' '}
        <b className='font-bold'>United States and United Kingdom</b> from
        participating due to regulatory reasons.
      </p>
      <p className='border-gray-100 border-b-2 pb-4'>
        The q/acc protocol prohibits citizens from{' '}
        <b className='font-bold'>
          Afghanistan, American Samoa, Anguilla, Antigua and Barbuda, Belarus,
          Bosnia Herzegovina, Central African Republic, Cuba, DR Congo,
          Ethiopia, Fiji, Guam, Hong Kong, Iran, Iraq, Kosovo, Lebanon, Libya,
          Mali, Montenegro, Myanmar, Nicaragua, North Korea, North Macedonia,
          Palau, Panama, Russia, Samoa, Serbia, Somalia, South Sudan, Sudan,
          Syria, Ukraine, US Virgin Islands, Vanuatu, Venezuela, Yemen
        </b>{' '}
        from participating due to AML compliance.
      </p>
      <p>
        The q/acc protocol uses{' '}
        <b className='font-bold'>Privado zkID and Gitcoin Passport</b>.
      </p>
      <p className='border-gray-100 border-b-2 pb-4'>
        There is a low cap and a high cap. The low cap is approximately{' '}
        <b className='font-bold'>1K USD denominated in POL</b> and requires{' '}
        <b className='font-bold'>Gitcoin Passport</b>. Above that amount,{' '}
        <b className='font-bold'>zkID is required up until the high cap</b>,
        which is approximately{' '}
        <b className='font-bold'>15K USD denominated in POL</b>. Caps are
        per-person and per-project.
      </p>
      <GitcoinVerifySection />
      <ZkidVerifySection />
    </div>
  );
};