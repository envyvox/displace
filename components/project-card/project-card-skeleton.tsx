import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  index: number;
};

const ProjectCardSkeleton = ({ index }: Props) => {
  return (
    <Card className={cn("col-span-1", index % 5 === 0 && "lg:col-span-2")}>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-[24px] w-1/2" />
        </CardTitle>
        <Skeleton className="h-[18px] w-1/4 pt-1.5" />
      </CardHeader>
      <CardContent className="flex flex-col gap-[10px] pt-2">
        <Skeleton className="h-[14px]" />
        <Skeleton className="h-[14px]" />
        <Skeleton className="h-[14px] w-1/4" />
        <Skeleton className="h-[14px]" />
        <Skeleton className="h-[14px]" />
        <Skeleton className="h-[14px] w-1/2" />
      </CardContent>
      <CardFooter className="flex justify-between gap-2 pt-1.5">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-[22px] w-16 rounded-full" />
          <Skeleton className="h-[22px] w-16 rounded-full" />
          <Skeleton className="h-[22px] w-16 rounded-full" />
          <Skeleton className="h-[22px] w-9 rounded-full" />
        </div>
        <Skeleton className="h-10 w-28" />
      </CardFooter>
    </Card>
  );
};

export default ProjectCardSkeleton;
