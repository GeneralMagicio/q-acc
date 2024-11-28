'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardHeader from './DashboardHeader';
import DashboardTabs, { EDashboardPageTabs } from './DashboardTabs';

import DonarSupports from './DonarSupports';
import MyProjects from './MyProjects';
import DashboardPrivado from './DashboardPrivado';
import { MyVerifications } from './MyVerifications';

const DashboardIndex = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
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
  }, [searchParams.get('tab')]);
  return (
    <div>
      <DashboardHeader />
      <DashboardPrivado />
      <DashboardTabs activeTab={activeTab} slug={'slug'} />

      {activeTab === 0 && <MyProjects />}
      {activeTab === 1 && <DonarSupports />}
      {activeTab === 2 && <MyVerifications />}
    </div>
  );
};

export default DashboardIndex;
