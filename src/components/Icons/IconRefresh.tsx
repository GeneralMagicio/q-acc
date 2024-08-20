import { FC } from "react";
import { IIcon } from "./type";

export const IconRefresh: FC<IIcon> = ({
  size = 16,
  color = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8.77905 5.58272C8.53133 5.70475 8.42944 6.00448 8.55147 6.2522C8.6735 6.49992 8.97323 6.60181 9.22095 6.47978L8.77905 5.58272ZM8 5.84375V6.34375V5.84375ZM11 8.34375C11 8.0676 10.7761 7.84375 10.5 7.84375C10.2239 7.84375 10 8.0676 10 8.34375H11ZM8.35355 4.3027C8.15829 4.10743 7.84171 4.10743 7.64645 4.3027C7.45118 4.49796 7.45118 4.81454 7.64645 5.0098L8.35355 4.3027ZM9.25 5.90625L9.60355 6.2598C9.79882 6.06454 9.79882 5.74796 9.60355 5.5527L9.25 5.90625ZM7.64645 6.8027C7.45118 6.99796 7.45118 7.31454 7.64645 7.5098C7.84171 7.70507 8.15829 7.70507 8.35355 7.5098L7.64645 6.8027ZM9 6.03125C9.22095 6.47978 9.22127 6.47962 9.22159 6.47947C9.2217 6.47941 9.22202 6.47925 9.22224 6.47914C9.22268 6.47893 9.22313 6.4787 9.22358 6.47847C9.2245 6.47802 9.22545 6.47754 9.22645 6.47703C9.22843 6.47603 9.23057 6.47493 9.23285 6.47373C9.23739 6.47136 9.24261 6.46855 9.24836 6.46533C9.25962 6.45902 9.27415 6.45043 9.29049 6.43956C9.31722 6.42179 9.37461 6.38123 9.4278 6.31496C9.47846 6.25186 9.57796 6.097 9.5398 5.88382C9.50176 5.67132 9.3548 5.55708 9.27669 5.50979C9.1346 5.42376 8.95239 5.39368 8.79383 5.37609C8.60937 5.35563 8.35375 5.34375 8 5.34375V6.34375C8.33656 6.34375 8.5511 6.3553 8.68358 6.37C8.84195 6.38757 8.82344 6.40437 8.75877 6.36521C8.71937 6.34136 8.58955 6.25055 8.55545 6.06002C8.52122 5.86882 8.61145 5.73447 8.64799 5.68895C8.68708 5.64026 8.72551 5.61434 8.73682 5.60682C8.74546 5.60108 8.75315 5.59652 8.75951 5.59296C8.76281 5.59111 8.76606 5.58936 8.76925 5.58769C8.77085 5.58685 8.77247 5.58602 8.77409 5.58519C8.77491 5.58478 8.77573 5.58437 8.77655 5.58396C8.77696 5.58375 8.77738 5.58354 8.77779 5.58334C8.778 5.58324 8.77832 5.58308 8.77842 5.58303C8.77873 5.58287 8.77905 5.58272 9 6.03125ZM8 5.34375C7.40666 5.34375 6.82664 5.5197 6.33329 5.84934L6.88886 6.68081C7.21776 6.46105 7.60444 6.34375 8 6.34375V5.34375ZM6.33329 5.84934C5.83994 6.17898 5.45542 6.64752 5.22836 7.1957L6.15224 7.57838C6.30362 7.21293 6.55996 6.90057 6.88886 6.68081L6.33329 5.84934ZM5.22836 7.1957C5.0013 7.74388 4.94189 8.34707 5.05764 8.92902L6.03843 8.73393C5.96126 8.34597 6.00086 7.94383 6.15224 7.57838L5.22836 7.1957ZM5.05764 8.92902C5.1734 9.51096 5.45912 10.0455 5.87868 10.4651L6.58579 9.75796C6.30608 9.47825 6.1156 9.12189 6.03843 8.73393L5.05764 8.92902ZM5.87868 10.4651C6.29824 10.8846 6.83278 11.1703 7.41473 11.2861L7.60982 10.3053C7.22186 10.2281 6.86549 10.0377 6.58579 9.75796L5.87868 10.4651ZM7.41473 11.2861C7.99667 11.4019 8.59987 11.3424 9.14805 11.1154L8.76537 10.1915C8.39991 10.3429 7.99778 10.3825 7.60982 10.3053L7.41473 11.2861ZM9.14805 11.1154C9.69623 10.8883 10.1648 10.5038 10.4944 10.0105L9.66294 9.45489C9.44318 9.78378 9.13082 10.0401 8.76537 10.1915L9.14805 11.1154ZM10.4944 10.0105C10.8241 9.51711 11 8.93709 11 8.34375H10C10 8.73931 9.8827 9.12599 9.66294 9.45489L10.4944 10.0105ZM7.64645 5.0098L8.89645 6.2598L9.60355 5.5527L8.35355 4.3027L7.64645 5.0098ZM8.89645 5.5527L7.64645 6.8027L8.35355 7.5098L9.60355 6.2598L8.89645 5.5527ZM8 1.5C4.41136 1.5 1.5 4.41136 1.5 8H2.5C2.5 4.96364 4.96364 2.5 8 2.5V1.5ZM1.5 8C1.5 11.5886 4.41136 14.5 8 14.5V13.5C4.96364 13.5 2.5 11.0364 2.5 8H1.5ZM8 14.5C11.5886 14.5 14.5 11.5886 14.5 8H13.5C13.5 11.0364 11.0364 13.5 8 13.5V14.5ZM14.5 8C14.5 4.41136 11.5886 1.5 8 1.5V2.5C11.0364 2.5 13.5 4.96364 13.5 8H14.5Z"
        fill="#5326EC"
      />
    </svg>
  );
};