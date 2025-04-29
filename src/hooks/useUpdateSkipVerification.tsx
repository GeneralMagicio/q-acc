import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { requestGraphQL } from '@/helpers/request';
import { USER_SET_SKIP_VERIFICATION_MUTATION } from '@/queries/user.query';

export const useUpdateSkipVerification = (onSuccess?: () => void) => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['user', address, 'skipVerification'],
    mutationFn: async (skipVerification: boolean) => {
      return await requestGraphQL(
        USER_SET_SKIP_VERIFICATION_MUTATION,
        {
          skipVerification,
        },
        {
          auth: true,
        },
      );
    },
    onMutate: async (newSkipVerification: boolean) => {
      await queryClient.cancelQueries({ queryKey: ['user', address] });

      const previousUser = queryClient.getQueryData(['user', address]);

      queryClient.setQueryData(['user', address], (old: any) => ({
        ...old,
        skipVerification: newSkipVerification,
      }));

      return { previousUser };
    },
    onError: (err, variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['user', address], context.previousUser);
      }
      console.error('Failed to update skipVerification', err);
    },
    onSuccess: (data, variables, context) => {
      console.log(
        'skipVerification updated successfully',
        data,
        variables,
        context,
      );
      onSuccess && onSuccess();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user', address] });
    },
  });
};
