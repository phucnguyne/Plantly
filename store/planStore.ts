import AsyncStorage from "@react-native-async-storage/async-storage";
import { File, Paths } from "expo-file-system";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type PlantType = {
  id: string;
  name: string;
  EatingFrequencyDays: number;
  lastEatenAtTimestamp?: number;
  imgUrl?: string;
  companionIcon?: string | null;
};

type PlantsState = {
  nextId: number;
  plants: PlantType[];
  addPlan: (
    name: string,
    eatingFrequencyDays: number,
    imgUrl?: string,
    companionIcon?: string | null,
  ) => Promise<void>;
  removePlan: (plantId: string) => void;
  waterPlan: (plantId: string) => void;
};

export const usePlantStore = create(
  persist<PlantsState>(
    (set) => ({
      plants: [],
      nextId: 1,
      addPlan: async (
        name: string,
        eatingFrequencyDays: number,
        imgUrl?: string,
        companionIcon?: string | null,
      ) => {
        let savedImageUrl: string | undefined;
        if (imgUrl) {
          const fileName = `${Date.now()}-${imgUrl.split("/").slice(-1)[0]}`;
          const destinationFile = new File(Paths.document, fileName);
          await new File(imgUrl).copy(destinationFile);
          savedImageUrl = destinationFile.uri;
        }

        set((state) => ({
          ...state,
          nextId: state.nextId + 1,
          plants: [
            {
              id: String(state.nextId),
              name,
              EatingFrequencyDays: eatingFrequencyDays,
              imgUrl: imgUrl ? savedImageUrl : undefined,
              companionIcon: companionIcon ?? null,
            },
            ...state.plants,
          ],
        }));
      },
      removePlan: (plantId: string) => {
        return set((state) => {
          return {
            ...state,
            plants: state.plants.filter((plant) => plant.id !== plantId),
          };
        });
      },
      waterPlan: (plantId: string) => {
        return set((state) => {
          return {
            ...state,
            plants: state.plants.map((plant) => {
              if (plant.id === plantId) {
                return {
                  ...plant,
                  lastWateredAtTimestamp: Date.now(),
                };
              }
              return plant;
            }),
          };
        });
      },
    }),
    {
      name: "plan-eating-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
