import { FC, type HTMLAttributes } from 'react';
import { IconCheckCircleFilled } from './Icons/IconCheckCircleFilled';

export enum EligibilityBadgeStatus {
  ELIGIBLE,
  NOT_ELIGIBLE,
}

interface EligibilityBadgeProps {
  status: EligibilityBadgeStatus;
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

const data: {
  [key in EligibilityBadgeStatus]: {
    label: string;
    color: string;
    bgColor: string;
    icon?: React.ReactNode;
  };
} = {
  [EligibilityBadgeStatus.ELIGIBLE]: {
    label: 'You’re all set',
    color: 'text-white',
    bgColor: 'bg-[#37B4A9]',
    icon: <IconCheckCircleFilled />,
  },
  [EligibilityBadgeStatus.NOT_ELIGIBLE]: {
    label: 'Not Eligible',
    color: 'text-amber-500',
    bgColor: 'bg-orange-100',
  },
};

export const EligibilityBadge: FC<EligibilityBadgeProps> = ({
  status,
  className,
}) => {
  return (
    <div
      className={`flex gap-1 items-center justify-center rounded-full px-6 py-2 text-xs font-semibold ${data[status].color} ${data[status].bgColor} ${className}`}
    >
      {data[status].label}
      {'icon' in data[status] && data[status].icon}
    </div>
  );
};
