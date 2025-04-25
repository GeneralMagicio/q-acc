import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  fetchProjectDonors,
  fetchUserDonations,
} from '@/services/donation.services';
import { useFetchUser } from '@/hooks/useFetchUser';
import {
  calculateTotalContributions,
  calculateUniqueDonors,
  groupDonationsByProject,
} from '@/helpers/donation';

interface ProjectDonorData {
  uniqueDonors: number;
  totalContributions: number;
  donationCount: number;
  userProjectContributionSum: number;
}

interface DonorContextType {
  donationsGroupedByProject: Record<number, any>;
  projectDonorData: Record<number, ProjectDonorData>;
  totalCount: number;
  loading: boolean;
  error: string | null;
}

const DonorContext = createContext<DonorContextType | undefined>(undefined);

export const DonorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [donations, setDonations] = useState<any[]>([]);
  const [projectDonorData, setProjectDonorData] = useState<
    Record<number, ProjectDonorData>
  >({});
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { data: user } = useFetchUser();
  const userId = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const res = await fetchUserDonations(parseInt(userId));
        if (res) {
          setDonations(res.donations);
          setTotalCount(res.totalCount);
        }
      } catch (err) {
        setError('Failed to fetch donations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const donationsGroupedByProject = useMemo(() => {
    return groupDonationsByProject(donations);
  }, [donations]);

  useEffect(() => {
    const fetchProjectDonations = async () => {
      const donorData: Record<number, ProjectDonorData> = {};

      const projectIds = Object.keys(donationsGroupedByProject).map(Number);

      for (const projectId of projectIds) {
        try {
          const donationsByProjectId = await fetchProjectDonors(
            projectId,
            1000,
          );
          if (donationsByProjectId?.donations) {
            const userDonation = donationsByProjectId.donations.filter(
              (donation: any) => donation.user.id === user?.id,
            );

            donorData[projectId] = {
              uniqueDonors: calculateUniqueDonors(
                donationsByProjectId.donations,
              ),
              totalContributions: calculateTotalContributions(
                donationsByProjectId.donations,
              ),
              donationCount: userDonation.length,
              userProjectContributionSum:
                calculateTotalContributions(userDonation),
            };
          }
        } catch (err) {
          setError('Failed to fetch project donations');
          console.error(err);
        }
      }

      setProjectDonorData(donorData);
    };

    if (donations.length > 0) {
      fetchProjectDonations();
    }
  }, [donations, donationsGroupedByProject]);

  return (
    <DonorContext.Provider
      value={{
        donationsGroupedByProject,
        projectDonorData,
        totalCount,
        loading,
        error,
      }}
    >
      {children}
    </DonorContext.Provider>
  );
};

export const useDonorContext = () => {
  const context = useContext(DonorContext);
  if (!context) {
    throw new Error('useDonorContext must be used within a DonorProvider');
  }
  return context;
};
