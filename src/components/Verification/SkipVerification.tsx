import { useFetchUser } from '@/hooks/useFetchUser';
import { useUpdateSkipVerification } from '@/hooks/useUpdateSkipVerification';
import React from 'react';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import { EligibilityBadge, EligibilityBadgeStatus } from '../EligibilityBadge';

const SkipVerification = () => {
  const { data: user } = useFetchUser();

  const { mutate: updateSkipVerification, isPending } =
    useUpdateSkipVerification(() => {
      console.log('Skip verification updated successfully!');
    });
  return user?.skipVerification ? (
    <section className='bg-gray-50 rounded-2xl p-6 flex gap-4 justify-between'>
      <div>
        <h1 className='text-lg font-bold'>Skipped Verification</h1>
        <p>You have skipped the verification</p>
      </div>
      <div>
        <EligibilityBadge status={EligibilityBadgeStatus.ELIGIBLE} />
      </div>
    </section>
  ) : (
    <section className='bg-gray-50 rounded-2xl p-6 flex flex-col gap-4'>
      <h1 className='text-lg font-bold'>Skip Verification</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation
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
