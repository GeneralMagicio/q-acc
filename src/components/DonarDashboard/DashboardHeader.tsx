import Link from 'next/link';
import React from 'react';
import { useAccount } from 'wagmi';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { useFetchUser } from '@/hooks/useFetchUser';
import config from '@/config/configuration';
import { IconIdentityVerified } from '../Icons/IconIdentityVerified';
import { usePrivado } from '@/hooks/usePrivado';

const DashboardHeader = () => {
  const { address } = useAccount();
  const { data: user } = useFetchUser();
  const { isVerified } = usePrivado();
  return (
    <div className='bg-white  w-ful pb-6 pt-8'>
      <div className='container flex md:flex-row flex-col gap-6   items-center md:text-left text-center'>
        <div
          className='w-[180px] h-[180px] bg-cover bg-center  rounded-3xl relative'
          style={{
            backgroundImage: `url(${user?.avatar || '/images/placeholders/PFPQACC.png'})`,
          }}
        ></div>
        <div className='flex flex-col gap-4 text-[#1D1E1F] w-full'>
          <h1 className='text-[41px] font-bold leading-[56px] '>
            {user?.fullName}
          </h1>
          <h3 className='text-xl leading-8 font-redHatText'>{user?.email}</h3>
          <div className='flex gap-2 md:gap-6  font-redHatText flex-col md:flex-row  items-center justify-between'>
            <div className='flex gap-8 text-[#E1458D] flex-col md:flex-row '>
              <Link href={'/create/profile'}>
                <span>Edit Profile</span>
              </Link>
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

            {isVerified && (
              <div className='px-2 py-1 bg-[#5CD3C9] rounded-lg font-medium flex  gap-2 font-redHatText items-center'>
                <IconIdentityVerified />
                Identity verified{' '}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
