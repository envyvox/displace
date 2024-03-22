"use client";

import { useUsers } from "@/hooks/queries/use-users";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/users-table/users-table-columns";

const UsersPage = () => {
  const { data: users, isLoading } = useUsers();

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        users && <DataTable columns={columns} data={users} />
      )}
    </div>
  );
};

export default UsersPage;
