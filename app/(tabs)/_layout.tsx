import { Tabs, Redirect, Link } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";
import { Pressable, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Layout() {
  const hasFinishOnboarding = useUserStore(
    (state) => state.hasFinishedOnboarding,
  );

  if (!hasFinishOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colorForestTeal,
        tabBarInactiveTintColor: theme.colorButtonPressed,
        tabBarStyle: {
          backgroundColor: theme.colorParchment,
          borderTopColor: theme.colorSageGreen,
          elevation: 0,
          shadowOpacity: 0,
          height: 50,
          marginBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: theme.colorParchment,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: theme.colorForestTeal,
            alignSelf: "center",
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="leaf" size={size} color={color} />
          ),
          headerRightContainerStyle: {
            paddingRight: 12,
          },
          headerRight: () => (
            <Link href="/new" asChild>
              <Pressable
                style={({ pressed }) => ({
                  opacity: pressed ? 0.2 : 1,
                })}
              >
                <AntDesign
                  name="plus-circle"
                  size={24}
                  color={theme.colorForestTeal}
                />
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerStyle: {
            backgroundColor: theme.colorParchment,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: theme.colorForestTeal,
            alignSelf: "center",
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
