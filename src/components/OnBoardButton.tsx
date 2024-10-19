import React, { HTMLAttributes } from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { usePrivado } from '@/hooks/usePrivado';
import Routes from '@/lib/constants/Routes';
import { useFetchUser } from '@/hooks/useFetchUser';
import config from '@/config/configuration';
import { useAppKit } from '@reown/appkit/react';

export const customButtonClass: HTMLAttributes<HTMLDivElement>['className'] =
  'font-redHatText min-w-[168px] min-h-[66px]  py-6 flex justify-center items-center text-[white] md:text-sm font-bold bg-pink-500 rounded-full shadow-tabShadow text-xs cursor-pointer';

export const OnBoardButton = () => {
  const { address } = useAccount();
  const { isVerified: isVerifiedByPrivado } = usePrivado();
  const { data: user } = useFetchUser();
  const { open } = useAppKit();

  const analysisScore = user?.analysisScore || 0;
  const passportScore = user?.passportScore || 0;
  const isVerifiedByGP =
    analysisScore >= config.GP_ANALYSIS_SCORE_THRESHOLD ||
    passportScore >= config.GP_SCORER_SCORE_THRESHOLD;
  const isVerified = isVerifiedByPrivado || isVerifiedByGP;

  return !address ? (
    <div className={customButtonClass} onClick={() => open()}>
      Get Started
    </div>
  ) : isVerified ? (
    <Link href={Routes.Projects}>
      <div className={customButtonClass}>View Projects</div>
    </Link>
  ) : (
    <Link href={user?.fullName ? Routes.VerifyPrivado : Routes.CreateProfile}>
      <div className={customButtonClass}>Get Started</div>
    </Link>
  );
};
