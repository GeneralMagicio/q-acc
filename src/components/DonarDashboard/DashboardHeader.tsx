import Link from 'next/link';
import React from 'react';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import { useFetchUser } from '@/hooks/useFetchUser';
import { IconIdentityVerified } from '../Icons/IconIdentityVerified';
import { usePrivado } from '@/hooks/usePrivado';
import { GitcoinVerificationBadge } from '../VerificationBadges/GitcoinVerificationBadge';
import { PrivadoVerificationBadge } from '../VerificationBadges/PrivadoVerificationBadge';
import { useCheckSafeAccount } from '@/hooks/useCheckSafeAccount';
import UserQaccPoints from './UserQaccPoints';
import { CopyHash } from '../CopyHash';
const DashboardHeader = () => {
  const { address } = useAccount();
  const { data: user } = useFetchUser();
  const { isVerified } = usePrivado();
  const { data: isSafeAccount } = useCheckSafeAccount();

  return (
    <div className='container'>
      <div className='bg-white rounded-2xl w-ful p-6 mt-8 flex flex-col gap-4'>
        <div className='flex gap-6'>
          <Image
            src='/images/placeholders/PFPQACC.png'
            alt='logo'
            width={128}
            height={128}
            className='hidden md:block rounded-2xl'
          />
          <div>
            <h1 className='text-xl font-bold'>{user?.fullName}</h1>
            <div className='text-xl leading-8 font-redHatText'>
              {user?.email}
            </div>
            <CopyHash value={address || ''} />
          </div>
          <div className='flex-1'></div>
          {!isSafeAccount && (
            <Link href={`edit/${user?.id}/profile`}>
              <span>Edit Profile</span>
            </Link>
          )}
        </div>
        <div className='border-b-[1px] border-gray-200'></div>
        <div className='flex'>
          <UserQaccPoints />
          <div>
            {isVerified ? (
              <div className='px-2 py-1 bg-[#5CD3C9] rounded-lg font-medium flex  gap-2 font-redHatText items-center'>
                <IconIdentityVerified />
                Identity verified{' '}
              </div>
            ) : (
              <div className='flex  gap-4'>
                <GitcoinVerificationBadge />
                <PrivadoVerificationBadge />
              </div>
            )}
          </div>
        </div>
        {/* <div className='container flex md:flex-row flex-col gap-6 items-center md:text-left text-center'>
          <div
            className='min-w-[150px] min-h-[150px] bg-cover bg-center  rounded-3xl relative'
            style={{
              backgroundImage: `url(${user?.avatar || '/images/placeholders/PFPQACC.png'})`,
            }}
          ></div>
          <div className='flex flex-col gap-4 text-[#1D1E1F] w-full'>
            <div className='flex gap-2 md:gap-6  font-redHatText flex-col md:flex-row  items-center justify-between'>
              <div className='flex gap-8 text-pink-500 flex-col md:flex-row '>
                <Link
                  target='_blank'
                  href={`${config.SCAN_URL}/address/${address}`}
                >
                  <h3 className='flex gap-2 items-center'>
                    <span>{address}</span>
                    <IconViewTransaction size={18} />
                  </h3>
                </Link>
              </div>

              {isVerified ? (
                <div className='px-2 py-1 bg-[#5CD3C9] rounded-lg font-medium flex  gap-2 font-redHatText items-center'>
                  <IconIdentityVerified />
                  Identity verified{' '}
                </div>
              ) : (
                <div className='flex flex-col gap-4'>
                  <GitcoinVerificationBadge />
                  <PrivadoVerificationBadge />
                </div>
              )}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardHeader;
