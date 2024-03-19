"use client";

import { useProject } from "@/hooks/queries/use-project";
import ProjectDetailCard from "@/components/project-card/project-detail-card";

const ProjectPage = ({ params }: { params: { id: string } }) => {
  const { data: project, isLoading } = useProject({ id: params.id });

  return (
    <div className="-mt-24 flex min-h-screen items-center justify-center">
      <ProjectDetailCard project={project} isLoading={isLoading} />
    </div>
  );
};

export default ProjectPage;
