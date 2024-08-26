"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import {
  fetchUserInfo,
  fetchGivethUserInfo,
} from "../../services/user.service";
import { useSignUser } from "@/hooks/useSignUser";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { CompleteProfileModal } from "../Modals/CompleteProfileModal";

export const UserController = () => {
  const [showCompleteProfileModal, setShowCompleteProfileModal] =
    useState(false);
  const { address } = useAccount();
  const isGivethUser = useRef(false);

  // const router = useRouter();

  // useEffect(() => {
  //   if (!address) {
  //     setShowHoldModal(false);
  //     return;
  //   }

  //   async function checkAddressInWhiteList(address: Address) {
  //     const isWhiteListed = await checkWhiteList(address);
  //     const isProjectCreated = false; //TODO: check if project is created
  //     if (isWhiteListed) {
  //       setShowHoldModal(false);
  //       // redirect whitelisted users who didn't create project to create page
  //       if (isProjectCreated) {
  //         router.push(Routes.Create); // TODO: Update the route
  //       } else {
  //         router.push(Routes.Create);
  //       }
  //     } else if (!isWhiteListed) {
  //       setShowHoldModal(true);
  //     }
  //   }
  //   checkAddressInWhiteList(address);
  // }, [address, router]);

  const { data: user } = useQuery({
    queryKey: ["user", address],
    queryFn: async () => {
      if (!address) return;
      let data = await fetchUserInfo(address);
      if (!data) {
        const givethData = await fetchGivethUserInfo(address);
        if (givethData && givethData.name) {
          isGivethUser.current = true;
          data = {
            id: givethData.id,
            email: givethData.email,
            fullName: givethData.name,
            avatar: givethData.avatar,
          };
        }
      }
      if (!data) {
        setShowCompleteProfileModal(true);
      }
      return data;
    },
    enabled: !!address,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: token } = useSignUser();
  const { mutateAsync: updateUser } = useUpdateUser();

  useEffect(() => {
    if (!isGivethUser.current || !token || !user) return;
    isGivethUser.current = false;
    const _user = {
      email: user.email || undefined,
      fullName: user.fullName,
      avatar: user.avatar,
      newUser: true,
    };
    console.log("_user", _user);
    updateUser(_user);
  }, [token, updateUser, user]);

  return showCompleteProfileModal ? (
    <CompleteProfileModal
      isOpen={showCompleteProfileModal}
      onClose={() => setShowCompleteProfileModal(false)}
    />
  ) : null;
};
