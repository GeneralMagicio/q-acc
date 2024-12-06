import React from 'react';
import links from '@/lib/constants/links';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';
import { IQfRound } from '@/types/round.type';
import { formatAmount } from '@/helpers/donation';

const Rules = () => {
  const { data: POLPrice } = useFetchTokenPrice();

  const { data: allRounds } = useFetchAllRound();

  const qaccRound: IQfRound | undefined = allRounds?.filter(
    round => round.__typename === 'QfRound',
  )[0];

  let high_cap, low_cap;

  if (qaccRound) {
    if ('roundUSDCapPerUserPerProjectWithGitcoinScoreOnly' in qaccRound) {
      low_cap =
        (qaccRound?.roundUSDCapPerUserPerProjectWithGitcoinScoreOnly || 1000) /
        (qaccRound?.tokenPrice || Number(POLPrice));

      high_cap =
        (qaccRound?.roundUSDCapPerUserPerProject || 15000) /
        (qaccRound?.tokenPrice || Number(POLPrice));
    }
  }

  return (
    <div className='bg-white py-12'>
      <div className='container'>
        <h1 className='text-2xl text-black font-bold mb-8'>
          What you need to know
        </h1>
        <ol className='list-decimal text-2xl font-light text-slate-600 px-4 space-y-4 leading-normal'>
          <li>
            The q/acc round lasts f
            <b className='font-extrabold'>only two weeks</b>.
          </li>
          <li>
            There is a <b className='font-extrabold'>250K matching pool</b> for
            this round. Your support boosts a project’s matching allocation,
            which will be determined following Sybil analysis and used for their
            token’s liquidity on the{' '}
            <a
              href={'https://quickswap.exchange/#/'}
              target='_blank'
              className='font-bold text-pink-500'
              referrerPolicy='no-referrer'
            >
              QuickSwap DEX
            </a>
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
            eligible to support each project with up to{' '}
            <b className='font-extrabold'>{formatAmount(low_cap)} POL.</b>
          </li>
          <li>
            With <b className='font-extrabold'>Privado zkID credentials</b>, you
            are eligible to support each project with up to{' '}
            <b className='font-extrabold'>{formatAmount(high_cap)} POL.</b>
          </li>
          <li>
            The above caps are set at the start of the round and may be changed
            during the round in the event of significant fluctuation in POL-USD
            rate over a 48 hour period.
          </li>
          <li>
            Learn how to verify your identity and move POL and ETH to Polygon
            zkEVM in our
            <a
              href={links.How_To_Guides}
              target='_blank'
              className='font-bold text-pink-500'
              referrerPolicy='no-referrer'
            >
              &nbsp;how-to guides.
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Rules;
