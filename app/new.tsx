import {
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { theme } from "@/theme";
import { PlantlyButton } from "@/components/PlantlyButton";
import { useState } from "react";
import { PlantlyImage } from "@/components/PlantlyImage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { usePlantStore } from "@/store/planStore";
import { useRouter } from "expo-router";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useUserStore } from "@/store/userStore";

const ICON_SOURCES: Record<string, ReturnType<typeof require>> = {
  dot: require("@/assets/plan-dot-512.svg"),
  mochi: require("@/assets/plan-mochi-512.svg"),
  scout: require("@/assets/plan-scout-512.svg"),
};

export default function NewScreen() {
  const router = useRouter();
  const addPlan = usePlantStore((state) => state.addPlan);
  const companionIcon = useUserStore((state) => state.companionIcon);

  const [name, setName] = useState<string>();
  const [days, setDays] = useState<string>();
  const [imgUrl, setImgUrl] = useState<string>();

  const handleSubmit = () => {
    if (!name) {
      return Alert.alert("Validation Error", "Give your plan a name");
    }

    if (!days) {
      return Alert.alert(
        "Validation Error",
        `How often does ${name} need to do`,
      );
    }

    if (Number.isNaN(Number(days))) {
      return Alert.alert(
        "Validation Error",
        "Must be a number for how often your plan needs to do",
      );
    }

    addPlan(name, Number(days), imgUrl, companionIcon);
    router.back();
  };

  const handleChooseImage = async () => {
    if (Platform.OS === "web") {
      return Alert.alert(
        "Image Picker Not Supported",
        "Image picker is not supported on web. Please use a mobile device.",
      );
    }
    const result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImgUrl(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.centered}
        onPress={handleChooseImage}
        activeOpacity={0.7}
      >
        {imgUrl ? (
          <PlantlyImage imgUrl={imgUrl} />
        ) : companionIcon && ICON_SOURCES[companionIcon] ? (
          <Image
            source={ICON_SOURCES[companionIcon]}
            style={styles.companionIcon}
            contentFit="contain"
          />
        ) : (
          <PlantlyImage />
        )}
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="E.g. Casper the Cactus"
        autoCapitalize="words"
      />
      <Text style={styles.label}>Eating Frequency (every x days)</Text>
      <TextInput
        value={days}
        onChangeText={setDays}
        style={styles.input}
        placeholder="E.g. 6"
        keyboardType="number-pad"
      />
      <PlantlyButton title="Add plan" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorParchment,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colorButtonPressed,
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  centered: {
    alignItems: "center",
    marginBottom: 24,
  },
  companionIcon: {
    width: 200,
    height: 200,
  },
});
