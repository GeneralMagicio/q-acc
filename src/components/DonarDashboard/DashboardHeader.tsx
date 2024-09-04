import Link from 'next/link';
import React from 'react';
import { IconViewTransaction } from '../Icons/IconViewTransaction';

const DashboardHeader = () => {
  return (
    <div className='bg-white  w-ful p-10 '>
      <div className='container flex md:flex-row flex-col gap-6   items-center md:text-left text-center'>
        <div
          className='w-[180px] h-[180px] bg-cover bg-center rounded-3xl relative'
          style={{
            backgroundImage: "url('/images/placeholders/PFPQACC.png')",
          }}
        ></div>
        <div className='flex flex-col gap-4 text-[#1D1E1F]'>
          <h1 className='text-[41px] font-bold leading-[56px] '>Lauren Luz</h1>
          <h3 className='text-xl leading-8 font-redHatText'>
            Lauren@giveth.io
          </h3>
          <div className='flex gap-2 md:gap-6 text-[#E1458D] font-redHatText flex-col md:flex-row'>
            <Link href={'/create/profile'}>
              <span>Edit Profile</span>
            </Link>

            <h3 className='flex gap-2 items-center'>
              <span>0x17c8020de84d4097b053453423f9d33ff8e62507f</span>
              <IconViewTransaction size={18} />
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
