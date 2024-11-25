import { FC, type HTMLAttributes } from 'react';

export enum EligibilityBadgeStatus {
  ELIGIBLE,
  NOT_ELIGIBLE,
}

interface EligibilityBadgeProps {
  status: EligibilityBadgeStatus;
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

const data = {
  [EligibilityBadgeStatus.ELIGIBLE]: {
    label: 'You’re all set',
    color: 'text-white',
    bgColor: 'bg-green-500',
    icon: 'check-circle',
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
      className={`flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${data[status].color} ${data[status].bgColor} ${className}`}
    >
      {data[status].label}
    </div>
  );
};
