import { FC } from "react";
import { IIcon } from "./type";

export const IconMatic: FC<IIcon> = ({ size = 24, color = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 22"
      fill="none"
    >
      <path
        d="M12.6875 14.4921V15.6249C12.6875 16.3695 13.0983 17.033 13.6878 17.3706C13.6884 17.3709 13.6889 17.3712 13.6894 17.3715L16.3737 18.9321L16.3873 18.94L16.4014 18.9471C17.0317 19.2622 17.7727 19.2771 18.3731 18.934L18.3731 18.9341L18.3807 18.9295L21.0057 17.367L21.0058 17.3671L21.015 17.3614C21.6624 16.9567 22 16.2958 22 15.6249V12.4999C22 11.7553 21.5893 11.092 20.9999 10.7543C20.9993 10.754 20.9987 10.7536 20.9981 10.7533L18.3138 9.19262L18.3002 9.18471L18.2861 9.17766C17.6558 8.86253 16.9148 8.84767 16.3144 9.19076L16.3144 9.19074L16.3111 9.1927L12.8745 11.1922L12.8736 11.1927L10.4995 12.5672L10.4986 12.5677L7.07579 14.5591C6.71071 14.7369 6.33317 14.7209 6.0619 14.5665C6.06145 14.5663 6.06101 14.566 6.06057 14.5658L1.00861 11.6344C0.660474 11.4139 0.5 11.077 0.5 10.7499V4.87488C0.5 4.53654 0.666455 4.22567 0.973607 4.07209L0.988357 4.06472L1.00259 4.05639L6.11226 1.06536C6.47673 0.888122 6.85355 0.90392 7.12462 1.05768L12.1153 3.98973C12.4642 4.21016 12.625 4.54746 12.625 4.87488V6.7116L11.25 7.50765V6.31238C11.25 5.56951 10.8411 4.90742 10.2538 4.56907L7.57121 2.94701L7.55405 2.93663L7.53611 2.92766C6.90583 2.61253 6.16482 2.59767 5.56443 2.94076L5.56442 2.94074L5.56119 2.94262L2.87369 4.50512L2.86678 4.50914L2.86 4.51338C2.21256 4.91803 1.875 5.57896 1.875 6.24988V9.37488C1.875 10.1177 2.28391 10.7798 2.87115 11.1182L5.55379 12.7402L5.57095 12.7506L5.58889 12.7596C6.21917 13.0747 6.96018 13.0896 7.56057 12.7465L7.56062 12.7466L7.56975 12.7411L10.9996 10.6832L13.3668 9.375L13.3669 9.37517L13.3788 9.36815L16.8629 7.31506C17.2276 7.1379 17.6047 7.15405 17.8757 7.30829C17.8761 7.30853 17.8765 7.30876 17.8769 7.309L22.9289 10.2404C23.277 10.4608 23.4375 10.7978 23.4375 11.1249V17.0624C23.4375 17.4421 23.2241 17.7781 22.9394 17.9407L22.9366 17.9424L17.8885 20.8715C17.5233 21.0494 17.1455 21.0334 16.8742 20.8789C16.8738 20.8787 16.8734 20.8785 16.8731 20.8783L11.8212 17.9469C11.473 17.7264 11.3125 17.3895 11.3125 17.0624V15.2882L12.6875 14.4921Z"
        fill="#8247E5"
        stroke="#8247E5"
      />
    </svg>
  );
};
