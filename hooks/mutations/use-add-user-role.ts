import { addUserRole } from "@/services/data-access/role";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQueryClient } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

type Props = {
  userId: string;
  roleId: string;
};

export const useAddUserRole = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ userId, roleId }: Props) =>
      addUserRole(userId ?? user.id, roleId),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userRoles(variables.userId ?? user.id),
      });
    },
  });
};
