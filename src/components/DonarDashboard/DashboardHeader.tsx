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
            src={user?.avatar || '/images/placeholders/PFPQACC.png'}
            alt='logo'
            width={128}
            height={128}
            className='hidden md:block rounded-2xl'
          />
          <div className='pt-4 text-gray-600 text-lg'>
            <h1 className='text-xl font-bold'>{user?.fullName}</h1>
            <div className=' leading-8 font-bold'>{user?.email}</div>
            <CopyHash value={address || ''} />
          </div>
          <div className='flex-1'></div>
          <div>
            {!isSafeAccount && (
              <Link href={`edit/${user?.id}/profile`}>
                <div className='font-bold border-[1px] text-giv-700 border-giv-50 py-3 px-8 rounded-xl'>
                  Edit Profile
                </div>
              </Link>
            )}
          </div>
        </div>
        <div className='border-b-[1px] border-gray-200'></div>
        <div className='flex items-center'>
          <UserQaccPoints />
          <div className='flex-1'></div>
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
      </div>
    </div>
  );
};

export default DashboardHeader;
