'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardHeader from './DashboardHeader';
import DashboardTabs from './DashboardTabs';

import DonarSupports from './DonarSupports';
import MyProjects from './MyProjects';

export enum EDashboardPageTabs {
  PROJECTS = 'projects',
  SUPPORTS = 'supports',
}
const DashboardIndex = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    switch (searchParams.get('tab')) {
      case EDashboardPageTabs.SUPPORTS:
        setActiveTab(1);
        break;
      default:
        setActiveTab(0);
        break;
    }
  }, [searchParams.get('tab')]);
  return (
    <div>
      <DashboardHeader />
      <DashboardTabs activeTab={activeTab} slug={'slug'} />

      {activeTab === 0 && <MyProjects />}
      {activeTab === 1 && <DonarSupports />}
    </div>
  );
};

export default DashboardIndex;
