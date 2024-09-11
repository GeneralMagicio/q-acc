'use client';
import React from 'react';
import Link from 'next/link';
import { IconXSocial } from './Icons/IconXSocial';
import { IconFarcaster } from './Icons/IconFarcaster';
import Routes from '@/lib/constants/Routes';
import { IconMirror } from './Icons/IconMirror';

export const Footer: React.FC = () => {
  return (
    <footer className='bg-gray-100 py-8'>
      <div className=' container'>
        <div className='flex  flex-col lg:flex-row justify-between items-center'>
          <div className='flex flex-row  w-full'>
            <div className='mb-4 lg:mb-0 w-[50%]'>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href={Routes.Home}
                    className='text-gray-700 hover:underline'
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={Routes.AllProjects}
                    className='text-gray-700 hover:underline'
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href={'https://qacc.giveth.io/'}
                    className='text-gray-700 hover:underline'
                  >
                    About q/acc
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      'https://giveth.notion.site/The-q-acc-Paper-d21fa650fde1402882dcceb3b5c26d88'
                    }
                    className='text-gray-700 hover:underline'
                  >
                    q/acc Paper
                  </Link>
                </li>
              </ul>
            </div>
            <div className='mb-4 lg:mb-0'>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href={Routes.Faq}
                    className='text-gray-700 hover:underline'
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href={Routes.AboutUs}
                    className='text-gray-700 hover:underline'
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href={Routes.Terms}
                    className='text-gray-700 hover:underline'
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='flex flex-col gap-4 items-center'>
            <div className='flex items-center sm:gap-8 gap-6'>
              <Link
                target='_blank'
                href={'https://x.com/theqacc'}
                className='text-gray-700 hover:text-gray-900'
              >
                <IconXSocial />
              </Link>
              <Link
                target='_blank'
                href={'https://warpcast.com/theqacc'}
                className='text-gray-700 hover:text-gray-900'
              >
                <IconFarcaster />
              </Link>
              <Link
                target='_blank'
                href={'https://mirror.xyz/qacc.eth'}
                className='text-gray-700 hover:text-gray-900'
              >
                <IconMirror />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
