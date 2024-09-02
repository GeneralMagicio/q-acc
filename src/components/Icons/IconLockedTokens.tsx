import { FC } from 'react';
import { IIcon } from './type';

export const IconLockedTokens: FC<IIcon> = ({
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
        d='M20.7412 15.9325C21.1298 15.1271 20.1117 13.8295 18.4673 13.0341C16.8229 12.2387 15.1749 12.2468 14.7863 13.0521M20.7412 15.9325L20.0376 17.3907C19.7902 17.9034 19.0324 18.0929 18.09 17.9578M20.7412 15.9325C20.4938 16.4452 19.736 16.6347 18.7936 16.4996M17.0601 15.9505C16.4626 15.6615 15.9478 15.3061 15.5531 14.9322M17.0601 15.9505L16.3565 17.4087M17.0601 15.9505C17.6577 16.2395 18.2557 16.4225 18.7936 16.4996M14.7863 13.0521L14.0827 14.5103C13.8353 15.023 14.158 15.7353 14.8495 16.3904M14.7863 13.0521C14.5389 13.5648 14.8616 14.2771 15.5531 14.9322M16.3565 17.4087C15.759 17.1197 15.2442 16.7643 14.8495 16.3904M16.3565 17.4087C16.9541 17.6977 17.5521 17.8807 18.09 17.9578M15.5531 14.9322L14.8495 16.3904M18.7936 16.4996L18.09 17.9578M22.4566 6.87902C22.1789 6.01915 20.5498 5.74289 18.8179 6.26196C17.086 6.78104 15.9071 7.89889 16.1848 8.75876M22.4566 6.87902L22.9595 8.43595C23.1363 8.98336 22.7227 9.63533 21.952 10.1708M22.4566 6.87902C22.6334 7.42643 22.2199 8.0784 21.4491 8.61387M19.8235 9.37582C19.1942 9.56444 18.5784 9.64804 18.0362 9.63678M19.8235 9.37582L20.3264 10.9327M19.8235 9.37582C20.4529 9.1872 21.0092 8.91951 21.4491 8.61387M16.1848 8.75876L16.6876 10.3157C16.8644 10.8631 17.5889 11.174 18.539 11.1937M16.1848 8.75876C16.3616 9.30617 17.0861 9.61705 18.0362 9.63678M20.3264 10.9327C19.697 11.1214 19.0813 11.205 18.539 11.1937M20.3264 10.9327C20.9557 10.7441 21.512 10.4764 21.952 10.1708M18.0362 9.63678L18.539 11.1937M21.4491 8.61387L21.952 10.1708'
        stroke='#4F576A'
      />
      <path
        d='M3.22222 10.95V8.75C3.22222 8.02065 3.51488 7.32118 4.03581 6.80546C4.55675 6.28973 5.26329 6 6 6C6.73671 6 7.44325 6.28973 7.96419 6.80546C8.48512 7.32118 8.77778 8.02065 8.77778 8.75V10.95M2.11111 10.95H9.88889C10.5025 10.95 11 11.4425 11 12.05V15.9C11 16.5075 10.5025 17 9.88889 17H2.11111C1.49746 17 1 16.5075 1 15.9V12.05C1 11.4425 1.49746 10.95 2.11111 10.95Z'
        stroke='#4F576A'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};