"use client";
import React, { useEffect, useState } from "react";
import ProjectDetailBanner from "./ProjectDetailBanner";
import { useSearchParams } from "next/navigation";
import ProjectTabs from "./ProjectTabs";
import DonateSection from "./DonateSection";
import ProjectDonationTable from "./ProjectDonationTable";
export enum EProjectPageTabs {
  DONATIONS = "donations",
  MEMEBERS = "members",
}

const ProjectDetail = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    switch (searchParams.get("tab")) {
      case EProjectPageTabs.DONATIONS:
        setActiveTab(1);
        break;
      case EProjectPageTabs.MEMEBERS:
        setActiveTab(2);
        break;
      default:
        setActiveTab(0);
        break;
    }
  }, [searchParams.get("tab")]);
  return (
    <div className="">
      <div className="container">
        <div className="flex gap-6 flex-col lg:flex-row mt-10">
          <ProjectDetailBanner />

          <DonateSection />
        </div>
      </div>

      <ProjectTabs activeTab={activeTab} slug={"slug"} />
      {activeTab === 0 && <>ABOUT</>}
      {activeTab === 1 && <ProjectDonationTable />}
      {activeTab === 2 && <h2>MEMEBR</h2>}
    </div>
  );
};

export default ProjectDetail;
