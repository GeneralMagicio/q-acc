import { FC } from 'react';
import { IIcon } from './type';

export const IconTributesReceived: FC<IIcon> = ({
  size = 24,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M23 6L13.5 15.5L8.5 10.5L1 18'
        stroke='#4F576A'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17 6H23V12'
        stroke='#4F576A'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
