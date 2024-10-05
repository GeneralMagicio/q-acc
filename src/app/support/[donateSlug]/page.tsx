'use client';
import { useParams } from 'next/navigation';
import React from 'react';
import DonateIndex from '@/components/DonatePage/DonateIndex';
import { DonateProvider } from '@/context/donation.context';

const DonateRoute = () => {
  const params = useParams();
  const slug = Array.isArray(params.donateSlug)
    ? params.donateSlug[0]
    : params.donateSlug;
  return (
    <DonateProvider slug={slug}>
      <DonateIndex />
    </DonateProvider>
  );
};

export default DonateRoute;
