import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import { PlantlyButton } from "@/components/PlantlyButton";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ICONS } from "@/utils/icon";

export default function OnboardingScreen() {
  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);
  const setCompanionIcon = useUserStore((state) => state.setCompanionIcon);

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handlePress = () => {
    if (selectedIcon) {
      setCompanionIcon(selectedIcon);
    }
    toggleHasOnboarded();
    router.replace("/");
  };

  const previewSource = selectedIcon
    ? ICONS.find((i) => i.id === selectedIcon)?.source
    : null;

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

      {/* Live preview of selected icon */}
      <View style={styles.previewContainer}>
        {previewSource ? (
          <Image
            source={previewSource}
            style={styles.previewImage}
            contentFit="contain"
          />
        ) : (
          <View style={styles.previewPlaceholder}>
            <Text style={styles.previewPlaceholderText}>?</Text>
          </View>
        )}
      </View>

      {/* Companion icon selector */}
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorLabel}>Choose your companion</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.iconsRow}
        >
          {ICONS.map((icon) => {
            const isSelected = selectedIcon === icon.id;
            return (
              <TouchableOpacity
                key={icon.id}
                style={[styles.iconWrapper, isSelected && styles.iconSelected]}
                onPress={() => setSelectedIcon(icon.id)}
                activeOpacity={0.75}
              >
                <Image
                  source={icon.source}
                  style={styles.iconImage}
                  contentFit="contain"
                />
                <Text
                  style={[
                    styles.iconLabel,
                    isSelected && styles.iconLabelSelected,
                  ]}
                >
                  {icon.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

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
  previewContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  previewImage: {
    width: 200,
    height: 200,
  },
  previewPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.4)",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  previewPlaceholderText: {
    fontSize: 64,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "bold",
  },
  selectorContainer: {
    alignItems: "center",
    width: "100%",
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colorParchment,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  iconsRow: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 16,
  },
  iconWrapper: {
    alignItems: "center",
    padding: 10,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "transparent",
    backgroundColor: theme.colorSageGreen,
  },
  iconSelected: {
    borderColor: theme.colorForestTeal,
    backgroundColor: theme.colorButtonPressed,
  },
  iconImage: {
    width: 72,
    height: 72,
  },
  iconLabel: {
    marginTop: 6,
    fontSize: 13,
    color: theme.colorParchment,
    fontWeight: "500",
  },
  iconLabelSelected: {
    color: theme.colorForestTeal,
    fontWeight: "700",
  },
});
