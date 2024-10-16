import { FC } from 'react';
import { IIcon } from './type';

export const IconCheck: FC<IIcon> = ({ size = 16, color = 'currentColor' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M13.8307 4.5L6.4974 11.8333L3.16406 8.5' fill='white' />
      <path
        d='M13.8307 4.5L6.4974 11.8333L3.16406 8.5'
        stroke={color}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};
