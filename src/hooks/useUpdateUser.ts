import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { requestGraphQL } from '@/helpers/request';
import { UPDATE_USER } from '@/queries/user.query';
import { INewUer } from '@/types/user.type';

export const useUpdateUser = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['user', address], // Base key with address
    mutationFn: async (user: INewUer) => {
      return await requestGraphQL(
        UPDATE_USER,
        {
          email: user.email,
          fullName: user.fullName,
          avatar: user.avatar,
          newUser: true,
        },
        {
          auth: true,
        },
      );
    },
    onMutate: async variables => {
      // Optionally cancel outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['user', address] });

      // Snapshot the previous value
      const previousUser = queryClient.getQueryData(['user', address]);

      // Optimistically update to the new value
      queryClient.setQueryData(['user', address], (old: Object) => ({
        ...old,
        ...variables,
      }));

      // Return a context object with the snapshotted value
      return { previousUser };
    },
    onError: (err, variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['user', address], context.previousUser);
      }
      console.error('Failed to update user', err);
    },
    onSuccess: (data, variables, context) => {
      console.log('User updated successfully', data, variables, context);
    },
    onSettled: () => {
      // Always refetch after error or success to sync state
      queryClient.invalidateQueries({ queryKey: ['user', address] });
    },
  });
};
