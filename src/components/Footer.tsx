'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconXSocial } from './Icons/IconXSocial';
import { IconFarcaster } from './Icons/IconFarcaster';
import Routes from '@/lib/constants/Routes';
import { IconMirror } from './Icons/IconMirror';

const Hide_Footer_Items_Routes = [Routes.KycLanding];

export const Footer: React.FC = () => {
  const pathName = usePathname();
  const shouldHideFooterItems = Hide_Footer_Items_Routes.includes(pathName);

  const allItems = [
    {
      label: 'Home',
      href: Routes.Home,
      shouldDisplay: !shouldHideFooterItems,
    },
    {
      label: 'Projects',
      href: Routes.AllProjects,
      shouldDisplay: !shouldHideFooterItems,
    },
    {
      label: 'About q/acc',
      href: 'https://qacc.giveth.io/',
      shouldDisplay: true,
    },
    {
      label: 'q/acc Paper',
      href: 'https://giveth.notion.site/The-q-acc-Paper-d21fa650fde1402882dcceb3b5c26d88',
      shouldDisplay: true,
    },
    {
      label: 'FAQ',
      href: 'https://qacc.giveth.io/#faq',
      shouldDisplay: true,
    },
    {
      label: 'Privacy Policy',
      href: 'https://qacc.giveth.io/privacy-policy',
      shouldDisplay: true,
    },
    {
      label: 'Terms and Conditions',
      href: 'https://giveth.notion.site/Terms-and-Conditions-10a3ab28d48c8058af3cd37455b591c5',
      shouldDisplay: true,
    },
  ];

  // Filter the items to only display those that should be shown
  const displayedItems = allItems.filter(item => item.shouldDisplay);

  // Split the displayed items into two columns, 4 items each (or adjusted depending on how many there are)
  const column1 = displayedItems.slice(0, 4);
  const column2 = displayedItems.slice(4);

  return (
    <footer className='bg-gray-100 pt-20 pb-6 mt-8'>
      <div className='container'>
        <div className='flex flex-col lg:flex-row justify-between items-center'>
          <div className='flex flex-row w-full'>
            {/* Column 1 */}
            <div className='mb-4 lg:mb-0 w-[50%]'>
              <ul className='space-y-2'>
                {column1.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : '_self'}
                      className='text-gray-700 hover:underline'
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Column 2 */}
            <div className='mb-4 lg:mb-0 w-[50%]'>
              <ul className='space-y-2'>
                {column2.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : '_self'}
                      className='text-gray-700 hover:underline'
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
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
