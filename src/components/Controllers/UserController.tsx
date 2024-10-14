'use client';

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { redirect, useRouter } from 'next/navigation';
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
import { isProductReleased } from '@/config/configuration';

export const UserController = () => {
  const [showCompleteProfileModal, setShowCompleteProfileModal] =
    useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const { address } = useAccount();
  const route = useRouter();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { refetch } = useFetchUser();

  const onSign = async (newUser: IUser) => {
    console.log('Signed', newUser);
    setShowSignModal(false);
    if (!newUser?.isSignedIn) return;

    // Save user info to QAcc if user is Giveth user
    if (address && !newUser?.fullName && !newUser?.email) {
      const givethData = await fetchGivethUserInfo(address);
      console.log('Giveth', givethData);

      if (givethData && (givethData.name || givethData.email)) {
        const _user = {
          id: givethData.id,
          email: givethData.email || undefined,
          fullName: givethData.name,
          avatar: givethData.avatar,
          newUser: true,
        };

        await updateUser(_user);
        route.push(Routes.VerifyPrivado);
        console.log('saved');
      } else {
        console.log('No user in giveth data');
        setShowCompleteProfileModal(true);
      }
    }

    if (!isProductReleased) {
      return redirect(Routes.KycLanding);
    }

    // Check if user is whitelisted
    const isUserWhiteListed = await checkUserIsWhiteListed(address);

    if (isUserWhiteListed) {
      const isUserCreatedProject = false;
      if (!isUserCreatedProject) {
        route.push(Routes.Create); //TODO: should we redirect or not
      }
    }
  };

  useEffect(() => {
    if (!address) return;
    const localStorageToken = getLocalStorageToken(address);

    if (localStorageToken) {
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
