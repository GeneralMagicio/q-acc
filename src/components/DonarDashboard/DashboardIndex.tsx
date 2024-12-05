'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardHeader from './DashboardHeader';
import DashboardTabs, { EDashboardPageTabs } from './DashboardTabs';

import DonarSupports from './DonarSupports';
import MyProjects from './MyProjects';
import { MyVerifications } from './MyVerifications';
import { useAddressWhitelist } from '@/hooks/useAddressWhitelist';

const DashboardIndex = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const { data: addrWhitelist } = useAddressWhitelist();

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
    </div>
  );
};

export default DashboardIndex;
