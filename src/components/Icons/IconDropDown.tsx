import { FC } from 'react';
import { IIcon } from './type';

export const IconDropDown: FC<IIcon> = ({
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
        d='M6 9L12 15L18 9'
        stroke='#1D1E1F'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
