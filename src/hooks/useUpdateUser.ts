import { requestGraphQL } from "@/helpers/request";
import { UPDATE_USER } from "@/queries/user.query";
import { INewUer } from "@/types/user.type";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export const useUpdateUser = () => {
  const { address } = useAccount();
  return useMutation({
    mutationKey: ["user", address],
    mutationFn: async (user: INewUer) => {
      console.log("Mutation function called");
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
        }
      );
    },
  });
};
