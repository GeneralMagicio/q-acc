import React from 'react';

import { usePrivado } from '@/hooks/usePrivado';
import { IconPrivado } from '../Icons/IconPrivado';

export const PrivadoVerificationBadge = () => {
  const { isVerified } = usePrivado();

  return (
    <div
      className={`flex gap-1 ${isVerified ? 'bg-teal-500' : 'bg-amber-500'} text-white py-1 px-2 rounded-lg`}
    >
      <IconPrivado size={24} />
      <span>Privado zkID {isVerified ? 'Verified' : 'Not Verified'}</span>
    </div>
  );
};
