import { FC } from "react";
import { IIcon } from "./type";

export const IconMedium: FC<IIcon> = ({
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
      <g clipPath="url(#clip0_577_933)">
        <path
          d="M23 0.188477H1C0.734784 0.188477 0.48043 0.293833 0.292893 0.48137C0.105357 0.668906 0 0.92326 0 1.18848V23.1885C0 23.4537 0.105357 23.708 0.292893 23.8956C0.48043 24.0831 0.734784 24.1885 1 24.1885H23C23.2652 24.1885 23.5196 24.0831 23.7071 23.8956C23.8946 23.708 24 23.4537 24 23.1885V1.18848C24 0.92326 23.8946 0.668906 23.7071 0.48137C23.5196 0.293833 23.2652 0.188477 23 0.188477ZM20.36 6.03848L19 7.26848C18.9466 7.31049 18.9055 7.36605 18.8808 7.42936C18.8562 7.49268 18.849 7.56143 18.86 7.62848V17.1085C18.849 17.1755 18.8562 17.2443 18.8808 17.3076C18.9055 17.3709 18.9466 17.4265 19 17.4685L20.35 18.7985V19.0685H14V18.7985L15.16 17.4385C15.29 17.3085 15.29 17.2685 15.29 17.0785V10.1885L12.49 18.0885L12.19 19.0885H11.4C8.75 13.2985 7.91 11.2685 7.1 9.87848V16.8785L8.74 18.8785V19.1485H4V18.8785L5.6 16.8785V7.87848L4.36 6.33848V5.80848H9.13L12.35 13.5185L15 6.24848C15.0402 6.07312 15.1421 5.91807 15.2872 5.81159C15.4322 5.70512 15.6106 5.65433 15.79 5.66848H20.37L20.36 6.03848Z"
          fill="#1D1E1F"
        />
      </g>
      <defs>
        <clipPath id="clip0_577_933">
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
