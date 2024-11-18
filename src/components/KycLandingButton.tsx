'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Button, ButtonStyle, ButtonColor } from './Button';
import { IconArrowRight } from './Icons/IconArrowRight';
import { fetchGivethUserInfo } from '@/services/user.service';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import Routes from '@/lib/constants/Routes';
import { useFetchUser } from '@/hooks/useFetchUser';

export const KycLandingButton = () => {
  const { address } = useAccount();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { data: user } = useFetchUser();
  const route = useRouter();
  const { open } = useWeb3Modal();

  const handleStartKyc = async () => {
    if (!address) {
      await open();
    } else {
      const givethData = await fetchGivethUserInfo(address);
      if (givethData && (givethData.name || givethData.email)) {
        const _user = {
          id: givethData.id,
          email: givethData.email || undefined,
          fullName: givethData.name,
          avatar: givethData.avatar,
          newUser: true,
        };

        await updateUser(_user);
        route.push(Routes.VerifyPrivado);
        console.log('saved');
      } else {
        console.log('No user in giveth data');
        route.push(Routes.CreateProfile);
      }
    }
  };

  return (
    <Button
      styleType={ButtonStyle.Solid}
      color={ButtonColor.Pink}
      className={'mx-auto'}
      onClick={() => {
        if (user?.fullName) {
          route.push(Routes.VerifyPrivado);
        } else {
          handleStartKyc();
        }
      }}
    >
      <div className='flex gap-2'>
        <span>Get started</span>
        <IconArrowRight />
      </div>
    </Button>
  );
};
