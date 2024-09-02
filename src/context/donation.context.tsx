import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchProjectBySlug } from '@/services/project.service';

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
