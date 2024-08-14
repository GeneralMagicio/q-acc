import About from "@/components/About";
import { Banner } from "@/components/Banner";
import { Button, ButtonColor, ButtonStyle } from "@/components/Button";
import Collaborator from "@/components/Collaborator";
import InfoSection from "@/components/InfoSection";
import Routes from "@/lib/constants/Routes";
import Link from "next/link";
import React from "react";

export default function CreatorPage() {
  return (
    <main className="flex flex-col gap-4">
      <Banner
        title1="Welcome to"
        title2="Season one"
        subTitle="q/acc = QF*ABC"
      />
      <InfoSection title="Welcome to season one!">
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
        <Link href={Routes.CreateProfile}>
          <Button
            className="mx-auto !py-6 !px-10"
            color={ButtonColor.Pink}
            styleType={ButtonStyle.Solid}
          >
            Create Project
          </Button>
        </Link>
      </InfoSection>
      <About />
      <InfoSection title="Le’ts create your project">
        <p>
          Quadratic Acceleration (q/acc) combines the strengths of Quadratic
          Funding (QF) with those of  Augmented Bonding Curves (ABC) in order to
          create a new mechanism for launching tokens with built-in liquidity, a
          passive revenue stream and a clear path to community growth.
        </p>
        <p>
          The Quadratic Accelerator is a collaborative entity under Giveth
          building the q/acc protocol based on the research of Commons Stack.
        </p>
        <Link href={Routes.CreateProfile}>
          <Button
            className="mx-auto !py-6 !px-10"
            color={ButtonColor.Pink}
            styleType={ButtonStyle.Solid}
          >
            Create Project
          </Button>
        </Link>
      </InfoSection>
      <Collaborator />
    </main>
  );
}
