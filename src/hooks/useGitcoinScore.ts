import { useState, useEffect } from 'react';
import { useFetchUser } from './useFetchUser';
import { useFetchUserGitcoinPassportScore } from './userFetchUserGitcoinPassportScore';
import config from '@/config/configuration';

export enum GitcoinVerificationStatus {
  NOT_CHECKED,
  ANALYSIS_PASS,
  SCORER_PASS,
  LOW_SCORE,
}

export const useGitcoinScore = () => {
  const [status, setStatus] = useState(GitcoinVerificationStatus.NOT_CHECKED);
  const { data: user, isLoading: isUserLoading, isSuccess } = useFetchUser();
  const { refetch: refetchScore, isFetching: isScoreFetching } =
    useFetchUserGitcoinPassportScore();

  useEffect(() => {
    if (!isSuccess) return;
    const _analysisScore = user?.analysisScore || 0;
    const _passportScore = user?.passportScore || 0;
    if (_analysisScore >= config.GP_ANALYSIS_SCORE_THRESHOLD) {
      setStatus(GitcoinVerificationStatus.ANALYSIS_PASS);
      return;
    } else if (_passportScore >= config.GP_SCORER_SCORE_THRESHOLD) {
      setStatus(GitcoinVerificationStatus.SCORER_PASS);
      return;
    }
  }, [isSuccess, user?.analysisScore, user?.passportScore]);

  const onCheckScore = async () => {
    const res = await refetchScore();
    const _analysisScore = res.data?.analysisScore || 0;
    const _passportScore = res.data?.passportScore || 0;
    if (_analysisScore >= config.GP_ANALYSIS_SCORE_THRESHOLD) {
      setStatus(GitcoinVerificationStatus.ANALYSIS_PASS);
      return;
    } else if (_passportScore >= config.GP_SCORER_SCORE_THRESHOLD) {
      setStatus(GitcoinVerificationStatus.SCORER_PASS);
      return;
    } else {
      setStatus(GitcoinVerificationStatus.LOW_SCORE);
    }
  };

  return { status, onCheckScore, isUserLoading, isScoreFetching };
};
