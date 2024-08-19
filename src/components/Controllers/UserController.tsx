"use client";

import { checkWhiteList } from "@/services/check-white-list";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { HoldModal } from "../HoldModal";
import Routes from "@/lib/constants/Routes";

export const UserController = () => {
  const [showHoldModal, setShowHoldModal] = useState(false);
  const { address, isConnecting, chain } = useAccount();
  const router = useRouter();

  useEffect(() => {
    async function checkAddress(address: Address) {
      const isWhiteListed = await checkWhiteList(address);
      const isProjectCreated = false; //TODO: check if project is created
      if (isWhiteListed) {
        setShowHoldModal(false);
        // redirect whitelisted users who didn't create project to creator page
        if (isProjectCreated) {
          router.push(Routes.Creator); // TODO: Update the route
        } else {
          router.push(Routes.Creator);
        }
      } else if (!isWhiteListed) {
        setShowHoldModal(true);
      }
    }
    if (!address) {
      setShowHoldModal(false);
      return;
    }
    checkAddress(address);
  }, [address, router]);

  return showHoldModal ? (
    <HoldModal isOpen={showHoldModal} onClose={() => setShowHoldModal(false)} />
  ) : null;
};
