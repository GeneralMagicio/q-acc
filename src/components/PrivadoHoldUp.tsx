import React from 'react';

export const PrivadoHoldUp = () => {
  return (
    <>
      <ul className='flex flex-col gap-4 list-disc px-10'>
        <li>
          The q/acc protocol prohibits persons from the{' '}
          <span className='text-gray-800 font-bold'>
            United States and the United Kingdom
          </span>{' '}
          from participating due to regulatory restrictions.
        </li>
        <li>
          Additionally, to comply with AML requirements, the q/acc protocol
          restricts participation from individuals in the following countries:
          &nbsp;
          <span className='text-gray-800 font-bold'>
            Afghanistan, American Samoa, Anguilla, Antigua and Barbuda, Belarus,
            Bosnia Herzegovina, Central African Republic, Cuba, DR Congo,
            Ethiopia, Fiji, Guam, Hong Kong, Iran, Iraq, Kosovo, Lebanon, Libya,
            Mali, Montenegro, Myanmar, Nicaragua, North Korea, North Macedonia,
            Palau, Panama, Russia, Samoa, Serbia, Somalia, South Sudan, Sudan,
            Syria, Ukraine, US Virgin Islands, Vanuatu, Venezuela, Yemen. 
          </span>{' '}
        </li>
        <li>
          These are the four document types accepted:{' '}
          <span className='text-gray-800 font-bold'>
            Passport, National ID, Driver’s License, or Resident Permit
          </span>
          . Documents must include your date of birth or verification will fail.
          Have your document ready!
        </li>
        {/* <li>
          <span className='text-gray-800 font-bold'>
            We strongly encourage you to use MetaMask at this time.
          </span>{' '}
          We have had issues reported from those using WalletConnect.
        </li>
        <li>
          We encourage you{' '}
          <span className='text-gray-800 font-bold'>
            {' '}
            not to use the Privado mobile app{' '}
          </span>{' '}
          at this time. You will see an option to  “Continue via app” during
          verification. Do not select that.
        </li> */}
      </ul>
    </>
  );
};
