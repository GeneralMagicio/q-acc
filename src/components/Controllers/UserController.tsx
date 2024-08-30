'use client';

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import {
  fetchGivethUserInfo,
  checkUserIsWhiteListed,
} from '../../services/user.service';
import { CompleteProfileModal } from '../Modals/CompleteProfileModal';
import { SignModal } from '../Modals/SignModal';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import Routes from '@/lib/constants/Routes';
import { getLocalStorageToken } from '@/helpers/generateJWT';
import { IUser } from '@/types/user.type';
import { useFetchUser } from '@/hooks/useFetchUser';

export const UserController = () => {
  const [showCompleteProfileModal, setShowCompleteProfileModal] =
    useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const { address } = useAccount();
  const route = useRouter();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { data: user, refetch } = useFetchUser();

  const onSign = async (newUser: IUser) => {
    console.log('Signed');
    setShowSignModal(false);
    if (!newUser?.isSignedIn) return;

    // Save user info to QAcc if user is Giveth user
    if (address && !newUser?.fullName && !newUser?.email) {
      console.log('****4');
      const givethData = await fetchGivethUserInfo(address);
      console.log('****5');
      if (givethData && (givethData.name || givethData.email)) {
        console.log('****6');
        const _user = {
          id: givethData.id,
          email: givethData.email || undefined,
          fullName: givethData.name,
          avatar: givethData.avatar,
          newUser: true,
        };
        console.log('****7');
        await updateUser(_user);
      }
    }
    console.log('****8');

    // Check user profile completion
    if (!newUser?.email || !newUser?.fullName) {
      console.log('****9');

      setShowCompleteProfileModal(true);
      return;
    }

    console.log('****10');

    // Check if user is whitelisted
    const isUserWhiteListed = await checkUserIsWhiteListed(address);
    console.log('****11');

    if (isUserWhiteListed) {
      console.log('****12');

      const isUserCreatedProject = false;
      if (!isUserCreatedProject) {
        console.log('****13');

        route.push(Routes.Create); //TODO: should we redirect or not
      }
    }
  };

  useEffect(() => {
    if (!address) return;
    const localStorageToken = getLocalStorageToken(address);
    console.log('****a1');

    if (localStorageToken) {
      console.log('****a2');
      refetch();
      return;
    }
    // Show sign modal if token is not present in local storage
    localStorage.removeItem('token');
    setShowSignModal(true);
  }, [address, refetch]);

  useEffect(() => {
    const handleShowSignInModal = () => {
      setShowSignModal(true);
    };

    window.addEventListener('showSignInModal', handleShowSignInModal);

    return () => {
      window.removeEventListener('showSignInModal', handleShowSignInModal);
    };
  }, []);

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
