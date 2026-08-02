import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

type UserState = {
  hasFinishedOnboarding: boolean;
  toggleHasOnboarded: () => void;
  companionIcon: string | null;
  setCompanionIcon: (icon: string | null) => void;
};

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      hasFinishedOnboarding: false,
      toggleHasOnboarded: () => {
        return set((state) => {
          return {
            ...state,
            hasFinishedOnboarding: !state.hasFinishedOnboarding,
          };
        });
      },
      companionIcon: null,
      setCompanionIcon: (icon: string | null) => {
        return set((state) => ({
          ...state,
          companionIcon: icon,
        }));
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
