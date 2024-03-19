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
import { Skeleton } from "@/components/ui/skeleton";
import TypographyLarge from "@/components/typography/large";
import TypographyMuted from "@/components/typography/muted";

type Props = {
  project: Project | null | undefined;
  isLoading: boolean;
};

const ProjectDetailCard = ({ project, isLoading }: Props) => {
  if (!isLoading && !project) {
    return (
      <Card className="max-w-3xl">
        <CardHeader>
          <CardDescription>
            Проект с таким идентификатором не найден.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>
          {isLoading ? <Skeleton className="h-[24px] w-1/2" /> : project?.name}
        </CardTitle>
        {isLoading ? (
          <Skeleton className="h-[14px] w-1/4" />
        ) : (
          <CardDescription>
            От пользователя{" "}
            <Link
              href={`/u/${project?.owner.handle}`}
              className={cn(buttonVariants({ variant: "link" }), "h-auto p-0")}
            >
              {project?.owner.handle}
            </Link>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-[14px] w-full" />
            <Skeleton className="h-[14px] w-full" />
            <Skeleton className="h-[14px] w-1/2" />
            <Skeleton className="h-[14px] w-full" />
            <Skeleton className="h-[14px] w-1/4" />
          </div>
        ) : (
          <TypographyMuted className="leading-6">
            {project?.description}
          </TypographyMuted>
        )}
        <div className="mt-4 space-y-2">
          <TypographyLarge>Используемые технологии</TypographyLarge>
          <div className="flex flex-wrap gap-2">
            {isLoading ? (
              <>
                <Skeleton className="h-[22px] w-32 rounded-full" />
                <Skeleton className="h-[22px] w-32 rounded-full" />
                <Skeleton className="h-[22px] w-32 rounded-full" />
                <Skeleton className="h-[22px] w-32 rounded-full" />
                <Skeleton className="h-[22px] w-32 rounded-full" />
                <Skeleton className="h-[22px] w-32 rounded-full" />
                <Skeleton className="h-[22px] w-32 rounded-full" />
              </>
            ) : (
              project?.stack.map((stack, index) => (
                // Since stack is not an unique, adding index to the key just in case of duplicates
                <Badge key={stack + index}>{stack}</Badge>
              ))
            )}
          </div>
        </div>
      </CardContent>
      {project?.readMoreLink && (
        <CardFooter className="flex justify-end">
          <Link
            href={project?.readMoreLink}
            className={cn(buttonVariants({ variant: "outline" }), "")}
          >
            Узнать больше
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProjectDetailCard;
