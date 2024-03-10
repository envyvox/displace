import { getRoles } from "@/services/data-access/role";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useRoles = () => {
  return useQuery({
    queryKey: ReactQueryKeys.roles,
    queryFn: () => getRoles(),
  });
};
