"use client";
import { FC, useEffect, useState } from "react";

import ProjectDetail from "@/components/ProjectDetail/ProjectDetail";
import { IProject } from "@/apollo/types/types";
import { ProjectProvider } from "@/context/project.context";
import { getProjectbySlug } from "@/helpers/helpers";
import { useParams } from "next/navigation";

const ProjectRoute = () => {
  const params = useParams();
  console.log(params);
  const [data, setData] = useState<IProject>();

  useEffect(() => {
    const fetchData = async () => {
      const { props } = await getProjectbySlug();
      setData(props.project);
    };

    fetchData();
  }, []);

  return (
    <ProjectProvider project={data}>
      <ProjectDetail />;
    </ProjectProvider>
  );
};

export default ProjectRoute;
