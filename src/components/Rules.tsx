import React from 'react';
import links from '@/lib/constants/links';

const Rules = () => {
  return (
    <div className='bg-white py-12'>
      <div className='container'>
        <h1 className='text-2xl text-black font-bold mb-8'>
          What you need to know
        </h1>
        <ol className='list-decimal text-2xl font-light text-slate-600 px-4 space-y-4 leading-normal'>
          <li>
            The q/acc round lasts{' '}
            <b className='font-extrabold'>only two weeks</b>.
          </li>
          <li>
            At the end of the round, you will receive tokens from the projects
            you supported. These tokens have a
            <b className='font-extrabold'>
              {' '}
              1 year unlock schedule with a 6-month cliff
            </b>
            .
          </li>
          <li>
            The q/acc protocol prohibits citizens of the
            <b className='font-extrabold'> United States and United Kingdom </b>
            from participating due to regulatory reasons.
          </li>
          <li>
            The q/acc protocol prohibits citizens from{' '}
            <b className='font-extrabold'>
              Afghanistan, American Samoa, Anguilla, Antigua and Barbuda,
              Belarus, Bosnia Herzegovina, Central African Republic, Cuba, DR
              Congo, Ethiopia, Fiji, Guam, Hong Kong, Iran, Iraq, Kosovo,
              Lebanon, Libya, Mali, Montenegro, Myanmar, Nicaragua, North Korea,
              North Macedonia, Palau, Panama, Russia, Samoa, Serbia, Somalia,
              South Sudan, Sudan, Syria, Ukraine, US Virgin Islands, Vanuatu,
              Venezuela, Yemen
            </b>{' '}
            from participating due to AML compliance.
          </li>
          <li>
            The q/acc protocol uses{' '}
            <b className='font-extrabold'>Privado zkID and Gitcoin Passport</b>.
          </li>
          <li>
            With <b className='font-extrabold'>Gitcoin Passport</b> you are
            eligible to support each project with up to approximately{' '}
            <b className='font-extrabold'>$1,000 USD-equivalent of POL.</b>
          </li>
          <li>
            With <b className='font-extrabold'>Privado zkID credentials</b>, you
            are eligible to support each project with up to{' '}
            <b className='font-extrabold'>$15,000 USD-equivalent of POL.</b>
          </li>
          <li>
            To learn how to verify your identity, check
            <a
              href={links.PRIVADO_GUIDE_LINK}
              target='_blank'
              className='font-bold text-pink-500'
              referrerPolicy='no-referrer'
            >
              &nbsp;our docs.
            </a>
          </li>
          <li>
            All contributions made in the q/acc round need to be in POL on
            Polygon zkEVM. Learn how to get your wallet{' '}
            <a
              href={links.POLYGON_ZKEVM_GUIDE_LINK}
              target='_blank'
              className='font-bold text-pink-500'
              referrerPolicy='no-referrer'
            >
              Polygon zkEVM ready here.
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Rules;
