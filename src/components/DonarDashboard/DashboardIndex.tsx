'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardHeader from './DashboardHeader';
import DashboardTabs, { EDashboardPageTabs } from './DashboardTabs';

import DonarSupports from './DonarSupports';
import MyProjects from './MyProjects';
import { MyVerifications } from './MyVerifications';
import { useAddressWhitelist } from '@/hooks/useAddressWhitelist';
import { DonorProvider } from '@/context/dashboard.context';

const DashboardIndex = () => {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab');

  const getTabIndex = (tab: string | null, isWhitelisted: boolean) => {
    if (isWhitelisted) {
      switch (tab) {
        case EDashboardPageTabs.CONTRIBUTIONS:
          return 1;
        case EDashboardPageTabs.VERIFICATION:
          return 2;
        default:
          return 0;
      }
    } else {
      switch (tab) {
        case EDashboardPageTabs.CONTRIBUTIONS:
          return 0;
        case EDashboardPageTabs.VERIFICATION:
          return 1;
        default:
          return 0;
      }
    }
  };

  const { data: addrWhitelist } = useAddressWhitelist();
  const [activeTab, setActiveTab] = useState(() =>
    getTabIndex(initialTab, !!addrWhitelist),
  );

  useEffect(() => {
    setActiveTab(getTabIndex(searchParams.get('tab'), !!addrWhitelist));
  }, [searchParams, addrWhitelist]);
  useEffect(() => {
    if (addrWhitelist) {
      switch (searchParams.get('tab')) {
        case EDashboardPageTabs.CONTRIBUTIONS:
          setActiveTab(1);
          break;
        case EDashboardPageTabs.VERIFICATION:
          setActiveTab(2);
          break;
        default:
          setActiveTab(0);
          break;
      }
    } else {
      switch (searchParams.get('tab')) {
        case EDashboardPageTabs.CONTRIBUTIONS:
          setActiveTab(0);
          break;
        case EDashboardPageTabs.VERIFICATION:
          setActiveTab(1);
          break;
        default:
          setActiveTab(0);
          break;
      }
    }
  }, [searchParams.get('tab')]);
  return (
    <div>
      <DonorProvider>
        <DashboardHeader />
        <DashboardTabs activeTab={activeTab} slug={'slug'} />

        {addrWhitelist ? (
          <>
            {activeTab === 0 && <MyProjects />}
            {activeTab === 1 && <DonarSupports />}
            {activeTab === 2 && <MyVerifications />}
          </>
        ) : (
          <>
            {activeTab === 0 && <DonarSupports />}
            {activeTab == 1 && <MyVerifications />}
          </>
        )}
      </DonorProvider>
    </div>
  );
};

export default DashboardIndex;
