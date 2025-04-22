import React, { HTMLAttributes } from 'react';
import Link from 'next/link';
import { useOnBoardButton } from '@/hooks/useOnBoardButton';

export const customButtonClass: HTMLAttributes<HTMLDivElement>['className'] =
  'font-redHatText px-5 py-4    flex justify-center items-center text-[white] md:text-sm font-bold bg-giv-500 rounded-xl shadow-tabShadow text-xs cursor-pointer';

export const OnBoardButton = () => {
  const { label, href, onClick } = useOnBoardButton();

  if (href) {
    return (
      <Link href={href}>
        <div className={customButtonClass}>{label}</div>
      </Link>
    );
  }

  return (
    <div className={customButtonClass} onClick={onClick}>
      {label}
    </div>
  );
};
