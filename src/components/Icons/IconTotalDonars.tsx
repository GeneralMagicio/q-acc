import { FC } from "react";
import { IIcon } from "./type";

export const IconTotalDonars: FC<IIcon> = ({
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18.8437 7.87509C18.7064 9.7815 17.2922 11.2501 15.75 11.2501C14.2078 11.2501 12.7912 9.78197 12.6562 7.87509C12.5156 5.89181 13.8923 4.50009 15.75 4.50009C17.6076 4.50009 18.9844 5.9279 18.8437 7.87509Z"
        stroke="#4F576A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7501 14.2501C12.6952 14.2501 9.75756 15.7674 9.02162 18.7224C8.92412 19.1134 9.16928 19.5001 9.571 19.5001H21.9296C22.3313 19.5001 22.5751 19.1134 22.479 18.7224C21.743 15.7201 18.8054 14.2501 15.7501 14.2501Z"
        stroke="#4F576A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M9.37496 8.71603C9.26527 10.2385 8.12246 11.4376 6.89058 11.4376C5.65871 11.4376 4.51402 10.239 4.40621 8.71603C4.29418 7.13212 5.40652 6.00009 6.89058 6.00009C8.37465 6.00009 9.48699 7.16119 9.37496 8.71603Z"
        stroke="#4F576A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.65671 14.3435C8.81061 13.9558 7.87874 13.8067 6.89108 13.8067C4.45358 13.8067 2.10515 15.0185 1.51686 17.3786C1.43952 17.6908 1.63546 17.9997 1.95608 17.9997H7.21921"
        stroke="#4F576A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
};
