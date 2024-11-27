import React, { HTMLAttributes } from 'react';
import Link from 'next/link';
import { usePrivado } from '@/hooks/usePrivado';
import Routes from '@/lib/constants/Routes';
import { useFetchUser } from '@/hooks/useFetchUser';

export const customButtonClass: HTMLAttributes<HTMLDivElement>['className'] =
  'font-redHatText px-10 py-6 flex justify-center items-center text-[white] font-bold bg-pink-500 rounded-full shadow-tabShadow text-sm';

export const OnBoardButton = () => {
  const { isVerified } = usePrivado();
  const { data: user } = useFetchUser();
  return isVerified ? (
    <Link href={Routes.Projects}>
      <div className={customButtonClass}>View Projects</div>
    </Link>
  ) : (
    <Link href={user?.fullName ? Routes.VerifyPrivado : Routes.CreateProfile}>
      <div className={customButtonClass}>Get Verified</div>
    </Link>
  );
};