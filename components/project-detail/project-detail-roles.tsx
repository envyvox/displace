import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Bagdes from "@/components/bagdes";
import TypographyLarge from "@/components/typography/large";

type Props = {
  roles: string[];
  isLoading: boolean;
};

const ProjectDetailRoles = ({ roles, isLoading }: Props) => {
  return (
    <Card className="h-fit md:max-w-md">
      <CardHeader>
        {isLoading ? (
          <>
            <Skeleton className="h-[24px] w-1/3" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-[22px] w-16 rounded-full" />
              <Skeleton className="h-[22px] w-16 rounded-full" />
              <Skeleton className="h-[22px] w-16 rounded-full" />
              <Skeleton className="h-[22px] w-16 rounded-full" />
            </div>
          </>
        ) : (
          <>
            <TypographyLarge>В поисках</TypographyLarge>
            <Bagdes
              values={roles.map((s) => ({ key: s, value: s }))}
              displayCount={Infinity}
            />
          </>
        )}
      </CardHeader>
    </Card>
  );
};

export default ProjectDetailRoles;
