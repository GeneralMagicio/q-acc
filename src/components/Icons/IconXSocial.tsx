import { FC } from "react";
import { IIcon } from "./type";

export const IconXSocial: FC<IIcon> = ({
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
    >
      <g clip-path="url(#clip0_577_939)">
        <path
          d="M14.2232 10.3456L22.9612 0.188477H20.8906L13.3034 9.00778L7.24357 0.188477H0.254272L9.41793 13.5248L0.254272 24.1762H2.325L10.3372 14.8627L16.7369 24.1762H23.7262L14.2227 10.3456H14.2232ZM11.3871 13.6423L10.4586 12.3143L3.07111 1.74729H6.25163L12.2134 10.2752L13.1419 11.6032L20.8915 22.6882H17.711L11.3871 13.6428V13.6423Z"
          fill="#1D1E1F"
        />
      </g>
      <defs>
        <clipPath id="clip0_577_939">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.188477)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
