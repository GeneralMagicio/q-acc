'use client';
import React from 'react';
import { redirect } from 'next/navigation';
import { isProductReleased } from '@/config/configuration';

import Routes from '@/lib/constants/Routes';
import { LeaderBoardView } from '@/components/LeaderBoard/LeaderBoardView';

const LeaderBoardPage = () => {
  return isProductReleased ? <LeaderBoardView /> : redirect(Routes.KycLanding);
};

export default LeaderBoardPage;
