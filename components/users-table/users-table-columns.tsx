import { UserWithRoles } from "@/services/data-access/user";
import { ColumnDef } from "@tanstack/react-table";

import UsersTableCellHandle from "./users-table-cell-handle";
import UsersTableCellRoles from "./users-table-cell-roles";

export const columns: ColumnDef<UserWithRoles>[] = [
  {
    accessorKey: "handle",
    header: "Пользователь",
    cell: ({ row }) => <UsersTableCellHandle user={row.original} />,
  },
  {
    accessorKey: "userRoles",
    header: "Направления",
    cell: ({ row }) => <UsersTableCellRoles user={row.original} />,
  },
];
