import { FC } from "react";
import { IIcon } from "./type";

export const IconLinkedin: FC<IIcon> = ({ size = 25, color = "#030823" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M16.5 8C18.0913 8 19.6174 8.63214 20.7426 9.75736C21.8679 10.8826 22.5 12.4087 22.5 14V20C22.5 20.5523 22.0523 21 21.5 21H19.5C18.9477 21 18.5 20.5523 18.5 20V14C18.5 13.4696 18.2893 12.9609 17.9142 12.5858C17.5391 12.2107 17.0304 12 16.5 12C15.9696 12 15.4609 12.2107 15.0858 12.5858C14.7107 12.9609 14.5 13.4696 14.5 14V20C14.5 20.5523 14.0523 21 13.5 21H11.5C10.9477 21 10.5 20.5523 10.5 20V14C10.5 12.4087 11.1321 10.8826 12.2574 9.75736C13.3826 8.63214 14.9087 8 16.5 8Z"
        fill={color}
      />
      <path
        d="M5.5 9H3.5C2.94772 9 2.5 9.44772 2.5 10V20C2.5 20.5523 2.94772 21 3.5 21H5.5C6.05228 21 6.5 20.5523 6.5 20V10C6.5 9.44772 6.05228 9 5.5 9Z"
        fill={color}
      />
      <path
        d="M4.5 6C5.60457 6 6.5 5.10457 6.5 4C6.5 2.89543 5.60457 2 4.5 2C3.39543 2 2.5 2.89543 2.5 4C2.5 5.10457 3.39543 6 4.5 6Z"
        fill={color}
      />
    </svg>
  );
};
