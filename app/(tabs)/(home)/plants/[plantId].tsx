import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { Image } from "expo-image";
import { usePlantStore } from "@/store/planStore";
import { differenceInCalendarDays, format } from "date-fns";
import { PlantlyButton } from "@/components/PlantlyButton";
import { theme } from "@/theme";
import { useEffect } from "react";
import { PlantlyImage } from "@/components/PlantlyImage";

const ICON_SOURCES: Record<string, ReturnType<typeof require>> = {
  dot: require("@/assets/plan-dot-512.svg"),
  mochi: require("@/assets/plan-mochi-512.svg"),
  scout: require("@/assets/plan-scout-512.svg"),
};

const fullDateFormat = "LLL d yyyy, h:mm aaa";

export default function PlantDetails() {
  const router = useRouter();
  const waterPlan = usePlantStore((store) => store.waterPlan);
  const removePlan = usePlantStore((store) => store.removePlan);
  const params = useLocalSearchParams();
  const plantId = params.plantId;
  const plant = usePlantStore((state) =>
    state.plants.find((plant) => String(plant.id) === plantId),
  );

  const iconId = plant?.companionIcon;
  const companionSource =
    iconId && ICON_SOURCES[iconId] ? ICON_SOURCES[iconId] : null;

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: plant?.name,
      headerStyle: {
        backgroundColor: theme.colorParchment,
      },
    });
  }, [plant?.name, navigation]);

  const handleWaterPlant = () => {
    if (typeof plantId === "string") {
      waterPlan(plantId);
    }
  };

  const handleDeletePlant = () => {
    if (!plant?.id) {
      return;
    }

    Alert.alert(
      `Are you sure you want to delete ${plant?.name}?`,
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => {
            removePlan(plant.id);
            router.navigate("/");
          },
          style: "destructive",
        },
        { text: "Cancel", style: "cancel" },
      ],
    );
  };

  if (!plant) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>
          Plant with ID {plantId} not found
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.detailsContainer}>
      <View style={{ alignItems: "center" }}>
        {plant.imgUrl ? (
          <PlantlyImage imgUrl={plant.imgUrl} />
        ) : companionSource ? (
          <Image
            source={companionSource}
            style={styles.companionIcon}
            contentFit="contain"
          />
        ) : (
          <PlantlyImage />
        )}
        <View style={styles.spacer} />
        <Text style={styles.key}>Repeat every</Text>
        <Text style={styles.value}>{plant.EatingFrequencyDays} days</Text>
        <Text style={styles.key}>Last completed at</Text>
        <Text style={styles.value}>
          {plant.lastEatenAtTimestamp
            ? `${format(plant.lastEatenAtTimestamp, fullDateFormat)}`
            : "Never 😟"}
        </Text>
        <Text style={styles.key}>Days since last completed</Text>
        <Text style={styles.value}>
          {plant.lastEatenAtTimestamp
            ? differenceInCalendarDays(Date.now(), plant.lastEatenAtTimestamp)
            : "N/A"}
        </Text>
      </View>
      <PlantlyButton title="Mark done" onPress={handleWaterPlant} />
      <Pressable style={styles.deleteButton} onPress={handleDeletePlant}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorParchment,
  },
  notFoundText: {
    fontSize: 18,
  },
  detailsContainer: {
    padding: 12,
    backgroundColor: theme.colorParchment,
    flex: 1,
    justifyContent: "center",
  },
  key: {
    marginRight: 8,
    fontSize: 16,
    color: theme.colorBlack,
    textAlign: "center",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: theme.colorForestTeal,
  },
  deleteButton: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: theme.colorTerracotta,
    fontWeight: "bold",
  },
  spacer: {
    height: 18,
  },
  companionIcon: {
    width: 200,
    height: 200,
  },
});
