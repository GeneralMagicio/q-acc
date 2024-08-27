import { FC } from 'react';
import { IIcon } from './type';

export const IconAlertCircleOutline: FC<IIcon> = ({
  size = 16,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        d='M7.99998 5.83331V8.49998M7.99998 11.1666H8.00665M14.6666 8.49998C14.6666 12.1819 11.6819 15.1666 7.99998 15.1666C4.31808 15.1666 1.33331 12.1819 1.33331 8.49998C1.33331 4.81808 4.31808 1.83331 7.99998 1.83331C11.6819 1.83331 14.6666 4.81808 14.6666 8.49998Z'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
