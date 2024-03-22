import Link from "next/link";
import { User } from "@/services/data-access/user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  user: User;
};

const UsersTableCellHandle = ({ user }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <Avatar>
        <AvatarImage src={user.image ?? ""} />
        <AvatarFallback>{user.handle ? user.handle[0] : "?"}</AvatarFallback>
      </Avatar>
      <Link href={`/u/${user.handle}`}>{user.handle}</Link>
    </div>
  );
};

export default UsersTableCellHandle;
