import { FC } from 'react';
import { IIcon } from './type';

export const IconTransactionVerified: FC<IIcon> = ({
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
        d='M8 1.5C4.14024 1.5 1 4.64024 1 8.5C1 12.3598 4.14024 15.5 8 15.5C11.8598 15.5 15 12.3598 15 8.5C15 4.64024 11.8598 1.5 8 1.5ZM11.643 6.15399L7.11995 11.5386C7.07034 11.5977 7.0086 11.6454 6.93892 11.6786C6.86925 11.7118 6.79326 11.7295 6.71611 11.7308H6.70702C6.63155 11.7307 6.55692 11.7148 6.48799 11.6841C6.41905 11.6534 6.35735 11.6085 6.30688 11.5524L4.36841 9.39856C4.31918 9.34634 4.28089 9.28481 4.25578 9.21759C4.23067 9.15036 4.21925 9.07879 4.22219 9.00709C4.22513 8.93539 4.24238 8.86499 4.27292 8.80005C4.30345 8.73511 4.34666 8.67692 4.40001 8.62892C4.45335 8.58091 4.51575 8.54406 4.58354 8.52051C4.65133 8.49697 4.72315 8.48721 4.79476 8.49182C4.86638 8.49643 4.93635 8.5153 5.00057 8.54734C5.06478 8.57937 5.12195 8.62392 5.1687 8.67837L6.69288 10.3718L10.8185 5.46139C10.9111 5.3544 11.042 5.28812 11.183 5.27689C11.324 5.26565 11.4638 5.31036 11.5721 5.40134C11.6804 5.49233 11.7486 5.62229 11.7619 5.76313C11.7751 5.90397 11.7324 6.04437 11.643 6.15399Z'
        fill='#37B4A9'
      />
    </svg>
  );
};
