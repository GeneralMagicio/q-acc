import { FC } from 'react';
import { IIcon } from './type';

export const IconVerified: FC<IIcon> = ({
  size = 17,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 17 17'
      fill='none'
    >
      <path d='M13.8332 4.5L6.49984 11.8333L3.1665 8.5' fill='white' />
      <path
        d='M13.8332 4.5L6.49984 11.8333L3.1665 8.5'
        stroke='#37B4A9'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};
