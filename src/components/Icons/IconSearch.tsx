import { FC } from 'react';
import { IIcon } from './type';

export const IconSearch: FC<IIcon> = ({ size = 17, color = '#5326EC' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 17 16'
      fill='none'
    >
      <path
        d='M14.5 14L11.6 11.1M13.1667 7.33333C13.1667 10.2789 10.7789 12.6667 7.83333 12.6667C4.88781 12.6667 2.5 10.2789 2.5 7.33333C2.5 4.38781 4.88781 2 7.83333 2C10.7789 2 13.1667 4.38781 13.1667 7.33333Z'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
