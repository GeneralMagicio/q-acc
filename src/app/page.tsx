"use client";

import InfoSection from "@/components/InfoSection";
import { Button } from "@/components/Button";
import Collaborator from "@/components/Collaborator";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { IconArrowRight } from "@/components/Icons/IconArrowRight";
import { ProjectCard } from "@/components/ProjectCard/ProjectCard";
import { checkWhiteList } from "@/services/check-white-list";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import About from "@/components/About";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { open: openWeb3Modal } = useWeb3Modal();
  const { address } = useAccount();
  const router = useRouter();

  return (
    <main className="">
      <InfoSection />
      <About />
      <FeaturedProjects />
      <Collaborator />
    </main>
  );
}
