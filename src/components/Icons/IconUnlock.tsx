import { FC } from 'react';
import { IIcon } from './type';

export const IconUnlock: FC<IIcon> = ({
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
        d='M7 10.9995V6.99951C7 5.67343 7.52678 4.40166 8.46447 3.46398C9.40215 2.5263 10.6739 1.99951 12 1.99951C13.3261 1.99951 14.5979 2.5263 15.5355 3.46398C16.1414 4.06984 16.5757 4.81518 16.8072 5.62452M5 10.9995H19C20.1046 10.9995 21 11.8949 21 12.9995V19.9995C21 21.1041 20.1046 21.9995 19 21.9995H5C3.89543 21.9995 3 21.1041 3 19.9995V12.9995C3 11.8949 3.89543 10.9995 5 10.9995Z'
        stroke='#4F576A'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
