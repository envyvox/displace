import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Bagdes from "@/components/bagdes";
import TypographyLarge from "@/components/typography/large";

type Props = {
  stack: string[];
  isLoading: boolean;
};

const ProjectDetailStack = ({ stack, isLoading }: Props) => {
  return (
    <Card className="h-fit md:max-w-md">
      <CardHeader>
        {isLoading ? (
          <>
            <Skeleton className="h-[24px] w-2/3" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-[22px] w-16 rounded-full" />
              <Skeleton className="h-[22px] w-16 rounded-full" />
              <Skeleton className="h-[22px] w-16 rounded-full" />
              <Skeleton className="h-[22px] w-16 rounded-full" />
              <Skeleton className="h-[22px] w-16 rounded-full" />
              <Skeleton className="h-[22px] w-16 rounded-full" />
              <Skeleton className="h-[22px] w-16 rounded-full" />
            </div>
          </>
        ) : (
          <>
            <TypographyLarge>Используемые технологии</TypographyLarge>
            <Bagdes
              values={stack.map((s, index) => ({ key: s + index, value: s }))}
              displayCount={Infinity}
            />
          </>
        )}
      </CardHeader>
    </Card>
  );
};

export default ProjectDetailStack;
