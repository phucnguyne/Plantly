import { Tabs, Redirect } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";

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
        headerTintColor: theme.colorForestTeal,
        headerTitleStyle: {
          color: theme.colorForestTeal,
        },
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
        name="(home)"
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
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="leaf" size={size} color={color} />
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
          headerTintColor: theme.colorForestTeal,
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
