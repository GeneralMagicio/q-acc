import { type HTMLAttributes } from 'react';

export const getBadgeClasses = (
  isVerified: boolean,
): HTMLAttributes<HTMLDivElement>['className'] =>
  `flex gap-1 ${isVerified ? 'bg-teal-500 text-white' : 'bg-white text-gray-800 border-red-500 border-[1px]'} py-1 px-2 rounded-lg`;
