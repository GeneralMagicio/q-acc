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
      <InfoSection title="About q/acc">
        <p>
          Quadratic Acceleration (q/acc) combines the strengths of Quadratic
          Funding (QF) with those of Augmented Bonding Curves (ABC) in order to
          create a new mechanism for launching tokens with built-in liquidity, a
          passive revenue stream and a clear path to community growth.
        </p>
        <p>
          The Quadratic Accelerator is a collaborative entity under Giveth
          building the q/acc protocol based on the research of Commons Stack.
        </p>
      </InfoSection>
      <About />
      <FeaturedProjects />
      <Collaborator />
    </main>
  );
}
