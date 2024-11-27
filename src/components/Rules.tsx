import React from 'react';
import links from '@/lib/constants/links';

const Rules = () => {
  return (
    <div className='bg-white py-12'>
      <div className='container'>
        <h1 className='text-2xl text-black font-bold mb-8'>
          What you need to know
        </h1>
        <ol className='list-decimal text-lg text-slate-600 px-4 space-y-3'>
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
            The q/acc protocol prohibits citizens of the United States and
            <b className='font-extrabold'>
              {' '}
              United Kingdom from participating due to regulatory reasons.
            </b>
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
            There is a low cap and a high cap. The low cap is approximately{' '}
            <b className='font-extrabold'>1K USD denominated in POL</b> and
            requires <b className='font-extrabold'>Gitcoin Passport</b>. Above
            that amount, <b className='font-extrabold'>zkID is required up</b>{' '}
            until the high cap, which is{' '}
            <b className='font-extrabold'>
              approximately 15K USD denominated in POL
            </b>
            . Caps are per-person and per-project.
          </li>
          <li>
            To check and improve your{' '}
            <b className='font-extrabold'>Gitcoin Passport score</b>, go to
            <a
              href={links.PASSPORT}
              target='_blank'
              className='font-bold text-pink-500'
              referrerPolicy='no-referrer'
            >
              &nbsp;passport.xyz.
            </a>
          </li>
          <li>
            To get credentials with{' '}
            <b className='font-extrabold'>Privado zkID</b>, read the{' '}
            <a
              href={links.PRIVADO_GUIDE_LINK}
              target='_blank'
              className='font-bold text-pink-500'
              referrerPolicy='no-referrer'
            >
              Privado zkID how-to guide.
            </a>
          </li>
          <li>
            There is also a how-to guide on getting your{' '}
            <a
              href='https://giveth.notion.site/Get-ETH-and-POL-on-Polygon-zkEVM-1223ab28d48c8003b76fd98c3ed2a194'
              target='_blank'
              className='font-bold text-pink-500'
              referrerPolicy='no-referrer'
            >
              Polygon zkEVM wallet ready.
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Rules;
