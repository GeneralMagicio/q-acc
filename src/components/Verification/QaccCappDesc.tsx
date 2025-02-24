import React from 'react';

export const QaccCappDesc = () => {
  return (
    <>
      <p>
        The q/acc protocol uses{' '}
        <b className='font-bold'>Privado zkID and Gitcoin Passport</b>.
      </p>
      <p className='border-gray-100 border-b-2 pb-4'>
        There is a low cap and a high cap. The low cap is approximately{' '}
        <b className='font-bold'>1K POL</b> and requires{' '}
        <b className='font-bold'>Gitcoin Passport</b>. Above that amount,{' '}
        <b className='font-bold'>zkID is required up until the high cap</b>,
        which is approximately <b className='font-bold'>15K POL</b>. Caps are
        per-person and per-project.
      </p>
    </>
  );
};
