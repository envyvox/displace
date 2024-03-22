import { UserWithRoles } from "@/services/data-access/user";

import Bagdes from "@/components/bagdes";

type Props = {
  user: UserWithRoles;
};

const UsersTableCellRoles = ({ user }: Props) => {
  return (
    <Bagdes
      values={user.userRoles.map(({ role }) => ({
        key: role.id,
        value: role.name,
      }))}
    />
  );
};

export default UsersTableCellRoles;
