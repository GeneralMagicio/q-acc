"use client";

import { checkWhiteList } from "@/services/check-white-list";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { HoldModal } from "../HoldModal";
import Routes from "@/lib/constants/Routes";
import { signWithEVM } from "@/helpers/generateJWT";

export const UserController = () => {
  const [showHoldModal, setShowHoldModal] = useState(false);
  const { address, isConnecting, chain, connector } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!address) {
      setShowHoldModal(false);
      return;
    }

    async function checkAddressInWhiteList(address: Address) {
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
    checkAddressInWhiteList(address);
  }, [address, router]);

  useEffect(() => {
    if (!address || !connector || !chain?.id) return;
    async function signUser() {
      if (!localStorage.getItem("token")) {
        try {
          const token = await signWithEVM(address, chain?.id, connector);
          localStorage.setItem("token", token.jwt);
        } catch (error) {
          console.log("error", error);
        }
      }
    }
    signUser();
  }, [address, chain?.id, connector]);

  return showHoldModal ? (
    <HoldModal isOpen={showHoldModal} onClose={() => setShowHoldModal(false)} />
  ) : null;
};
