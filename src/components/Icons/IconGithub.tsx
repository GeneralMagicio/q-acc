import { FC } from "react";
import { IIcon } from "./type";

export const IconGithub: FC<IIcon> = ({ size = 17, color = "#1D1E1F" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon/github">
        <path
          id="vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.00621 1.62497C4.85547 1.62497 1.5 5.00517 1.5 9.18695C1.5 12.5297 3.64996 15.3592 6.63253 16.3607C7.00543 16.436 7.14202 16.198 7.14202 15.9978C7.14202 15.8224 7.12973 15.2215 7.12973 14.5954C5.04169 15.0462 4.60687 13.694 4.60687 13.694C4.27131 12.8176 3.77411 12.5924 3.77411 12.5924C3.09069 12.1291 3.82389 12.1291 3.82389 12.1291C4.58198 12.1792 4.97977 12.9053 4.97977 12.9053C5.65074 14.0571 6.73194 13.7316 7.16691 13.5313C7.22899 13.043 7.42796 12.705 7.63922 12.5172C5.97386 12.3419 4.22168 11.6909 4.22168 8.78624C4.22168 7.95993 4.51975 7.28389 4.99206 6.75812C4.91754 6.57036 4.6565 5.79399 5.06673 4.75489C5.06673 4.75489 5.70052 4.55453 7.12958 5.5311C7.74141 5.36558 8.37238 5.28137 9.00621 5.28066C9.63999 5.28066 10.2861 5.36839 10.8827 5.5311C12.3119 4.55453 12.9457 4.75489 12.9457 4.75489C13.3559 5.79399 13.0947 6.57036 13.0202 6.75812C13.505 7.28389 13.7907 7.95993 13.7907 8.78624C13.7907 11.6909 12.0386 12.3293 10.3607 12.5172C10.6342 12.7551 10.8702 13.2057 10.8702 13.9194C10.8702 14.9335 10.8579 15.7473 10.8579 15.9976C10.8579 16.198 10.9947 16.436 11.3674 16.3608C14.35 15.359 16.5 12.5297 16.5 9.18695C16.5123 5.00517 13.1445 1.62497 9.00621 1.62497Z"
          fill={color}
        />
      </g>
    </svg>
  );
};
