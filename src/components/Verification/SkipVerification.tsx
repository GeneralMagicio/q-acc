import React from 'react';
import { useRouter } from 'next/navigation';
import { useFetchUser } from '@/hooks/useFetchUser';
import { useUpdateSkipVerification } from '@/hooks/useUpdateSkipVerification';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import { EligibilityBadge, EligibilityBadgeStatus } from '../EligibilityBadge';
import Routes from '@/lib/constants/Routes';
import { usePrivado } from '@/hooks/usePrivado';
import {
  GitcoinVerificationStatus,
  useGitcoinScore,
} from '@/hooks/useGitcoinScore';

const SkipVerification = () => {
  const { data: user } = useFetchUser();
  const { status } = useGitcoinScore();
  const router = useRouter();
  const { isVerified } = usePrivado();
  const { mutate: updateSkipVerification, isPending } =
    useUpdateSkipVerification(() => {
      console.log('Skip verification updated successfully!');
      router.push(Routes.Projects);
    });
  return isVerified ||
    status === GitcoinVerificationStatus.ANALYSIS_PASS ||
    status === GitcoinVerificationStatus.SCORER_PASS ? (
    <section className='relative overflow-hidden bg-gray-50 rounded-2xl p-6'>
      <div>
        <h1 className='text-lg font-bold'>Skipped Verificattion</h1>
        <p>
          You have skipped the verification, verify above to influence the
          matching distribution
        </p>
      </div>
      <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-gray-50 opacity-60'></div>
    </section>
  ) : user?.skipVerification ? (
    <section className='bg-gray-50 rounded-2xl p-6 flex gap-4 justify-between'>
      <div>
        <h1 className='text-lg font-bold'>Skipped Verification</h1>
        <p>
          You have skipped the verification, verify above to influence the
          matching distribution.
        </p>
      </div>
      <div>
        <EligibilityBadge status={EligibilityBadgeStatus.ELIGIBLE} />
      </div>
    </section>
  ) : (
    <section className='bg-gray-50 rounded-2xl p-6 flex flex-col gap-4'>
      <h1 className='text-lg font-bold'>Skip Verification</h1>
      <p>
        Skipping Verification will allow you to spend up to approximately
        $1,000, but your token purchases won't influence the distribution of the
        matching pool.
      </p>

      <Button
        styleType={ButtonStyle.Solid}
        color={ButtonColor.Base}
        className='mr-auto px-16 shadow-baseShadow'
        loading={isPending}
        disabled={user?.skipVerification}
        onClick={() => updateSkipVerification(true)}
      >
        {user?.skipVerification ? 'Verification Skipped ' : 'Skip Verification'}
      </Button>
    </section>
  );
};

export default SkipVerification;
