"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useProject } from "@/hooks/queries/use-project";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TypographyMuted from "@/components/typography/muted";

const ProjectPage = ({ params }: { params: { id: string } }) => {
  const { data: project } = useProject({ id: params.id });

  return (
    <div className="-mt-24 flex min-h-screen items-center justify-center">
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>{project?.name}</CardTitle>
          <CardDescription>
            От пользователя{" "}
            <Link
              href={`/u/${project?.owner.handle}`}
              className={cn(buttonVariants({ variant: "link" }), "h-auto p-0")}
            >
              {project?.owner.handle}
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TypographyMuted className="leading-6">
            {project?.description}
          </TypographyMuted>
        </CardContent>
        <CardFooter className="flex justify-end">
          {project?.readMoreLink && (
            <Link
              href={project?.readMoreLink}
              className={cn(buttonVariants({ variant: "outline" }), "")}
            >
              Узнать больше
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectPage;
