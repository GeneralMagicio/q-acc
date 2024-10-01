import { FC } from 'react';
import { IIcon } from './type';

export const IconChevronDown: FC<IIcon> = ({
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
        d='M6.5 9L12.5 15L18.5 9'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
