import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { theme } from "@/theme";
import { PlantType } from "@/store/planStore";
import { PlantlyImage } from "@/components/PlantlyImage";
import { Link } from "expo-router";

const ICON_SOURCES: Record<string, ReturnType<typeof require>> = {
  dot: require("@/assets/plan-dot-512.svg"),
  mochi: require("@/assets/plan-mochi-512.svg"),
  scout: require("@/assets/plan-scout-512.svg"),
};

export function PlantCard({ plant }: { plant: PlantType }) {
  const companionSource =
    plant.companionIcon && ICON_SOURCES[plant.companionIcon]
      ? ICON_SOURCES[plant.companionIcon]
      : null;

  return (
    <Link href={`/plants/${plant.id}`} asChild>
      <Pressable style={styles.plantCard}>
        {plant.imgUrl ? (
          <PlantlyImage size={100} imgUrl={plant.imgUrl} />
        ) : companionSource ? (
          <Image
            source={companionSource}
            style={styles.cardIcon}
            contentFit="contain"
          />
        ) : (
          <PlantlyImage size={100} />
        )}
        <View style={styles.details}>
          <Text numberOfLines={1} style={styles.plantName}>
            {plant.name}
          </Text>
          <Text style={styles.subtitle}>
            Repeat every {plant.EatingFrequencyDays} days
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  plantCard: {
    flexDirection: "row",
    shadowColor: theme.colorBlack,
    backgroundColor: theme.colorSageGreen,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardIcon: {
    width: 100,
    height: 100,
  },
  details: {
    padding: 14,
    justifyContent: "center",
  },
  plantName: {
    fontSize: 18,
    marginBottom: 4,
  },
  subtitle: {
    color: theme.colorParchment,
  },
});
