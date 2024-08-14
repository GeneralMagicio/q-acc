import About from "@/components/About";
import { Banner } from "@/components/Banner";
import Collaborator from "@/components/Collaborator";
import InfoSection from "@/components/InfoSection";
import React from "react";

export default function CreatorPage() {
  return (
    <main className="">
      <Banner
        title1="Welcome to"
        title2="Season one"
        subTitle="q/acc = QF*ABC"
      />
      <InfoSection />
      <About />
      <Collaborator />
    </main>
  );
}
