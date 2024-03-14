import { getProjects } from "@/services/data-access/project";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useProjects = () => {
  return useQuery({
    queryKey: ReactQueryKeys.projects,
    queryFn: () => getProjects(),
  });
};
