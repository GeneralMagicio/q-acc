"use client";

import { Button } from "@/components/Button";
import { IconArrowRight } from "@/components/Icons/IconArrowRight";
import { ProjectCard } from "@/components/ProjectCard/ProjectCard";
import { checkWhiteList } from "@/services/check-white-list";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { open: openWeb3Modal } = useWeb3Modal();
  const { address } = useAccount();
  const router = useRouter();

  return (
    <main className="container text-center flex flex-col items-center gap-8">
      <ProjectCard />
    </main>
  );
}
