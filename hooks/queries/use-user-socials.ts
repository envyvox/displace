import { getUserSocials } from "@/services/data-access/social";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useUserSocials = (userId?: string) => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ReactQueryKeys.userSocials(userId ?? user.id),
    queryFn: () => getUserSocials(userId ?? user.id),
  });
};
