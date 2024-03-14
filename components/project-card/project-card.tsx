import Link from "next/link";
import { Project } from "@/services/data-access/project";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        "col-span-1 transition hover:border-primary/30",
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
      <CardContent>
        <TypographyMuted className="line-clamp-6 leading-6">
          {project.description}
        </TypographyMuted>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
