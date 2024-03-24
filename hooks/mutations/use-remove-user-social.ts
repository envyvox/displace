import { removeUserSocial } from "@/services/data-access/social";
import { useUserStore } from "@/store/user-store";
import { Social } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

type Props = {
  userId?: string;
  social: Social;
};

export const useRemoveUserSocial = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ userId, social }: Props) =>
      removeUserSocial(userId ?? user.id, social),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userSocials(variables.userId ?? user.id),
      });
    },
  });
};
