import { FC } from 'react';
import { IIcon } from './type';

export const IconTokenSchedule: FC<IIcon> = ({
  size = 17,
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
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 16.5001C12.4183 16.5001 16 12.9183 16 8.50006C16 4.08178 12.4183 0.500061 8 0.500061C3.58172 0.500061 0 4.08178 0 8.50006C0 12.9183 3.58172 16.5001 8 16.5001ZM9.141 8.57505L9.384 8.40405C9.798 8.11605 10.086 7.85505 10.248 7.62105C10.416 7.38705 10.5 7.10805 10.5 6.78405C10.5 6.54405 10.446 6.32205 10.338 6.11805C10.23 5.91405 10.08 5.73705 9.888 5.58705C9.702 5.43705 9.477 5.32005 9.213 5.23605C8.955 5.15205 8.676 5.11005 8.376 5.11005C7.86 5.11005 7.395 5.23605 6.981 5.48805C6.7405 5.63305 6.53648 5.80933 6.36895 6.01688C6.1752 6.25692 6.30877 6.59506 6.59336 6.71407C6.85715 6.82438 7.15303 6.69784 7.36529 6.50628C7.42924 6.44856 7.49914 6.39715 7.575 6.35205C7.803 6.21405 8.055 6.14505 8.331 6.14505C8.607 6.14505 8.835 6.21405 9.015 6.35205C9.201 6.48405 9.294 6.65205 9.294 6.85605C9.294 6.98805 9.252 7.11405 9.168 7.23405C9.084 7.34805 8.949 7.47105 8.763 7.60305L8.304 7.93605C8.022 8.14605 7.83 8.37105 7.728 8.61105C7.67084 8.74553 7.63347 8.90734 7.61588 9.09646C7.59008 9.37375 7.82856 9.59205 8.10705 9.59205C8.4025 9.59205 8.61357 9.337 8.72121 9.06186C8.7286 9.04296 8.73653 9.02469 8.745 9.00705C8.823 8.85105 8.955 8.70705 9.141 8.57505ZM8.646 10.339C8.508 10.195 8.337 10.123 8.133 10.123C7.935 10.123 7.764 10.195 7.62 10.339C7.476 10.483 7.404 10.657 7.404 10.861C7.404 11.059 7.476 11.23 7.62 11.374C7.764 11.518 7.935 11.59 8.133 11.59C8.337 11.59 8.508 11.518 8.646 11.374C8.79 11.23 8.862 11.059 8.862 10.861C8.862 10.657 8.79 10.483 8.646 10.339Z'
        fill='#1D1E1F'
      />
    </svg>
  );
};
