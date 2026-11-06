import { StyleSheet, Text, View } from "react-native";

interface TimerBadgeProps {
  remainingSeconds: number;
}

function formatTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function TimerBadge({ remainingSeconds }: TimerBadgeProps) {
  const isRunningOut = remainingSeconds <= 5 * 60;

  return (
    <View style={[styles.badge, isRunningOut && styles.badgeDanger]}>
      <View style={[styles.dot, isRunningOut && styles.dotDanger]} />
      <Text
        style={[styles.time, isRunningOut && styles.timeDanger]}
        accessibilityLabel={`Sisa waktu ${formatTime(remainingSeconds)}`}
      >
        {formatTime(remainingSeconds)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#EAF2FF",
    borderWidth: 1,
    borderColor: "#C9DDFF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  badgeDanger: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2563EB",
  },
  dotDanger: {
    backgroundColor: "#DC2626",
  },
  time: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1D4ED8",
    fontVariant: ["tabular-nums"],
    letterSpacing: 0.5,
  },
  timeDanger: {
    color: "#DC2626",
  },
});
