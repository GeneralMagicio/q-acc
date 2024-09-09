import { FC } from 'react';
import { IIcon } from './type';

export const IconEditProject: FC<IIcon> = ({
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
        d='M8 13.8335H14'
        stroke='black'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11 2.83316C11.2652 2.56794 11.6249 2.41895 12 2.41895C12.1857 2.41895 12.3696 2.45553 12.5412 2.5266C12.7128 2.59767 12.8687 2.70184 13 2.83316C13.1313 2.96448 13.2355 3.12038 13.3066 3.29196C13.3776 3.46354 13.4142 3.64744 13.4142 3.83316C13.4142 4.01888 13.3776 4.20277 13.3066 4.37436C13.2355 4.54594 13.1313 4.70184 13 4.83316L4.66667 13.1665L2 13.8332L2.66667 11.1665L11 2.83316Z'
        stroke='black'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
