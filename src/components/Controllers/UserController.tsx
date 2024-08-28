'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  fetchUserInfo,
  fetchGivethUserInfo,
  checkUserIsWhiteListed,
} from '../../services/user.service';
import { CompleteProfileModal } from '../Modals/CompleteProfileModal';
import { SignModal } from '../Modals/SignModal';
import { getLocalStorageToken } from '@/helpers/generateJWT';
import { useUpdateUser } from '@/hooks/useUpdateUser';

export const UserController = () => {
  const [showCompleteProfileModal, setShowCompleteProfileModal] =
    useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const { address } = useAccount();
  const route = useRouter();
  const { mutateAsync: updateUser } = useUpdateUser();
  const {
    data: user,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ['user', address],
    queryFn: async () => {
      console.log('fetching user info');
      if (!address) return;
      let data = await fetchUserInfo(address);
      return data;
    },
    enabled: !!address,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const onSign = useCallback(async () => {
    console.log('Signed', user);
    setShowSignModal(false);

    // refetch user data after sign
    await refetch();
    if (!user?.isSignedIn) return;

    // Save user info to QAcc if user is Giveth user
    if (address && !user?.fullName && !user?.email) {
      const givethData = await fetchGivethUserInfo(address);
      if (givethData && (givethData.name || givethData.email)) {
        const _user = {
          id: givethData.id,
          email: givethData.email || undefined,
          fullName: givethData.name,
          avatar: givethData.avatar,
          newUser: true,
        };
        updateUser(_user);
      }
    }

    // Check user profile completion
    if (!user?.email || !user?.fullName) {
      setShowCompleteProfileModal(true);
    }

    // Check if user is whitelisted
    const isUserWhiteListed = await checkUserIsWhiteListed(address);
    if (isUserWhiteListed) {
      const isUserCreatedProject = false;
      if (!isUserCreatedProject) {
        // route.push(Routes.Create); //TODO: should we redirect or not
      }
    }
  }, [address, refetch, updateUser, user]);

  useEffect(() => {
    if (!address || !isFetched) return;
    const localStorageToken = getLocalStorageToken(address);

    // Show sign modal if token is not present in local storage
    if (localStorageToken && user?.isSignedIn) {
      onSign();
      return;
    }
    localStorage.removeItem('token');
    setShowSignModal(true);
  }, [address, isFetched, onSign, user?.isSignedIn]);

  return showSignModal ? (
    <SignModal
      isOpen={showSignModal}
      onClose={() => setShowSignModal(false)}
      onSign={onSign}
    />
  ) : showCompleteProfileModal ? (
    <CompleteProfileModal
      isOpen={showCompleteProfileModal}
      onClose={() => setShowCompleteProfileModal(false)}
    />
  ) : null;
};
