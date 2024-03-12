"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";

type Props = {
  children: React.ReactNode;
};

const OnboardingProvider = ({ children }: Props) => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user.id !== "" && !user.onboardingCompleted) {
      // this was way better with middleware, but since prisma does not work on edge and I don't want to use jwt strategy, this is a temporary solution
      // https://next-auth.js.org/configuration/nextjs#caveats
      router.push("/onboarding");
    }
  }, [user, router]);

  return children;
};

export default OnboardingProvider;
