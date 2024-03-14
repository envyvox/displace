"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useProjects } from "@/hooks/queries/use-projects";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProjectCardCreate from "@/components/project-card/project-card-create";
import ProjectCardSkeleton from "@/components/project-card/project-card-skeleton";
import TypographyMuted from "@/components/typography/muted";

const Dashboard = () => {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <ProjectCardCreate />
      {isLoading ? (
        <>
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </>
      ) : (
        projects?.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>
                От пользователя{" "}
                <Link
                  href={`/u/${project.owner.handle}`}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "h-auto p-0"
                  )}
                >
                  {project.owner.handle}
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TypographyMuted className="line-clamp-6 leading-6">
                {project.description}
              </TypographyMuted>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Dashboard;
