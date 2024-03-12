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

type Props = {
  user: User;
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
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="size-24">
          <AvatarImage src={user.image!} alt={user.handle!} />
          <AvatarFallback>{user.handle![0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="space-y-4">
          <CardTitle>{user.handle}</CardTitle>
          <CardDescription className="flex flex-wrap gap-2">
            {roles.map(({ role }) => (
              <Badge key={role.id}>{role.name}</Badge>
            ))}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {socials.length ? (
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
