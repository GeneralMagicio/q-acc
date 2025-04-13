import React, { HTMLAttributes } from 'react';
import Link from 'next/link';
import { useOnBoardButton } from '@/hooks/useOnBoardButton';

export const customButtonClass: HTMLAttributes<HTMLDivElement>['className'] =
  'font-redHatText min-w-[168px] min-h-[66px]  py-6 flex justify-center items-center text-[white] md:text-sm font-bold bg-pink-500 rounded-full shadow-tabShadow text-xs cursor-pointer';

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
