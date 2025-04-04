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
    <div className='bg-white py-12 '>
      <div className='container'>
        <div className='  mx-auto w-[80%]'>
          <h1 className='text-2xl text-black font-bold mb-8 '>
            What you need to know
          </h1>
          <ol className='list-decimal text-2xl font-light text-slate-600 px-4 space-y-4 leading-normal'>
            <li>The q/acc round runs two weeks.</li>
            <li>
              There is a matching pool for this round. Your token purchases
              boost a project’s matching pool allocation, which will be used for
              their token’s liquidity on the{' '}
              <a
                href={'https://quickswap.exchange/#/'}
                target='_blank'
                className='font-bold text-pink-500'
                referrerPolicy='no-referrer'
              >
                QuickSwap DEX.
              </a>
            </li>
            <li>
              You receive tokens from the projects you supported about 2 weeks
              after the end of the round. Those tokens have a 1 year unlock
              schedule with a 6 month cliff for new projects and a 10 month
              unlock schedule with a 5 month cliff for projects from previous
              seasons.
            </li>
            <li>
              The q/acc protocol uses{' '}
              <b className='font-extrabold'>
                Human Passport and Privado zkID for verification
              </b>
              . The spending cap for Human Passport is up to approx. $1,000 and
              the spending cap for zkID is approx. $25,000.
            </li>

            <li>
              The spending caps are set in $POL at the start of the round but
              may be updated periodically based on significant fluctuation in
              the POL-USD exchange rate.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Rules;
