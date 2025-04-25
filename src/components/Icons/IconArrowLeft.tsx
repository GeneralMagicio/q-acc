import { FC } from 'react';
import { IIcon } from './type';

export const IconArrowLeft: FC<IIcon> = ({
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
        d='M19 11.9995H5M5 11.9995L12 18.9995M5 11.9995L12 4.99951'
        stroke='#1D1E1F'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
