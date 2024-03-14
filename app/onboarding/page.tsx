"use client";

import { useRouter } from "next/navigation";
import { OnboardingStep, useOnboardingStore } from "@/store/onboarding-store";
import { useUserStore } from "@/store/user-store";

import OnboardingHandleForm from "@/components/onboarding/onboarding-handle-form";
import OnboardingRolesForm from "@/components/onboarding/onboarding-roles-form";
import OnboardingSocialsForm from "@/components/onboarding/onboarding-socials-form";

const OnboardingForm = {
  [OnboardingStep.Handle]: <OnboardingHandleForm />,
  [OnboardingStep.Roles]: <OnboardingRolesForm />,
  [OnboardingStep.Socials]: <OnboardingSocialsForm />,
};

const Onboarding = () => {
  const user = useUserStore((state) => state.user);
  const onboardingStep = useOnboardingStore((state) => state.Step);
  const router = useRouter();

  if (user.id !== "" && user.onboardingCompleted) router.push("/dashboard");

  return (
    <main className="container -mt-24 flex min-h-screen max-w-xl items-center justify-center">
      {OnboardingForm[onboardingStep]}
    </main>
  );
};

export default Onboarding;
