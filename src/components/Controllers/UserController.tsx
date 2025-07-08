'use client';

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter, usePathname } from 'next/navigation';
import { fetchGivethUserInfo } from '@/services/user.service';
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
import { useCheckSafeAccount } from '@/hooks/useCheckSafeAccount';
import { TermsConditionModal } from '../Modals/TermsConditionModal';

export const UserController = () => {
  const [showCompleteProfileModal, setShowCompleteProfileModal] =
    useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [showSanctionModal, setShowSanctionModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const { address } = useAccount();
  const router = useRouter();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { data: user, refetch } = useFetchUser();
  const useWhitelist = useAddressWhitelist();
  const { data: isSanctioned } = useFetchSanctionStatus(address as string);
  const { data: isSafeAccount } = useCheckSafeAccount();
  const pathname = usePathname();

  const onSign = async (newUser: IUser) => {
    console.log('Signed', newUser);
    setShowSignModal(false);
    if (!newUser?.isSignedIn) return;

    // Check if user has accepted ToS after signing in
    if (!user?.acceptedToS && pathname !== '/tos') {
      setShowTermsModal(true);
      return;
    }

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

        // Show terms modal if user hasn't accepted ToS
        if (!user?.acceptedToS) {
          setShowTermsModal(true);
        } else {
          // router.push(Routes.VerifyPrivado);
          // Verification no longer required - skip to projects
          router.push(Routes.Projects);
        }
        console.log('saved');
      } else {
        console.log('No user in giveth data');
        // setShowCompleteProfileModal(true);
        // Profile creation no longer required - skip to projects
        router.push(Routes.Projects);
      }
    }

    if (!isProductReleased) {
      // return redirect(Routes.KycLanding);
      // Verification no longer required - skip to projects
      router.push(Routes.Projects);
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
        await refetch();

        // Check if user has accepted ToS after refetching user data
        if (user && !user.acceptedToS && pathname !== '/tos') {
          setShowTermsModal(true);
        }
        return;
      }

      // Remove stale token if any
      localStorage.removeItem('token');

      setShowSignModal(!isSafeAccount);
    };

    handleAddressCheck();
  }, [address, refetch, isSafeAccount, user, pathname]);

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

  const handleTermsClose = () => {
    setShowTermsModal(false);
    // if (user?.fullName) {
    //   router.push(Routes.VerifyPrivado);
    // } else {
    //   setShowCompleteProfileModal(true);
    // }
    // Profile creation no longer required - skip to projects
    router.push(Routes.Projects);
  };

  // Determine which modal to show based on priority
  if (showSanctionModal) {
    return (
      <SanctionModal
        isOpen={showSanctionModal}
        onClose={() => setShowSanctionModal(false)}
      />
    );
  }

  if (showSignModal) {
    return (
      <SignModal
        isOpen={showSignModal}
        onClose={() => setShowSignModal(false)}
        onSign={onSign}
      />
    );
  }

  if (showTermsModal) {
    return (
      <TermsConditionModal isOpen={showTermsModal} onClose={handleTermsClose} />
    );
  }

  // Profile creation modal removed - no longer required
  // if (showCompleteProfileModal) {
  //   return (
  //     <TermsConditionModal
  //       isOpen={showCompleteProfileModal}
  //       onClose={() => setShowCompleteProfileModal(false)}
  //     />
  //   );
  // }

  return null;
};
