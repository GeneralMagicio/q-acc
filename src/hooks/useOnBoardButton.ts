import { useAccount } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { usePrivado } from '@/hooks/usePrivado';
import { useFetchUser } from '@/hooks/useFetchUser';
import config from '@/config/configuration';
import Routes from '@/lib/constants/Routes';

export const useOnBoardButton = () => {
  const { address } = useAccount();
  const { isVerified: isVerifiedByPrivado } = usePrivado();
  const { data: user } = useFetchUser();
  const { open } = useAppKit();

  const analysisScore = user?.analysisScore || 0;
  const passportScore = user?.passportScore || 0;
  const isVerifiedByGP =
    analysisScore >= config.GP_ANALYSIS_SCORE_THRESHOLD ||
    passportScore >= config.GP_SCORER_SCORE_THRESHOLD;
  const isVerified = isVerifiedByPrivado || isVerifiedByGP;

  const getButtonState = () => {
    if (!address) {
      return {
        label: 'Get Started',
        onClick: () => open(),
        href: null,
      };
    }

    if (isVerified) {
      return {
        label: 'View Projects',
        href: Routes.Projects,
      };
    }

    return {
      label: 'Get Started',
      href: user?.fullName ? Routes.VerifyPrivado : Routes.CreateProfile,
    };
  };

  return getButtonState();
};
