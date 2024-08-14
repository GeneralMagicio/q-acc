"use client";

import { Banner } from "@/components/Banner";
import Collaborator from "@/components/Collaborator";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import About from "@/components/About";
import InfoSection from "@/components/InfoSection";

export default function Home() {
  return (
    <main className="">
      <Banner
        title1="the future of"
        title2="tokenization"
        subTitle="q/acc = QF*ABC"
      />
      <InfoSection />
      <About />
      <FeaturedProjects />
      <Collaborator />
    </main>
  );
}
