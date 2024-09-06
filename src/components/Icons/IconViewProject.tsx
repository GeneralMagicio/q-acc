import { FC } from 'react';
import { IIcon } from './type';

export const IconViewProject: FC<IIcon> = ({
  size = 16,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 16 17'
      fill='none'
    >
      <path
        d='M0.666016 8.49984C0.666016 8.49984 3.33268 3.1665 7.99935 3.1665C12.666 3.1665 15.3327 8.49984 15.3327 8.49984C15.3327 8.49984 12.666 13.8332 7.99935 13.8332C3.33268 13.8332 0.666016 8.49984 0.666016 8.49984Z'
        stroke='#1D1E1F'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8 10.5C9.10457 10.5 10 9.60457 10 8.5C10 7.39543 9.10457 6.5 8 6.5C6.89543 6.5 6 7.39543 6 8.5C6 9.60457 6.89543 10.5 8 10.5Z'
        stroke='#1D1E1F'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
