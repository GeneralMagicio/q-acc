import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchProjectBySlug } from '@/services/project.service';
import { fecthProjectDonationsById } from '@/services/donation.services';
import { calculateUniqueDonors } from '@/helpers/donation';

const DonateContext = createContext<any>({
  projectData: undefined,
});
DonateContext.displayName = 'DonateContext';

export const DonateProvider = ({
  children,
  slug,
}: {
  children: ReactNode;
  slug: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [projectData, setProjectData] = useState<any | null>(null);
  const [teamMembers, setTeamMembers] = useState<any>([]);
  const [totalDonationsCount, setTotalDonationsCount] = useState(0);
  const [donations, setDonations] = useState<any[]>([]);
  const [uniqueDonars, setUniqueDonars] = useState<number>(0);

  useEffect(() => {
    if (slug) {
      const fetchProject = async () => {
        try {
          const data = await fetchProjectBySlug(slug);

          setProjectData(data);
          setTeamMembers(data.projectData.teamMembers);
          console.log('DATA', teamMembers);
          setIsLoading(data);
        } catch (err) {}
      };

      fetchProject();
    }
  }, [slug]);

  useEffect(() => {
    if (projectData?.id) {
      const fetchProjectDonations = async () => {
        const data = await fecthProjectDonationsById(
          parseInt(projectData?.id),
          1000,
          0,
        );

        if (data) {
          const { donations, totalCount } = data;
          setDonations(donations);
          setTotalDonationsCount(totalCount);
          setUniqueDonars(calculateUniqueDonors(donations));
        }
      };
      fetchProjectDonations();
    }
  }, [slug, projectData]);

  return (
    <DonateContext.Provider
      value={{
        projectData,
      }}
    >
      {children}
    </DonateContext.Provider>
  );
};

export function useDonateContext() {
  const context = useContext(DonateContext);

  if (!context) {
    throw new Error('Donate Data context not found!');
  }

  return context;
}
