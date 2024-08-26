import { signWithEVM } from "@/helpers/generateJWT";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export const useSignUser = () => {
  const { address, chain, connector } = useAccount();
  return useQuery({
    queryKey: ["token", address],
    queryFn: async () => {
      // Check if token exists in localStorage
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        return storedToken;
      }

      if (!address || !chain?.id || !connector) return;

      // Token generation logic
      try {
        const newToken = await signWithEVM(address, chain?.id, connector);
        localStorage.setItem("token", JSON.stringify(newToken));
        return newToken;
      } catch (error) {
        console.log("Error generating token:", error);
      }
    },
    enabled: !!address && !!chain?.id && !!connector,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
