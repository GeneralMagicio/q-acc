import React from 'react';
import Link from 'next/link';
import { ConnectButton } from '../ConnectButton/ConnectButton';
import { IconGoBack } from '../Icons/IconGoBack';
import { useDonateContext } from '@/context/donation.context';

interface DonateNavbarProps {
  isConfirming: boolean;
}

const DonateNavbar: React.FC<DonateNavbarProps> = ({ isConfirming }) => {
  const { projectData } = useDonateContext();
  return (
    <div className='bg-white flex items-center justify-between px-10 py-4 gap-4   w-full top-0  shadow-tabShadow'>
      <div className='flex gap-4 items-center'>
        <Link
          href={`/project/${projectData?.slug}`}
          onClick={(e: any) => isConfirming && e.preventDefault()}
        >
          <div
            className={`p-4 rounded-full flex items-center border shadow-md ${
              isConfirming ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <IconGoBack />
          </div>
        </Link>

        <div className='flex flex-col'>
          <span className='font-redHatText text-sm font-medium leading-5 text-[#82899A]'>
            Supporting to
          </span>
          <p className='font-redHatText text-base font-medium text-[#1D1E1F]'>
            {projectData?.title}
          </p>
        </div>
      </div>
      <ConnectButton />
    </div>
  );
};

export default DonateNavbar;
