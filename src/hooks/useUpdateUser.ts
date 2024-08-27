import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { requestGraphQL } from "@/helpers/request";
import { UPDATE_USER } from "@/queries/user.query";
import { INewUer } from "@/types/user.type";

export const useUpdateUser = () => {
  const { address } = useAccount();
  return useMutation({
    mutationKey: ["user", address],
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
  });
};
