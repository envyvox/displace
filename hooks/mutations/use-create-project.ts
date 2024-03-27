import { createProject } from "@/services/data-access/project";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQueryClient } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

type Props = {
  name: string;
  description: string;
  stack: string[];
  lookingForRoles?: string[];
  readMoreLink?: string;
};

export const useCreateProject = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      description,
      stack,
      lookingForRoles,
      readMoreLink,
    }: Props) =>
      createProject(
        user.id,
        name,
        description,
        stack,
        lookingForRoles,
        readMoreLink
      ),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.projects,
      });
    },
  });
};
