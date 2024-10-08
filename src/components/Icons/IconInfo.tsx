import { FC } from 'react';
import { IIcon } from './type';

export const IconInfo: FC<IIcon> = ({ size = 14, color = '#4F576A' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 16 17'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16 8.5C16 12.9183 12.4183 16.5 8 16.5C3.58172 16.5 0 12.9183 0 8.5C0 4.08172 3.58172 0.5 8 0.5C12.4183 0.5 16 4.08172 16 8.5ZM8 13.5C7.72386 13.5 7.5 13.2761 7.5 13L7.5 7C7.5 6.72386 7.72386 6.5 8 6.5C8.27614 6.5 8.5 6.72386 8.5 7V13C8.5 13.2761 8.27614 13.5 8 13.5ZM8 5.5C8.55229 5.5 9 5.05228 9 4.5C9 3.94772 8.55229 3.5 8 3.5C7.44772 3.5 7 3.94772 7 4.5C7 5.05228 7.44772 5.5 8 5.5Z'
        fill={color}
      />
    </svg>
    // </svg>
  );
};
