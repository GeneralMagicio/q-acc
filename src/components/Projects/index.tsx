import React from "react";
import { ProjectsBanner } from "./ProjectsBanner";
import { ProjectCard } from "../ProjectCard/ProjectCard";

const projectCardStyle = "";

export const ProjectsView = () => {
  return (
    <>
      <ProjectsBanner />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 py-10">
          <ProjectCard className={projectCardStyle} />
          <ProjectCard className={projectCardStyle} />
          <ProjectCard className={projectCardStyle} />
          <ProjectCard className={projectCardStyle} />
          <ProjectCard className={projectCardStyle} />
          <ProjectCard className={projectCardStyle} />
          <ProjectCard className={projectCardStyle} />
          <ProjectCard className={projectCardStyle} />
          <ProjectCard className={projectCardStyle} />
          <ProjectCard className={projectCardStyle} />
        </div>
      </div>
    </>
  );
};
