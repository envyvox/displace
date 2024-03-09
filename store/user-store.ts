import { getUser, User } from "@/services/data-access/user";
import { create } from "zustand";

type UserState = {
  user: User;
  getUser: (email: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: "",
    handle: "",
    about: "",
  },
  getUser: async (email: string) => {
    set({ user: await getUser(email) });
  },
}));
