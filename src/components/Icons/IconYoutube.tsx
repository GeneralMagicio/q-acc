import { FC } from "react";
import { IIcon } from "./type";

export const IconYoutube: FC<IIcon> = ({ size = 16, color = "#1D1E1F" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Social Icons">
        <g id="Vector">
          <path
            d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12002 4 3.40002 4.46C2.92927 4.59318 2.502 4.84824 2.16137 5.19941C1.82074 5.55057 1.57881 5.98541 1.46002 6.46C1.14524 8.20556 0.991258 9.97631 1.00002 11.75C0.988802 13.537 1.14279 15.3213 1.46002 17.08C1.59098 17.5398 1.83833 17.9581 2.17817 18.2945C2.518 18.6308 2.93884 18.8738 3.40002 19C5.12002 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0112 9.96295 22.8573 8.1787 22.54 6.42Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.75002 15.02L15.5 11.75L9.75002 8.48V15.02Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};
