import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { usePlantStore } from "@/store/planStore";
import { differenceInCalendarDays, format } from "date-fns";
import { PlantlyButton } from "@/components/PlantlyButton";
import { theme } from "@/theme";
import { useEffect } from "react";
import { PlantlyImage } from "@/components/PlantlyImage";

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
        <PlantlyImage imgUrl={plant.imgUrl} />
        <View style={styles.spacer} />
        <Text style={styles.key}>Water me every</Text>
        <Text style={styles.value}>{plant.EatingFrequencyDays} days</Text>
        <Text style={styles.key}>Last watered at</Text>
        <Text style={styles.value}>
          {plant.lastEatenAtTimestamp
            ? `${format(plant.lastEatenAtTimestamp, fullDateFormat)}`
            : "Never 😟"}
        </Text>
        <Text style={styles.key}>Days since last watered</Text>
        <Text style={styles.value}>
          {plant.lastEatenAtTimestamp
            ? differenceInCalendarDays(Date.now(), plant.lastEatenAtTimestamp)
            : "N/A"}
        </Text>
      </View>
      <PlantlyButton title="Water me!" onPress={handleWaterPlant} />
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
});
