"use client";

import { useProjects } from "@/hooks/queries/use-projects";
import ProjectCard from "@/components/project-card/project-card";
import ProjectCardCreate from "@/components/project-card/project-card-create";
import ProjectCardSkeleton from "@/components/project-card/project-card-skeleton";

const ProjectsPage = () => {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <ProjectCardCreate />
      {isLoading ? (
        <>
          <ProjectCardSkeleton index={0} />
          <ProjectCardSkeleton index={1} />
          <ProjectCardSkeleton index={2} />
          <ProjectCardSkeleton index={3} />
          <ProjectCardSkeleton index={4} />
          <ProjectCardSkeleton index={5} />
          <ProjectCardSkeleton index={6} />
        </>
      ) : (
        projects?.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))
      )}
    </div>
  );
};

export default ProjectsPage;
