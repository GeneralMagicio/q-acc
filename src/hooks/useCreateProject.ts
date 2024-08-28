import { useMutation } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { IProjectCreation } from '@/types/project.type';
import { CREATE_PROJECT } from '@/queries/project.query';
import { requestGraphQL } from '@/helpers/request';

export const useCreateProject = (project: IProjectCreation) => {
  const { address } = useAccount();
  return useMutation({
    mutationKey: ['project', 'create', address, project.title],
    mutationFn: async (project: IProjectCreation) => {
      return await requestGraphQL(
        CREATE_PROJECT,
        {
          project,
        },
        {
          auth: true,
        },
      );
    },
  });
};
