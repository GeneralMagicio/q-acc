'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC } from 'react';

interface HeaderItemProps {
  label: string;
  route: string;
}

export const HeaderItem: FC<HeaderItemProps> = ({ label, route }) => {
  const pathname = usePathname(); // Get the current pathname

  return (
    <Link href={route} className='font-medium'>
      <div
        className={`py-[14px] px-6 rounded-full text-sm sm:text-base font-medium text-nowrap ${
          pathname === route ? 'bg-giv-50' : 'bg-transparent'
        }`}
      >
        {label}
      </div>
    </Link>
  );
};
