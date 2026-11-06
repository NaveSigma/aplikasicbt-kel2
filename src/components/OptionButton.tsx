import { Pressable, StyleSheet, Text, View } from "react-native";

import type { OptionKey } from "@/types";

interface OptionButtonProps {
  optionKey: OptionKey;
  text: string;
  selected: boolean;
  onPress: () => void;
}

export function OptionButton({
  optionKey,
  text,
  selected,
  onPress,
}: OptionButtonProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={`Pilihan ${optionKey}: ${text}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        selected && styles.buttonSelected,
        pressed && styles.buttonPressed,
      ]}
    >
      <View style={[styles.letterBadge, selected && styles.letterBadgeSelected]}>
        <Text style={[styles.letter, selected && styles.letterSelected]}>
          {optionKey}
        </Text>
      </View>
      <Text style={[styles.text, selected && styles.textSelected]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#DBE3EF",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  buttonSelected: {
    backgroundColor: "#EFF6FF",
    borderColor: "#2563EB",
  },
  buttonPressed: {
    opacity: 0.75,
  },
  letterBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#D8E0EC",
  },
  letterBadgeSelected: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  letter: {
    fontSize: 15,
    fontWeight: "700",
    color: "#475569",
  },
  letterSelected: {
    color: "#FFFFFF",
  },
  text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: "#1E293B",
  },
  textSelected: {
    color: "#1D4ED8",
    fontWeight: "600",
  },
});
