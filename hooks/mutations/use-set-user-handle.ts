import { setUserHandle } from "@/services/data-access/user";
import { useUserStore } from "@/store/user-store";
import { useMutation } from "react-query";

type Props = {
  userId?: string;
  handle: string;
};

export const useSetUserHandle = () => {
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ userId, handle }: Props) =>
      setUserHandle(userId ?? user.id, handle),
  });
};
