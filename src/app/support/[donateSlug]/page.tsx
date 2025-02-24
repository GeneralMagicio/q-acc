'use client';
import { redirect, useParams } from 'next/navigation';
import React from 'react';
import DonateIndex from '@/components/DonatePage/DonateIndex';
import { DonateProvider } from '@/context/donation.context';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';

const DonateRoute = () => {
  const params = useParams();
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();
  const isRoundActive = !!activeRoundDetails;
  const slug = Array.isArray(params.donateSlug)
    ? params.donateSlug[0]
    : params.donateSlug;
  return isProductReleased ? (
    isRoundActive ? (
      <DonateProvider slug={slug}>
        <DonateIndex />
      </DonateProvider>
    ) : (
      redirect(Routes.Home)
    )
  ) : (
    redirect(Routes.KycLanding)
  );
};

export default DonateRoute;
