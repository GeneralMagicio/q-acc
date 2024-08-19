"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { fetchUserInfo } from "./service";
import type { Address } from "viem";
import Image from "next/image";
import type { FC, HTMLProps } from "react";

interface ConnectButtonProps extends HTMLProps<HTMLDivElement> {}

export const ConnectButton: FC<ConnectButtonProps> = ({
  className,
  ...props
}) => {
  const [user, setUser] = useState<IUser>();
  const { open } = useWeb3Modal();
  const { address, isConnecting, chain } = useAccount();

  useEffect(() => {
    if (!address) return;
    const fetchUser = async (address: Address) => {
      const data = await fetchUserInfo(address);
      if (data) {
        setUser(data);
      }
    };
    fetchUser(address);
  }, [address]);

  const handleConnect = () => {
    open();
  };

  const shortAddress = address
    ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
    : "";

  return (
    <div className={`relative ${className}`} {...props}>
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className={`px-4 py-3  rounded-full transition-colors duration-300 flex items-center justify-center gap-2 text-nowrap
          ${
            address
              ? "bg-white text-gray-900 shadow-sm hover:shadow-md"
              : "bg-pink-500 font-bold text-white hover:bg-pink-600"
          }
        `}
      >
        {isConnecting ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        ) : address ? (
          <div className="flex gap-2 items-center">
            <Image
              src={user?.avatar || "/images/placeholders/profile.svg"}
              alt="Profile Pic"
              width={24}
              height={24}
              className="rounded-full"
            />
            <div className="flex flex-col items-start">
              <div className="text-sm">{shortAddress}</div>
              <div className="text-[0.6rem] text-giv-800 max-w-32 whitespace-nowrap overflow-hidden text-ellipsis">
                Connected to {chain?.name}
              </div>
            </div>
          </div>
        ) : (
          <div>Connect Wallet</div>
        )}
      </button>
    </div>
  );
};
