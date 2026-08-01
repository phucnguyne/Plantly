import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import { PlantlyButton } from "@/components/PlantlyButton";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { PlantlyImage } from "@/components/PlantlyImage";

export default function OnboardingScreen() {
  const router = useRouter();

  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const handlePress = () => {
    toggleHasOnboarded();
    router.replace("/");
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        theme.colorForestTeal,
        theme.colorSageGreen,
        theme.colorParchment,
      ]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View>
        <Text style={styles.heading}>Wiro Plan</Text>
        <Text style={styles.tagline}>
          Keep your plan and your life organized with Wiro
        </Text>
      </View>
      <PlantlyImage />
      <PlantlyButton title="Finish Onboarding" onPress={handlePress} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: theme.colorParchment,
  },
  heading: {
    fontSize: 48,
    fontWeight: "bold",
    color: theme.colorParchment,
    marginBottom: 12,
    textAlign: "center",
  },
  tagline: {
    fontSize: 18,
    color: theme.colorParchment,
    textAlign: "center",
  },
});
