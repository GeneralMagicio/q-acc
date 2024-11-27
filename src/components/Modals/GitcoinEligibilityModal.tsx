import { useState, type FC } from 'react';
import Modal, { BaseModalProps } from '../Modal';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import { EligibilityBadge, EligibilityBadgeStatus } from '../EligibilityBadge';
import { IconInfoCircle } from '../Icons/IconInfoCircle';
import { IconGitcoin } from '../Icons/IconGitcoin';
import config from '@/config/configuration';
import { useFetchUserGitcoinPassportScore } from '@/hooks/userFetchUserGitcoinPassportScore';

interface GitcoinEligibilityModalProps extends BaseModalProps {}

enum GitcoinEligibilityModalState {
  CHECK,
  NOT_CONNECTED,
  ELIGIBLE,
  NOT_ELIGIBLE,
}

export const GitcoinEligibilityModal: FC<
  GitcoinEligibilityModalProps
> = props => {
  const [state, setState] = useState(GitcoinEligibilityModalState.CHECK);
  const {
    data: userScore,
    refetch,
    isFetching,
  } = useFetchUserGitcoinPassportScore();
  return (
    <Modal {...props} title='Eligibility Check' showCloseButton>
      <div className=''>
        <p className='mt-4 mb-10 text-xl'>
          Verify your eligibility to contribute up to $1,000 to this project by
          completing a quick on-chain activity check.
        </p>
        {state === GitcoinEligibilityModalState.CHECK && (
          <Button
            className='mx-auto'
            styleType={ButtonStyle.Solid}
            color={ButtonColor.Pink}
            loading={isFetching}
            onClick={async () => {
              console.log('refetch');
              await refetch();
            }}
          >
            Check Eligibility
          </Button>
        )}
        {state === GitcoinEligibilityModalState.NOT_CONNECTED && (
          <div className='flex flex-col'>
            <EligibilityBadge
              status={EligibilityBadgeStatus.NOT_ELIGIBLE}
              className='block ml-auto'
            />
            <div className='bg-gray-50 my-2 rounded-xl px-4 py-6 text-base'>
              You didn’t pass the check. Please connect your Gitcoin Passport.
            </div>
            <Button
              className='mx-auto'
              styleType={ButtonStyle.Solid}
              color={ButtonColor.Pink}
            >
              Connect Gitcoin Passport
            </Button>
          </div>
        )}
        {(state === GitcoinEligibilityModalState.ELIGIBLE ||
          state === GitcoinEligibilityModalState.NOT_ELIGIBLE) && (
          <div className='flex flex-col'>
            <EligibilityBadge
              status={
                userScore. > config.GITCOIN_SCORE_THRESHOLD
                  ? EligibilityBadgeStatus.ELIGIBLE
                  : EligibilityBadgeStatus.NOT_ELIGIBLE
              }
              className='block ml-auto'
            />
            <div className='my-2 rounded-xl p-4 text-base border-[1px] border-gray-200'>
              <div className='flex gap-2 text-gray-500'>
                <IconInfoCircle size={24} />
                <div>Required Passport score to be eligible</div>
                <div>
                  {' >'}
                  {config.GITCOIN_SCORE_THRESHOLD}
                </div>
              </div>
              <div className='bg-gray-50 mt-2 rounded-xl p-4 text-base text-black flex items-center justify-between'>
                Your Passport Score
                <div className='bg-black text-white py-2 px-6 rounded-full'>
                  {userScore.}
                </div>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-gray-800'>Passport connected</div>
              <Button
                styleType={ButtonStyle.Text}
                color={ButtonColor.Pink}
                className='shadow-GIV400'
              >
                <div className='flex gap-2'>
                  <IconGitcoin size={16} />
                  Refresh Score
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
