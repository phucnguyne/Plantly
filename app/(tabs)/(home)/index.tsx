import { FlatList, StyleSheet, View } from "react-native";
import { theme } from "@/theme";
import { usePlantStore } from "@/store/planStore";
import { PlantlyButton } from "@/components/PlantlyButton";
import { useRouter } from "expo-router";
import { PlantCard } from "@/components/PlanCard";

export default function App() {
  const router = useRouter();
  const plants = usePlantStore((state) => state.plants);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={plants}
      renderItem={({ item }) => <PlantCard plant={item} />}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <PlantlyButton
            title="Add your first plant"
            onPress={() => {
              router.navigate("/new");
            }}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorParchment,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
