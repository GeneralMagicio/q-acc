import links from '@/lib/constants/links';
import { Button, ButtonColor, ButtonStyle } from '@/components/Button';

import {
  EligibilityBadge,
  EligibilityBadgeStatus,
} from '@/components/EligibilityBadge';
import {
  GitcoinVerificationStatus,
  useGitcoinScore,
} from '@/hooks/useGitcoinScore';
import { IconGitcoin } from '@/components/Icons/IconGitcoin';
import config from '@/config/configuration';
import { IconInfoCircle } from '@/components/Icons/IconInfoCircle';

export const GitcoinVerifySection = () => {
  const {
    status,
    userGitcoinScore,
    onCheckScore,
    isUserLoading,
    isScoreFetching,
  } = useGitcoinScore();

  return status === GitcoinVerificationStatus.ANALYSIS_PASS ? (
    <section className='bg-gray-50 rounded-2xl p-6 flex gap-4 justify-between'>
      <h1 className='text-lg font-bold'>Gitcoin Passport</h1>
      <EligibilityBadge status={EligibilityBadgeStatus.ELIGIBLE} />
    </section>
  ) : (
    <section className='bg-gray-50 rounded-2xl p-6 flex flex-col gap-4'>
      <h1 className='text-lg font-bold'>Gitcoin Passport</h1>
      <p>
        Check and improve your <b>Gitcoin Passport score</b> at{' '}
        <a
          href={links.PASSPORT}
          target='_blank'
          className='font-bold text-pink-500'
          referrerPolicy='no-referrer'
        >
          &nbsp;app.passport.xyz
        </a>
      </p>
      {status === GitcoinVerificationStatus.NOT_CHECKED ? (
        <Button
          styleType={ButtonStyle.Solid}
          color={ButtonColor.Pink}
          className='mr-auto px-16'
          loading={isUserLoading || isScoreFetching}
          onClick={onCheckScore}
        >
          Check Score
        </Button>
      ) : status === GitcoinVerificationStatus.SCORER_PASS ||
        status === GitcoinVerificationStatus.LOW_SCORE ? (
        <div className='flex flex-col'>
          <EligibilityBadge
            status={
              userGitcoinScore > config.GP_SCORER_SCORE_THRESHOLD
                ? EligibilityBadgeStatus.ELIGIBLE
                : EligibilityBadgeStatus.NOT_ELIGIBLE
            }
            className='block ml-auto'
          />
          <div className='bg-white my-2 rounded-xl p-4 text-base border-[1px] border-gray-200'>
            <div className='flex gap-2 text-gray-500 items-center'>
              <IconInfoCircle size={24} />
              <div className='text-xs'>
                Required Passport score to be eligible
              </div>
              <div>
                {' >'}
                {config.GP_SCORER_SCORE_THRESHOLD}
              </div>
            </div>
            <div className='bg-gray-50 mt-2 rounded-xl p-4 text-base text-black flex items-center justify-between'>
              Your Passport Score
              <div className='bg-black text-white py-2 px-6 rounded-full'>
                {userGitcoinScore}
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-gray-800'>Passport connected</div>
            <Button
              styleType={ButtonStyle.Text}
              color={ButtonColor.Pink}
              className='shadow-GIV400'
              onClick={onCheckScore}
            >
              <div className='flex gap-2'>
                <IconGitcoin size={16} />
                Refresh Score
              </div>
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
};
