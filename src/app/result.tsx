import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useExam } from "@/context/ExamContext";
import { questions } from "@/data/questions";
import { calculateScore } from "@/utils/scoring";

export default function ResultScreen() {
  const router = useRouter();
  const { name, answers, resetExam } = useExam();
  const result = useMemo(
    () => calculateScore(questions, answers),
    [answers],
  );

  const handleBackToStart = () => {
    resetExam();
    router.replace("/");
  };

  const message =
    result.score >= 80
      ? "Kerja bagus, pertahankan hasilmu!"
      : result.score >= 60
        ? "Hasil yang baik, terus tingkatkan!"
        : "Jangan menyerah, terus belajar dan coba lagi!";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Hasil Ujian</Text>
          <Text style={styles.name} numberOfLines={2}>
            {name || "Peserta"}
          </Text>
          <Text style={styles.message}>{message}</Text>
        </View>

        <View style={styles.scoreCard}>
          <View style={styles.scoreCircle}>
            <Text style={styles.score}>{result.score}</Text>
            <Text style={styles.scoreMax}>dari 100</Text>
          </View>
          <Text style={styles.scoreLabel}>Nilai Akhir</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.correctCard]}>
            <Text style={[styles.statValue, styles.correctValue]}>
              {result.correct}
            </Text>
            <Text style={styles.statLabel}>Benar</Text>
          </View>
          <View style={[styles.statCard, styles.wrongCard]}>
            <Text style={[styles.statValue, styles.wrongValue]}>
              {result.wrong}
            </Text>
            <Text style={styles.statLabel}>Salah</Text>
          </View>
          <View style={[styles.statCard, styles.emptyCard]}>
            <Text style={[styles.statValue, styles.emptyValue]}>
              {result.unanswered}
            </Text>
            <Text style={styles.statLabel}>Kosong</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total soal</Text>
            <Text style={styles.summaryValue}>{questions.length}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Jawaban benar</Text>
            <Text style={styles.summaryValue}>{result.correct}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Jawaban salah</Text>
            <Text style={styles.summaryValue}>{result.wrong}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tidak dijawab</Text>
            <Text style={styles.summaryValue}>{result.unanswered}</Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={handleBackToStart}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
        >
          <Text style={styles.backButtonText}>Kembali ke Awal</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 28,
    gap: 18,
  },
  header: {
    alignItems: "center",
    gap: 6,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#2563EB",
  },
  name: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },
  message: {
    maxWidth: 300,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
  },
  scoreCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E4EAF3",
    paddingVertical: 26,
    gap: 12,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  scoreCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 10,
    borderColor: "#DBEAFE",
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    fontSize: 58,
    lineHeight: 64,
    fontWeight: "800",
    color: "#1D4ED8",
  },
  scoreMax: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  scoreLabel: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#94A3B8",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 16,
    gap: 4,
  },
  correctCard: {
    backgroundColor: "#F0FDF4",
    borderColor: "#BBF7D0",
  },
  wrongCard: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  emptyCard: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
  },
  statValue: {
    fontSize: 26,
    fontWeight: "800",
  },
  correctValue: {
    color: "#15803D",
  },
  wrongValue: {
    color: "#DC2626",
  },
  emptyValue: {
    color: "#64748B",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4EAF3",
    paddingHorizontal: 18,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#64748B",
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEF2F7",
  },
  backButton: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  backButtonPressed: {
    opacity: 0.85,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
