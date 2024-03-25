import Link from "next/link";
import { User } from "@/services/data-access/user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import TypographyLarge from "@/components/typography/large";

type Props = {
  members: User[];
  isLoading: boolean;
};

const ProjectDetailMembers = ({ members, isLoading }: Props) => {
  // TODO: add skeleton on loading
  return (
    <Card className="h-fit md:max-w-md">
      <CardHeader>
        <TypographyLarge>Участники</TypographyLarge>
        <div className="flex flex-wrap gap-2">
          {members.map((user) => (
            <Link href={`/u/${user.handle}`} key={user.id}>
              <Avatar>
                <AvatarImage src={user.image ?? ""} />
                <AvatarFallback>{user.handle![0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProjectDetailMembers;
