import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Routes from '@/lib/constants/Routes';
import { fetchUserDonationsCount } from '@/services/donation.services';
import { useFetchUser } from '@/hooks/useFetchUser';
import { useFetchProjectByUserId } from '@/hooks/useFetchProjectByUserId';
import { useAddressWhitelist } from '@/hooks/useAddressWhitelist';

interface IDashboardTabs {
  activeTab: number;
  slug: string;
}
export enum EDashboardPageTabs {
  PROJECTS = 'projects',
  CONTRIBUTIONS = 'contributions',
  VERIFICATION = 'verification',
}

const DashboardTabs = (props: IDashboardTabs) => {
  const { data: addrWhitelist } = useAddressWhitelist();
  const [donationCount, setDonationCount] = useState<number>(0);
  const { activeTab } = props;
  const { data: userData } = useFetchUser(true);
  const { data: projectData } = useFetchProjectByUserId(
    parseInt(userData?.id ?? ''),
  );
  const badgeCount = (count?: number) => {
    return count || null;
  };
  const { data: user } = useFetchUser();

  const userId = user?.id;
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        return;
      }
      try {
        const res = await fetchUserDonationsCount(parseInt(userId));
        if (res) {
          setDonationCount(res.totalCount);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  });

  const tabsArray = [
    ...(!addrWhitelist
      ? []
      : [
          {
            title: 'My Projects',
            badge: !addrWhitelist || !projectData ? 0 : 1,
            query: EDashboardPageTabs.PROJECTS,
          },
        ]),

    {
      title: 'My Tokens',
      badge: donationCount,
      query: EDashboardPageTabs.CONTRIBUTIONS,
    },

    {
      title: 'My Verifications',
      badge: 0,
      query: EDashboardPageTabs.VERIFICATION,
    },
  ];
  return (
    <div>
      <div className='w-full py-4 h-min my-8 overflow-x-auto'>
        <div className='flex container w-full   gap-6  justify-start'>
          {tabsArray.map((i, index) => (
            <Link
              key={i.title}
              href={`${Routes.DashBoard}/${i.query ? `?tab=${i.query}` : ''}`}
              scroll={false}
            >
              <div
                className={`flex px-6 py-[9px] rounded-full font-redHatText cursor-pointer text-sm md:text-base font-medium gap-1 items-center${
                  activeTab === index ? '  bg-white shadow-tabShadow' : ''
                }`}
              >
                <span
                  className={`${
                    activeTab === index ? ' text-[#1D1E1F]' : 'text-[#82899A]'
                  }`}
                >
                  {i.title}
                </span>
                {badgeCount(i.badge) && (
                  <span
                    className={`inline-flex items-center  text-white text-xs  min-w-6 min-h-6  font-redHatText  font-medium rounded-full   justify-center ${
                      activeTab === index ? 'bg-[#1D1E1F]' : 'bg-[#82899A]'
                    }`}
                  >
                    {i.badge}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTabs;
