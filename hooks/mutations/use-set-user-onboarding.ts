import { setUserOnboarding } from "@/services/data-access/user";
import { useUserStore } from "@/store/user-store";
import { useMutation } from "react-query";

type Props = {
  userId?: string;
  onboardingCompleted: boolean;
};

export const useSetUserOnboarding = () => {
  const user = useUserStore((state) => state.user);
  const setOnboardingCompleted = useUserStore(
    (state) => state.setOnboardingCompleted
  );

  return useMutation({
    mutationFn: async ({ userId, onboardingCompleted }: Props) => {
      setOnboardingCompleted(onboardingCompleted);
      return setUserOnboarding(userId ?? user.id, onboardingCompleted);
    },
  });
};
