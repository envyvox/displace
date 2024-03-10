import { create } from "zustand";

export enum OnboardingStep {
  Handle,
  Roles,
  Socials,
}

type OnboardingSocials = {
  telegram?: string | undefined;
  linkedIn?: string | undefined;
  discord?: string | undefined;
};

type OnboardingForm = {
  handle: string;
  roles: string[];
  socials: OnboardingSocials;
};

type OnboardingState = {
  Step: OnboardingStep;
  Form: OnboardingForm;
  setStep: (step: OnboardingStep) => void;
  setHandle: (handle: string) => void;
  setRoles: (roles: string[]) => void;
  setSocials: (socials: OnboardingSocials) => void;
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  Step: OnboardingStep.Handle,
  Form: {
    handle: "",
    roles: [],
    socials: {
      telegram: "",
      linkedIn: "",
      discord: "",
    },
  },
  setStep: (step: OnboardingStep) => set({ Step: step }),
  setHandle: (handle: string) =>
    set((state) => ({ Form: { ...state.Form, handle } })),
  setRoles: (roles: string[]) =>
    set((state) => ({ Form: { ...state.Form, roles } })),
  setSocials: (socials: OnboardingSocials) =>
    set((state) => ({ Form: { ...state.Form, socials } })),
}));
