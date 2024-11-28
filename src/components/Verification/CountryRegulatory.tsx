import React from 'react';

export const CountryRegulatory = () => {
  return (
    <>
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
    </>
  );
};
