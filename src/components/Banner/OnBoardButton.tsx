'use client';

import Link from 'next/link';

import { useOnBoardButton } from '@/hooks/useOnBoardButton';
import { IconArrowRight } from '../Icons/IconArrowRight';

export const OnBoardButton = () => {
  const { label, href, onClick } = useOnBoardButton();

  const button = (
    <button
      className='flex items-center py-3 px-6 rounded-xl bg-gray-950 shadow-banner-button font-sans font-semibold tracking-wide'
      onClick={onClick}
    >
      <span>{label}</span>
      <IconArrowRight size={24} />
    </button>
  );

  return href ? <Link href={href}>{button}</Link> : button;
};
