import { router } from "expo-router";
import { useRef, useState } from "react";
import { Animated } from "react-native";

const MENU_ITEMS = [
  { key: "new", label: "New Plan", emoji: "🌱" },
  { key: "companion", label: "Change Companion", emoji: "🐾" },
  { key: "close", label: "Close", emoji: "✕" },
];

export default function useBubbleMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const bubbleAnims = useRef(
    MENU_ITEMS.map(() => new Animated.Value(0)),
  ).current;

  const openMenu = () => {
    setMenuOpen(true);
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.stagger(
        55,
        [...bubbleAnims].reverse().map((anim) =>
          Animated.spring(anim, {
            toValue: 1,
            tension: 65,
            friction: 7,
            useNativeDriver: true,
          }),
        ),
      ),
    ]).start();
  };

  const closeMenu = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.parallel(
        bubbleAnims.map((anim) =>
          Animated.timing(anim, {
            toValue: 0,
            duration: 160,
            useNativeDriver: true,
          }),
        ),
      ),
    ]).start(() => {
      setMenuOpen(false);
      callback?.();
    });
  };

  const handleCompanionPress = () => {
    if (menuOpen) {
      closeMenu();
      return;
    }

    openMenu();
  };

  const handleAction = (key: string) => {
    if (key === "new") {
      closeMenu(() => setTimeout(() => router.navigate("/new"), 50));
    } else if (key === "companion") {
      closeMenu(() =>
        setTimeout(() => router.navigate("/change-companion"), 50),
      );
    } else if (key === "close") {
      closeMenu();
    }
  };

  return {
    menuOpen,
    overlayOpacity,
    MENU_ITEMS,
    bubbleAnims,
    handleAction,
    handleCompanionPress,
    closeMenu,
  };
}
