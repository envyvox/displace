import { UserWithRole } from "@/services/data-access/role";
import { User } from "@/services/data-access/user";
import { UserSocial } from "@prisma/client";

import SocialLink from "./social-link";
import TypographyMuted from "./typography/muted";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type Props = {
  user: User | null | undefined;
  isLoadingUser: boolean;
  roles: UserWithRole[];
  isLoadingRoles: boolean;
  socials: UserSocial[];
  isloadingSocials: boolean;
};

const UserCard = ({
  user,
  isLoadingUser,
  roles,
  isLoadingRoles,
  socials,
  isloadingSocials,
}: Props) => {
  if (!isLoadingUser && !user) {
    return (
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardDescription>
            Пользователь с таким именем не найден.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="max-w-[500px]">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="size-24">
          <AvatarImage src={user?.image!} alt={user?.handle!} />
          <AvatarFallback>
            <Skeleton className="rounded-full" />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-4">
          <CardTitle>
            {isLoadingUser ? (
              <Skeleton className="h-6 w-[150px]" />
            ) : (
              user?.handle
            )}
          </CardTitle>
          {isLoadingRoles ? (
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-[22px] w-20" />
              <Skeleton className="h-[22px] w-20" />
              <Skeleton className="h-[22px] w-20" />
            </div>
          ) : (
            <CardDescription className="flex flex-wrap gap-2">
              {roles.map(({ role }) => (
                <Badge key={role.id}>{role.name}</Badge>
              ))}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {isloadingSocials ? (
          <>
            <Skeleton className="h-[40px] w-32" />
            <Skeleton className="h-[40px] w-32" />
            <Skeleton className="h-[40px] w-32" />
          </>
        ) : socials.length ? (
          socials.map((social) => (
            <SocialLink
              key={social.id}
              social={social.social}
              link={social.link}
            />
          ))
        ) : (
          <TypographyMuted>
            Пользователь не указал ни одного мессенджера или социальной сети.
          </TypographyMuted>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
