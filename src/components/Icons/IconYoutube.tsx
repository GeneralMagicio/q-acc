import { FC } from "react";
import { IIcon } from "./type";

export const IconYoutube: FC<IIcon> = ({
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
      <path
        d="M20.06 3.68848H3.94C2.89505 3.68848 1.89289 4.10358 1.154 4.84248C0.415106 5.58137 0 6.58352 0 7.62848V16.7485C0 17.7934 0.415106 18.7956 1.154 19.5345C1.89289 20.2734 2.89505 20.6885 3.94 20.6885H20.06C21.105 20.6885 22.1071 20.2734 22.846 19.5345C23.5849 18.7956 24 17.7934 24 16.7485V7.62848C24 6.58352 23.5849 5.58137 22.846 4.84248C22.1071 4.10358 21.105 3.68848 20.06 3.68848ZM16.54 12.1885L9.77 16.5485C9.69452 16.5969 9.6074 16.6241 9.51777 16.6273C9.42814 16.6305 9.33931 16.6095 9.26057 16.5666C9.18184 16.5236 9.11611 16.4603 9.07026 16.3832C9.02442 16.3062 9.00015 16.2182 9 16.1285V7.46848C9.00015 7.37879 9.02442 7.2908 9.07026 7.21372C9.11611 7.13664 9.18184 7.07331 9.26057 7.03036C9.33931 6.98742 9.42814 6.96644 9.51777 6.96962C9.6074 6.97281 9.69452 7.00005 9.77 7.04848L16.54 11.3785C16.6102 11.4238 16.6679 11.486 16.7078 11.5594C16.7478 11.6327 16.7687 11.7149 16.7687 11.7985C16.7687 11.882 16.7478 11.9642 16.7078 12.0376C16.6679 12.111 16.6102 12.1731 16.54 12.2185V12.1885Z"
        fill="#1D1E1F"
      />
    </svg>
  );
};
