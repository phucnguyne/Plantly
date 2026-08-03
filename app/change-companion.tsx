import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";
import { PlantlyButton } from "@/components/PlantlyButton";
import { StatusBar } from "expo-status-bar";
import { ICONS, ICON_TYPES, getIconDetails } from "@/utils/icon";

export default function ChangeCompanionScreen() {
  const router = useRouter();
  const currentIcon = useUserStore((state) => state.companionIcon);
  const setCompanionIcon = useUserStore((state) => state.setCompanionIcon);

  const [selectedIcon, setSelectedIcon] = useState<string | null>(currentIcon);

  const previewSource = selectedIcon
    ? ICONS.find((i) => i.id === selectedIcon)?.source
    : null;

  const handleSave = () => {
    setCompanionIcon(selectedIcon);
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>Change Companion</Text>
      <Text style={styles.subtitle}>
        Pick a new companion. Existing plans keep their current icon.
      </Text>

      {/* Live preview */}
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

      {/* Icon selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.iconsRow}
      >
        {ICONS.map((icon) => {
          const isSelected = selectedIcon === icon.id;
          const iconDetails = getIconDetails(icon.id);
          const iconType =
            ICON_TYPES[icon.id as keyof typeof ICON_TYPES] ?? icon.label;
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
              <Text
                style={[styles.iconType, isSelected && styles.iconTypeSelected]}
              >
                {iconType}
              </Text>
              <Text
                style={[
                  styles.iconDetails,
                  isSelected && styles.iconDetailsSelected,
                ]}
              >
                {iconDetails}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.actions}>
        <PlantlyButton title="Save" onPress={handleSave} />
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorParchment,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 20,
  },
  title: {
    paddingTop: 55,
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colorForestTeal,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: theme.colorButtonPressed,
    textAlign: "center",
    lineHeight: 20,
  },
  previewContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  previewImage: {
    width: 160,
    height: 160,
  },
  previewPlaceholder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: theme.colorSageGreen,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colorButtonPressed,
  },
  previewPlaceholderText: {
    fontSize: 56,
    color: theme.colorButtonPressed,
    fontWeight: "bold",
  },
  iconsRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
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
    fontSize: 22,
    color: theme.colorParchment,
    fontWeight: "500",
  },
  iconLabelSelected: {
    color: theme.colorForestTeal,
    fontWeight: "700",
  },
  iconType: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
    fontSize: 11,
    color: theme.colorParchment,
    fontWeight: "700",
    textTransform: "uppercase",
    backgroundColor: theme.colorForestTeal,
  },
  iconTypeSelected: {
    backgroundColor: theme.colorForestTeal,
    color: theme.colorParchment,
  },
  iconDetails: {
    marginTop: 8,
    width: 145,
    minHeight: 42,
    fontSize: 12,
    lineHeight: 14,
    color: theme.colorParchment,
    textAlign: "center",
  },
  iconDetailsSelected: {
    color: theme.colorForestTeal,
  },
  actions: {
    width: "100%",
    gap: 8,
    alignItems: "center",
  },
  cancelButton: {
    paddingVertical: 10,
    paddingBottom: 50,
  },
  cancelText: {
    fontSize: 16,
    color: theme.colorButtonPressed,
    fontWeight: "500",
  },
});
