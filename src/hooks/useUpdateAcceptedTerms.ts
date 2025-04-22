import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { requestGraphQL } from '@/helpers/request';
import { USER_ACCEPT_TERMS_MUTATION } from '@/queries/user.query';

export const useUpdateAcceptedTerms = (onSuccess?: () => void) => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['user', address, 'acceptedToS'],
    mutationFn: async (acceptedToS: boolean) => {
      return await requestGraphQL(
        USER_ACCEPT_TERMS_MUTATION,
        {
          acceptedToS,
        },
        {
          auth: true,
        },
      );
    },
    onMutate: async (newAcceptedTerms: boolean) => {
      await queryClient.cancelQueries({ queryKey: ['user', address] });

      const previousUser = queryClient.getQueryData(['user', address]);

      queryClient.setQueryData(['user', address], (old: any) => ({
        ...old,
        acceptedToS: newAcceptedTerms,
      }));

      return { previousUser };
    },
    onError: (err, variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['user', address], context.previousUser);
      }
      console.error('Failed to update acceptedToS', err);
    },
    onSuccess: (data, variables, context) => {
      console.log('acceptedToS updated successfully', data, variables, context);
      onSuccess && onSuccess();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user', address] });
    },
  });
};
