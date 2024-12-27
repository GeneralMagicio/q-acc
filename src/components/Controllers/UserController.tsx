'use client';

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { redirect, useRouter } from 'next/navigation';
import { fetchGivethUserInfo } from '@/services/user.service';
import { CompleteProfileModal } from '../Modals/CompleteProfileModal';
import { SignModal } from '../Modals/SignModal';
import { SanctionModal } from '../Modals/SanctionModal';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import Routes from '@/lib/constants/Routes';
import { getLocalStorageToken } from '@/helpers/generateJWT';
import { IUser } from '@/types/user.type';
import { useFetchUser } from '@/hooks/useFetchUser';
import { isProductReleased } from '@/config/configuration';
import { useAddressWhitelist } from '@/hooks/useAddressWhitelist';
import { useFetchSanctionStatus } from '@/hooks/useFetchSanctionStatus';
import { isContractAddress } from '@/helpers/token';

export const UserController = () => {
  const [showCompleteProfileModal, setShowCompleteProfileModal] =
    useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [showSanctionModal, setShowSanctionModal] = useState(false);
  const { address } = useAccount();
  const router = useRouter();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { refetch } = useFetchUser();
  const useWhitelist = useAddressWhitelist();
  const { data: isSanctioned } = useFetchSanctionStatus(address as string);

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
        router.push(Routes.VerifyPrivado);
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
    if (!!useWhitelist.data) {
      const isUserCreatedProject = true;
      if (!isUserCreatedProject) {
        router.push(Routes.Create); //TODO: should we redirect or not
      }
    }
  };

  useEffect(() => {
    if (!address) return;
    const handleAddressCheck = async () => {
      const localStorageToken = getLocalStorageToken(address);

      // If token exists in local storage, refetch and skip modal
      if (localStorageToken) {
        refetch();
        return;
      }

      // Remove stale token if any
      localStorage.removeItem('token');

      // Check if the address is a contract
      const isContract = await isContractAddress(address as string);
      setShowSignModal(!isContract);
    };

    handleAddressCheck();
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

  useEffect(() => {
    if (isSanctioned) {
      setShowSanctionModal(true);
    }
  }, [isSanctioned]);

  return showSanctionModal ? (
    <SanctionModal
      isOpen={showSanctionModal}
      onClose={() => setShowSanctionModal(false)}
    />
  ) : showSignModal ? (
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
