import { getUser, User } from "@/services/data-access/user";
import { create } from "zustand";

type UserState = {
  user: User;
  getUser: (email: string) => void;
  setOnboardingCompleted: (onboardingCompleted: boolean) => void;
};

export const useUserStore = create<UserState>((set, get) => ({
  user: {
    id: "",
    handle: "",
    about: "",
    image: null,
    onboardingCompleted: false,
  },
  getUser: async (email: string) => {
    set({ user: (await getUser(email)) ?? get().user });
  },
  setOnboardingCompleted: (onboardingCompleted: boolean) => {
    set({ user: { ...get().user, onboardingCompleted } });
  },
}));
