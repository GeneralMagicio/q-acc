'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';

import Image from 'next/image';

import { useState, type FC, type HTMLProps } from 'react';
import Link from 'next/link';
import { useFetchUser } from '@/hooks/useFetchUser';
import { isProductReleased } from '@/config/configuration';

interface ConnectButtonProps extends HTMLProps<HTMLDivElement> {}

export const ConnectButton: FC<ConnectButtonProps> = ({
  className,
  ...props
}) => {
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  const { address, isConnecting, chain, isConnected } = useAccount();
  const { data: user } = useFetchUser();

  const [isHovered, setIsHovered] = useState(false);

  const handleConnect = () => {
    if (!isConnected) {
      open();
    } else {
    }
  };

  const shortAddress = address
    ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
    : '';

  return (
    <div className={`relative ${className}`} {...props}>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleConnect}
        disabled={isConnecting}
        className={`px-6 py-[14px] text-sm font-medium rounded-full transition-colors duration-300 flex items-center justify-center gap-2 text-nowrap
          ${
            address
              ? 'bg-white text-gray-900 shadow-tabShadow hover:shadow-md'
              : 'bg-pink-500 text-white hover:bg-pink-600'
          }
        `}
      >
        {isConnecting ? (
          <svg
            className='animate-spin h-5 w-5 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8v8H4z'
            ></path>
          </svg>
        ) : address ? (
          <div className='flex gap-2 items-center'>
            <Image
              src={user?.avatar || '/images/placeholders/PFPQACC.png'}
              alt='Profile Pic'
              width={24}
              height={24}
              className='rounded-full w-6 h-6'
            />
            <div className='flex flex-col items-start'>
              <div className='text-sm'>{user?.fullName || shortAddress}</div>
              <div className='text-[0.6rem] text-giv-800 max-w-32 whitespace-nowrap overflow-hidden text-ellipsis'>
                Connected to {chain?.name}
              </div>
            </div>
          </div>
        ) : (
          <div>q/acc Sign in</div>
        )}
      </button>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`bg-white  w-[250px] shadow-walletShadow p-4 md:right-4 rounded-xl absolute z-50 ${isHovered && isConnected ? 'visible' : 'hidden '}`}
      >
        <div className='flex flex-col gap-2 font-redHatText cursor-pointer'>
          <div
            className='flex flex-col  text-xs  gap-0 hover:bg-[#F7F7F9] rounded-lg p-3'
            onClick={() => {
              open();
            }}
          >
            <span className='text-gray-600 font-semibold text-sm'>WALLET</span>
            <span className='text-gray-900 font-semibold text-base uppercase'>
              {shortAddress}
            </span>
          </div>
          <div className='flex flex-col gap-4'>
            {isProductReleased && (
              <Link
                href={'/dashboard'}
                className='p-2 hover:bg-[#F7F7F9] rounded-lg'
              >
                My Account
              </Link>
            )}
            <Link
              href={'mailto:qacc@giveth.io'}
              className='p-2 hover:bg-[#F7F7F9] rounded-lg'
            >
              Do You Need Help?
            </Link>
            <div
              className='p-2 hover:bg-[#F7F7F9] rounded-lg'
              onClick={() => {
                // localStorage.getItem('token');
                // remove jwt token once user signs out
                localStorage.removeItem('token');
                disconnect();
              }}
            >
              Sign out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
