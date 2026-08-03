import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Image } from "expo-image";
import { theme } from "@/theme";
import { usePlantStore } from "@/store/planStore";
import { PlantlyButton } from "@/components/PlantlyButton";
import { useRouter } from "expo-router";
import { PlantCard } from "@/components/PlanCard";
import { useUserStore } from "@/store/userStore";
import { ICON_SOURCES } from "@/utils/icon";
import useBubbleMenu from "@/utils/bubbleMenu";

const COMPANION_SIZE = 64;
const BUBBLE_SIZE = 52;

export default function App() {
  const router = useRouter();
  const plants = usePlantStore((state) => state.plants);
  const companionIcon = useUserStore((state) => state.companionIcon);
  const bubbleMenu = useBubbleMenu();
  const {
    menuOpen,
    overlayOpacity,
    MENU_ITEMS,
    bubbleAnims,
    handleAction,
    handleCompanionPress,
    closeMenu,
  } = bubbleMenu;

  return (
    <View style={styles.wrapper}>
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

      {/* Bubble menu overlay */}
      {menuOpen && (
        <>
          {/* Dim backdrop */}
          <TouchableWithoutFeedback onPress={() => closeMenu()}>
            <Animated.View
              style={[styles.backdrop, { opacity: overlayOpacity }]}
            />
          </TouchableWithoutFeedback>

          {/* Bubbles animating up from the companion icon */}
          {MENU_ITEMS.map(
            (
              item: { key: string; label: string; emoji: string },
              index: number,
            ) => {
              const anim = bubbleAnims[index];
              const bottomOffset =
                16 +
                COMPANION_SIZE +
                16 +
                (MENU_ITEMS.length - 1 - index) * (BUBBLE_SIZE + 14);
              const rightOffset = 16 + COMPANION_SIZE / 2 - BUBBLE_SIZE / 2;

              return (
                <Animated.View
                  key={item.key}
                  style={[
                    styles.bubbleRow,
                    {
                      bottom: bottomOffset,
                      right: rightOffset,
                      opacity: anim,
                      transform: [
                        {
                          translateY: anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [20, 0],
                          }),
                        },
                        {
                          scale: anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.6, 1],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <View style={styles.labelContainer}>
                    <Text style={styles.bubbleLabel}>{item.label}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.bubble}
                    onPress={() => handleAction(item.key)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.bubbleEmoji}>{item.emoji}</Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            },
          )}
        </>
      )}

      {companionIcon && ICON_SOURCES[companionIcon] ? (
        <TouchableOpacity
          style={styles.companionContainer}
          activeOpacity={0.8}
          onPress={handleCompanionPress}
        >
          <Image
            source={ICON_SOURCES[companionIcon]}
            style={styles.companionIcon}
            contentFit="contain"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colorParchment,
  },
  container: {
    flex: 1,
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
  companionContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 10,
  },
  companionIcon: {
    width: COMPANION_SIZE,
    height: COMPANION_SIZE,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colorOpacityBlack,
  },
  bubbleRow: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bubble: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    backgroundColor: theme.colorForestTeal,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colorBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  bubbleEmoji: {
    fontSize: 22,
  },

  labelContainer: {
    backgroundColor: theme.colorParchment,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: theme.colorBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  bubbleLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colorForestTeal,
  },
});
