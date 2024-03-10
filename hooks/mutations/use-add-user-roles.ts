import { addUserRoles } from "@/services/data-access/role";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQueryClient } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

type Props = {
  userId?: string;
  rolesId: string[];
};

export const useAddUserRoles = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ userId, rolesId }: Props) =>
      addUserRoles(userId ?? user.id, rolesId),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userRoles(variables.userId ?? user.id),
      });
    },
  });
};
