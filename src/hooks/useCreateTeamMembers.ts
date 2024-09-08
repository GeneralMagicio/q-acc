import { useMutation } from '@tanstack/react-query';
import { CREATE_TEAM_MEMBERS } from '@/queries/project.query';
import { requestGraphQL } from '@/helpers/request';
import { TeamMember } from '@/components/Create/CreateTeamForm';

interface IUpdateProjectInput {
  teamMembers: TeamMember[];
}
interface UpdateTeamMembersVariables {
  projectId: number;
  teamMembers: TeamMember[];
}
export const useUpdateTeamMembers = () => {
  return useMutation({
    mutationKey: ['project', 'updateTeamMembers'],
    mutationFn: async ({
      projectId,
      teamMembers,
    }: UpdateTeamMembersVariables) => {
      // Construct the new project data input
      const newProjectData: IUpdateProjectInput = {
        teamMembers,
      };

      return await requestGraphQL(
        CREATE_TEAM_MEMBERS,
        {
          projectId,
          newProjectData,
        },
        {
          auth: true,
        },
      );
    },
  });
};
