import { addUserSocial } from "@/services/data-access/social";
import { useUserStore } from "@/store/user-store";
import { Social } from "@prisma/client";
import { useMutation } from "react-query";

type Props = {
  userId?: string;
  social: Social;
  link: string;
};

export const useAddUserSocial = () => {
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ userId, social, link }: Props) =>
      addUserSocial(userId ?? user.id, social, link),
  });
};
