import Link from "next/link";
import { User } from "@/services/data-access/user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TypographyLarge from "@/components/typography/large";

type Props = {
  members: User[];
  isLoading: boolean;
};

const ProjectDetailMembers = ({ members, isLoading }: Props) => {
  return (
    <Card className="h-fit md:max-w-md">
      <CardHeader>
        {isLoading ? (
          <Skeleton className="h-[24px] w-1/3" />
        ) : (
          <TypographyLarge>Участники</TypographyLarge>
        )}
        <div className="flex flex-wrap gap-2">
          {isLoading ? (
            <>
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="size-10 rounded-full" />
            </>
          ) : (
            members.map((user) => (
              <Link href={`/u/${user.handle}`} key={user.id}>
                <Avatar>
                  <AvatarImage src={user.image ?? ""} />
                  <AvatarFallback>
                    {user.handle![0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ))
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProjectDetailMembers;
