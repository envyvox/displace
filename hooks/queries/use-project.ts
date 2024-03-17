import { getProject } from "@/services/data-access/project";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

type Props = {
  id: string;
};

export const useProject = ({ id }: Props) => {
  return useQuery({
    queryKey: ReactQueryKeys.project(id),
    queryFn: () => getProject(id),
  });
};
