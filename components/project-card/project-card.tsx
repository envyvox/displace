import Link from "next/link";
import { Project } from "@/services/data-access/project";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
        <div className="flex flex-wrap gap-2">
          {project?.stack
            .slice(0, 3)
            // Since stack is not an unique, adding index to the key just in case of duplicates
            .map((stack, index) => (
              <Badge key={stack + index} variant="secondary">
                {stack}
              </Badge>
            ))}
          {project?.stack.length > 3 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="secondary">
                    +{project?.stack.slice(3).length}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="flex max-w-64 flex-wrap gap-2 p-2">
                  {project?.stack.slice(3).map((stack) => (
                    <Badge key={stack} variant="secondary">
                      {stack}
                    </Badge>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
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
