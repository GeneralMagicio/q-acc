import { FC } from 'react';
import { IIcon } from './type';

export const IconSort: FC<IIcon> = ({ size = 16, color = 'currentColor' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        d='M6.57143 13.0001V3.0001L3 6.57153M9.42857 3.0001V13.0001L13 9.42867'
        stroke='#1D1E1F'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};
