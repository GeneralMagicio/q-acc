import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchProjectBySlug } from '@/services/project.service';
import { fecthProjectDonationsById } from '@/services/donation.services';
import {
  calculateTotalDonations,
  calculateUniqueDonors,
} from '@/helpers/donation';

const ProjectContext = createContext<any>({
  projectData: undefined,
  teamMembers: [],
});
ProjectContext.displayName = 'ProjectContext';

export const ProjectProvider = ({
  children,
  slug,
}: {
  children: ReactNode;
  slug: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [projectData, setProjectData] = useState<any | null>(null);
  const [totalDonationsCount, setTotalDonationsCount] = useState(0);
  const [teamMembers, setTeamMembers] = useState<any>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [uniqueDonars, setUniqueDonars] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

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
          setTotalAmount(calculateTotalDonations(donations));
        }
      };
      fetchProjectDonations();
    }
  }, [slug, projectData]);

  return (
    <ProjectContext.Provider
      value={{
        projectData,
        totalDonationsCount,
        uniqueDonars,
        totalAmount,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export function useProjectContext() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('Project context not found!');
  }

  return context;
}
