import { setUserOnboarding } from "@/services/data-access/user";
import { useUserStore } from "@/store/user-store";
import { useSession } from "next-auth/react";
import { useMutation } from "react-query";

type Props = {
  userId?: string;
  onboardingCompleted: boolean;
};

export const useSetUserOnboarding = () => {
  const user = useUserStore((state) => state.user);

  const { update: updateSession } = useSession();

  return useMutation({
    mutationFn: async ({ userId, onboardingCompleted }: Props) => {
      await updateSession({
        user: {
          onboardingCompleted: onboardingCompleted,
        },
      });
      return setUserOnboarding(userId ?? user.id, onboardingCompleted);
    },
  });
};
