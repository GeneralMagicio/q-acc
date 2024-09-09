import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchProjectBySlug } from '@/services/project.service';
import { fecthProjectDonationsById } from '@/services/donation.services';

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
    if (!projectData?.id) return;
    const fetchProjectDonations = async () => {
      const data = await fecthProjectDonationsById(
        parseInt(projectData?.id),
        1,
        0,
      );

      if (data) {
        const { donations, totalCount } = data;
        setTotalDonationsCount(totalCount);
      }
    };

    fetchProjectDonations();
  });

  return (
    <ProjectContext.Provider
      value={{
        projectData,
        totalDonationsCount,
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
