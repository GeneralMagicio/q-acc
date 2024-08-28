import React, { FC } from 'react';
import { IIcon } from './type';

export const IconPointerLeft: FC<IIcon> = ({
  size = 16,
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
        d='M23.25 12.6855H0.75M0.75 12.6855L4.5 16.4355M0.75 12.6855L4.5 8.93549'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
