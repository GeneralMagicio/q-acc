"use client";

import { checkWhiteList } from "@/services/check-white-list";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";

export const UserController = () => {
  const { address, isConnecting, chain } = useAccount();
  const router = useRouter();

  useEffect(() => {
    async function checkAddress(address: Address) {
      const isWhiteListed = await checkWhiteList(address);
      const isProjectCreated = false; //TODO: check if project is created
      if (isWhiteListed && !isProjectCreated) {
        // redirect whitelisted users who didn't create project to creator page
        router.push("/creator");
      }
    }
    if (!address) return;
    checkAddress(address);
  }, [address, router]);

  return null;
};
