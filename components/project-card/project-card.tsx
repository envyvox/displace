import Link from "next/link";
import { Project } from "@/services/data-access/project";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Bagdes from "@/components/bagdes";
import TypographyMuted from "@/components/typography/muted";

type Props = {
  project: Project;
  index: number;
};

const ProjectCard = ({ project, index }: Props) => {
  return (
    // TODO: col-spans require more testings
    <Card
      className={cn(
        "col-span-1 flex flex-col transition hover:border-primary/30",
        index % 5 === 0 && "lg:col-span-2"
      )}
    >
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>
          От пользователя{" "}
          <Link
            href={`/u/${project.owner.handle}`}
            className={cn(buttonVariants({ variant: "link" }), "h-auto p-0")}
          >
            {project.owner.handle}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <TypographyMuted className="line-clamp-6 leading-6">
          {project.description}
        </TypographyMuted>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Bagdes
          values={project.stack.map((stack, index) => ({
            key: stack + index,
            value: stack,
          }))}
        />
        <Link
          href={`/p/${project.id}`}
          className={buttonVariants({ variant: "outline" })}
        >
          Подробнее
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
