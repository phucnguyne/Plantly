import { AntDesign } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import { theme } from "@/theme";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerTintColor: theme.colorForestTeal,
          headerTitleStyle: {
            color: theme.colorForestTeal,
            fontSize: 18,
            fontWeight: "bold",
          },
          headerRight: () => (
            <Link href="/new" asChild>
              <Pressable hitSlop={20}>
                <AntDesign
                  name="plus-circle"
                  size={24}
                  color={theme.colorForestTeal}
                />
              </Pressable>
            </Link>
          ),
          headerStyle: {
            backgroundColor: theme.colorParchment,
          },
        }}
      />
      <Stack.Screen
        name="plants/[plantId]"
        options={{
          title: "",
          headerBackTitle: "",
          headerTintColor: theme.colorForestTeal,
          headerStyle: {
            backgroundColor: theme.colorParchment,
          },
        }}
      />
    </Stack>
  );
}
