"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import {
  fetchUserInfo,
  fetchGivethUserInfo,
  checkUserIsWhiteListed,
} from "../../services/user.service";
import { useSignUser } from "@/hooks/useSignUser";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { CompleteProfileModal } from "../Modals/CompleteProfileModal";
import { useRouter } from "next/navigation";
import Routes from "@/lib/constants/Routes";

export const UserController = () => {
  const [showCompleteProfileModal, setShowCompleteProfileModal] =
    useState(false);
  const { address } = useAccount();
  const isGivethUser = useRef(false);
  const route = useRouter();

  const { data: user, isFetched } = useQuery({
    queryKey: ["user", address],
    queryFn: async () => {
      console.log("fetching user info");
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
      return data;
    },
    enabled: !!address,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  useEffect(() => {
    async function checkUser() {
      console.log("***", address, isFetched);
      if (!address || !isFetched) return;
      if (!user) {
        return setShowCompleteProfileModal(true);
      }
      console.log("address", address, user);
      const isUserWhiteListed = await checkUserIsWhiteListed(address);
      if (isUserWhiteListed) {
        const isUserCreatedProject = false;
        if (!isUserCreatedProject) {
          route.push(Routes.Create);
        }
      }
    }
    checkUser();
  }, [address, isFetched, route, user]);

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
