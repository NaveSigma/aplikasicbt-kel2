import { Pressable, StyleSheet, Text, View } from "react-native";

import type { Answers, Question } from "@/types";

interface QuestionNavProps {
  questions: Question[];
  answers: Answers;
  currentIndex: number;
  onSelect: (index: number) => void;
}

export function QuestionNav({
  questions,
  answers,
  currentIndex,
  onSelect,
}: QuestionNavProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Navigasi Soal</Text>
      <View style={styles.grid}>
        {questions.map((question, index) => {
          const isActive = index === currentIndex;
          const isAnswered = answers[question.id] !== undefined;

          return (
            <Pressable
              key={question.id}
              accessibilityRole="button"
              accessibilityLabel={`Soal nomor ${index + 1}${isAnswered ? ", sudah dijawab" : ", belum dijawab"}`}
              accessibilityState={{ selected: isActive }}
              onPress={() => onSelect(index)}
              style={({ pressed }) => [
                styles.item,
                isAnswered && styles.itemAnswered,
                isActive && styles.itemActive,
                pressed && styles.itemPressed,
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  isAnswered && styles.itemTextAnswered,
                  isActive && styles.itemTextActive,
                ]}
              >
                {index + 1}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendDotAnswered]} />
          <Text style={styles.legendText}>Sudah dijawab</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendDotActive]} />
          <Text style={styles.legendText}>Soal aktif</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4EAF3",
    padding: 16,
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  item: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1.5,
    borderColor: "#DBE3EF",
  },
  itemAnswered: {
    backgroundColor: "#DBEAFE",
    borderColor: "#93C5FD",
  },
  itemActive: {
    borderColor: "#1D4ED8",
    borderWidth: 2,
  },
  itemPressed: {
    opacity: 0.7,
  },
  itemText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#64748B",
  },
  itemTextAnswered: {
    color: "#1D4ED8",
  },
  itemTextActive: {
    color: "#0F172A",
    fontWeight: "800",
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
  },
  legendDotAnswered: {
    backgroundColor: "#DBEAFE",
    borderColor: "#93C5FD",
  },
  legendDotActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#1D4ED8",
    borderWidth: 2,
  },
  legendText: {
    fontSize: 12,
    color: "#64748B",
  },
});
