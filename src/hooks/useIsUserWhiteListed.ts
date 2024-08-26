import { checkUserIsWhiteListed } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export const useIsUserWhiteListed = () => {
  const { address } = useAccount();
  return useQuery({
    queryKey: ["isWhiteListed", address],
    queryFn: async () => {
      checkUserIsWhiteListed(address);
    },
    enabled: !!address,
  });
};
