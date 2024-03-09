import { getUserRoles } from "@/services/data-access/role";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useUserRoles = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ReactQueryKeys.userRoles(user.id),
    queryFn: () => getUserRoles(user.id),
  });
};
