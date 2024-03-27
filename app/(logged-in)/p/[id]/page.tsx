"use client";

import { useProject } from "@/hooks/queries/use-project";
import ProjectDetailCard from "@/components/project-detail/project-detail-card";
import ProjectDetailMembers from "@/components/project-detail/project-detail-members";
import ProjectDetailNotFound from "@/components/project-detail/project-detail-not-found";
import ProjectDetailRoles from "@/components/project-detail/project-detail-roles";
import ProjectDetailStack from "@/components/project-detail/project-detail-stack";

const ProjectPage = ({ params }: { params: { id: string } }) => {
  const { data: project, isLoading } = useProject({ id: params.id });

  if (!isLoading && !project) {
    return <ProjectDetailNotFound />;
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <ProjectDetailCard project={project} isLoading={isLoading} />
      <div className="col-span-3 flex flex-col gap-8 md:col-span-1">
        <ProjectDetailStack
          stack={project?.stack ?? []}
          isLoading={isLoading}
        />
        <ProjectDetailRoles
          roles={project?.lookingForRoles.map(({ role }) => role.name) ?? []}
          isLoading={isLoading}
        />
        <ProjectDetailMembers
          members={project?.members.map(({ user }) => user) ?? []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ProjectPage;
