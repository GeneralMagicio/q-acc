import React, { useState } from 'react';
import { Button, ButtonColor, ButtonStyle } from '@/components/Button';
import { IconArrowRight } from '@/components/Icons/IconArrowRight';
import { usePrivado } from '@/hooks/usePrivado';
import { PrivadoModal } from '@/components/Modals/PrivadoModal';
import {
  EligibilityBadge,
  EligibilityBadgeStatus,
} from '@/components/EligibilityBadge';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';
import { IQfRound } from '@/types/round.type';
import { formatAmount } from '@/helpers/donation';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';

export const ZkidVerifySection = () => {
  const [showPrivadoModal, setShowPrivadoModal] = useState(false);
  const { isVerified, error, isLoading } = usePrivado();
  const { data: POLPrice } = useFetchTokenPrice();

  const { data: allRounds } = useFetchAllRound();

  const qaccRound: IQfRound | undefined = allRounds?.filter(
    round => round.__typename === 'QfRound',
  )[0];

  let high_cap;

  if (qaccRound) {
    if ('roundUSDCapPerUserPerProjectWithGitcoinScoreOnly' in qaccRound) {
      high_cap =
        (qaccRound?.roundUSDCapPerUserPerProject || 15000) /
        (qaccRound?.tokenPrice || Number(POLPrice));
    }
  }

  return isVerified ? (
    <section className='bg-gray-50 rounded-2xl p-6 flex gap-4 justify-between'>
      <div>
        <h1 className='text-lg font-bold'>Privado zkID</h1>
        <p>
          You are eligible to support each project with up to{' '}
          {formatAmount(high_cap)} POL.
        </p>
      </div>
      <div>
        <EligibilityBadge status={EligibilityBadgeStatus.ELIGIBLE} />
      </div>
    </section>
  ) : (
    <section className='bg-gray-50 rounded-2xl p-6 flex flex-col gap-4'>
      <h1 className='text-lg font-bold'>Privado zkID</h1>
      <p>
        Get your credentials with Privado zkID to support each project with up
        to {formatAmount(high_cap)} POL.
      </p>
      <Button
        styleType={ButtonStyle.Solid}
        color={ButtonColor.Base}
        className='mr-auto px-16'
        loading={isLoading}
        onClick={() => {
          setShowPrivadoModal(true);
        }}
      >
        {!!error ? 'retry' : 'Go to Privado'}
        <IconArrowRight size={16} />
      </Button>
      {showPrivadoModal && (
        <PrivadoModal
          isOpen={showPrivadoModal}
          onClose={() => {
            setShowPrivadoModal(false);
          }}
        />
      )}
    </section>
  );
};
