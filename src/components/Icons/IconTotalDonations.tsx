import { FC } from "react";
import { IIcon } from "./type";

export const IconTotalDonations: FC<IIcon> = ({
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
        d="M3 18.0001H21M4.5 20.2501H19.5M22.5 7.5001C21.5054 7.5001 20.5516 7.10501 19.8484 6.40175C19.1451 5.69849 18.75 4.74466 18.75 3.7501M1.5 7.5001C1.99246 7.5001 2.48009 7.4031 2.93506 7.21465C3.39003 7.02619 3.80343 6.74997 4.15165 6.40175C4.49987 6.05353 4.77609 5.64013 4.96455 5.18516C5.153 4.73019 5.25 4.24256 5.25 3.7501M22.5 12.0001C21.5054 12.0001 20.5516 12.3952 19.8484 13.0984C19.1451 13.8017 18.75 14.7555 18.75 15.7501M1.5 12.0001C1.99246 12.0001 2.48009 12.0971 2.93506 12.2856C3.39003 12.474 3.80343 12.7502 4.15165 13.0984C4.49987 13.4467 4.77609 13.8601 4.96455 14.315C5.153 14.77 5.25 15.2576 5.25 15.7501M21.75 15.7501H2.25C1.83579 15.7501 1.5 15.4143 1.5 15.0001V4.5001C1.5 4.08589 1.83579 3.7501 2.25 3.7501H21.75C22.1642 3.7501 22.5 4.08589 22.5 4.5001V15.0001C22.5 15.4143 22.1642 15.7501 21.75 15.7501ZM15.75 9.7501C15.75 11.8212 14.0711 13.5001 12 13.5001C9.92893 13.5001 8.25 11.8212 8.25 9.7501C8.25 7.67903 9.92893 6.0001 12 6.0001C14.0711 6.0001 15.75 7.67903 15.75 9.7501Z"
        stroke="#4F576A"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
