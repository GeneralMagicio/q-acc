import React from 'react';
import { useRouter } from 'next/router';
import { usePrivado } from '@/hooks/usePrivado';
import { IconPrivado } from '../Icons/IconPrivado';

export const PrivadoVerificationBadge = () => {
  const { isVerified } = usePrivado();
  const router = useRouter();

  const handleClick = () => {
    router.push(`${router.pathname}?tab=verification`);
  };

  return (
    <div
      className={`flex gap-1 ${isVerified ? 'bg-teal-500' : 'bg-amber-500'} text-white py-1 px-2 rounded-lg`}
    >
      <IconPrivado size={24} />
      <span onClick={handleClick} className='cursor-pointer'>
        Privado zkID {isVerified ? 'Verified' : 'Not Verified'}
      </span>
    </div>
  );
};
