import { getUserByHandle } from "@/services/data-access/user";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useUserByHandle = (handle: string) => {
  return useQuery({
    queryKey: ReactQueryKeys.userByHandle(handle),
    queryFn: () => getUserByHandle(handle),
  });
};
