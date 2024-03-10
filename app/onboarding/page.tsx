"use client";

import { OnboardingStep, useOnboardingStore } from "@/store/onboarding-store";

import OnboardingHandleForm from "@/components/onboarding/onboarding-handle-form";
import OnboardingRolesForm from "@/components/onboarding/onboarding-roles-form";
import OnboardingSocialsForm from "@/components/onboarding/onboarding-socials-form";

const OnboardingForm = {
  [OnboardingStep.Handle]: <OnboardingHandleForm />,
  [OnboardingStep.Roles]: <OnboardingRolesForm />,
  [OnboardingStep.Socials]: <OnboardingSocialsForm />,
};

const Onboarding = () => {
  const onboardingStep = useOnboardingStore((state) => state.Step);

  return (
    <main className="container -mt-24 flex h-screen max-w-xl items-center justify-center">
      {OnboardingForm[onboardingStep]}
    </main>
  );
};

export default Onboarding;
