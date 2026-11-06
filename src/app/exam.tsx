import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { ScrollViewInstance } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OptionButton } from "@/components/OptionButton";
import { QuestionNav } from "@/components/QuestionNav";
import { TimerBadge } from "@/components/TimerBadge";
import { useExam } from "@/context/ExamContext";
import type { OptionKey } from "@/types";
import { questions } from "@/data/questions";
import { useTimer } from "@/hooks/useTimer";

const EXAM_DURATION_SECONDS = 60 * 60;
const OPTION_KEYS: OptionKey[] = ["A", "B", "C", "D"];

export default function ExamScreen() {
  const router = useRouter();
  const { name, answers, startedAt, setAnswer } = useExam();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollViewInstance>(null);
  const submittingRef = useRef(false);

  const finishExam = useCallback(() => {
    if (submittingRef.current) {
      return;
    }

    submittingRef.current = true;
    router.replace("/result");
  }, [router]);

  const remainingSeconds = useTimer({
    startedAt,
    durationSeconds: EXAM_DURATION_SECONDS,
    onFinish: finishExam,
  });

  useEffect(() => {
    if (startedAt === null) {
      router.replace("/");
    }
  }, [startedAt, router]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true,
    );

    return () => subscription.remove();
  }, []);

  const currentQuestion = questions[currentIndex];
  const unansweredCount = questions.reduce(
    (total, question) => (answers[question.id] === undefined ? total + 1 : total),
    0,
  );

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const handleFinish = () => {
    const message =
      unansweredCount > 0
        ? `Masih ada ${unansweredCount} soal belum dijawab. Yakin selesai?`
        : "Semua soal sudah dijawab. Yakin ingin menyelesaikan ujian?";

    Alert.alert("Konfirmasi Selesai", message, [
      { text: "Batal", style: "cancel" },
      { text: "Ya, Selesai", style: "destructive", onPress: finishExam },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.progressLabel}>
            Soal {currentIndex + 1} dari {questions.length}
          </Text>
          <Text style={styles.participantName} numberOfLines={1}>
            {name}
          </Text>
        </View>
        <TimerBadge remainingSeconds={remainingSeconds} />
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <View style={styles.questionNumberBadge}>
              <Text style={styles.questionNumberText}>{currentIndex + 1}</Text>
            </View>
            <Text style={styles.questionText}>{currentQuestion.text}</Text>
          </View>

          <View
            style={styles.options}
            accessibilityRole="radiogroup"
            accessibilityLabel={`Pilihan jawaban soal nomor ${currentIndex + 1}`}
          >
            {OPTION_KEYS.map((optionKey) => (
              <OptionButton
                key={optionKey}
                optionKey={optionKey}
                text={currentQuestion.options[optionKey]}
                selected={answers[currentQuestion.id] === optionKey}
                onPress={() => setAnswer(currentQuestion.id, optionKey)}
              />
            ))}
          </View>
        </View>

        <QuestionNav
          questions={questions}
          answers={answers}
          currentIndex={currentIndex}
          onSelect={goToQuestion}
        />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.navigationRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: currentIndex === 0 }}
            disabled={currentIndex === 0}
            onPress={() => goToQuestion(currentIndex - 1)}
            style={({ pressed }) => [
              styles.navButton,
              currentIndex === 0 && styles.navButtonDisabled,
              pressed && currentIndex > 0 && styles.buttonPressed,
            ]}
          >
            <Text
              style={[
                styles.navButtonText,
                currentIndex === 0 && styles.navButtonTextDisabled,
              ]}
            >
              Sebelumnya
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityState={{
              disabled: currentIndex === questions.length - 1,
            }}
            disabled={currentIndex === questions.length - 1}
            onPress={() => goToQuestion(currentIndex + 1)}
            style={({ pressed }) => [
              styles.navButton,
              currentIndex === questions.length - 1 &&
                styles.navButtonDisabled,
              pressed &&
                currentIndex < questions.length - 1 &&
                styles.buttonPressed,
            ]}
          >
            <Text
              style={[
                styles.navButtonText,
                currentIndex === questions.length - 1 &&
                  styles.navButtonTextDisabled,
              ]}
            >
              Berikutnya
            </Text>
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={handleFinish}
          style={({ pressed }) => [
            styles.finishButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.finishButtonText}>Finish</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  },
  headerInfo: {
    flex: 1,
    gap: 2,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  participantName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
  },
  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E4EAF3",
    padding: 18,
    gap: 18,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  questionHeader: {
    gap: 12,
  },
  questionNumberBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  questionNumberText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#2563EB",
  },
  questionText: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: "600",
    color: "#0F172A",
  },
  options: {
    gap: 10,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 10,
    backgroundColor: "#F4F7FB",
    borderTopWidth: 1,
    borderTopColor: "#E4EAF3",
  },
  navigationRow: {
    flexDirection: "row",
    gap: 10,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#C9DDFF",
    backgroundColor: "#FFFFFF",
  },
  navButtonDisabled: {
    borderColor: "#E4EAF3",
    backgroundColor: "#F8FAFC",
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2563EB",
  },
  navButtonTextDisabled: {
    color: "#CBD5E1",
  },
  finishButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: "#DC2626",
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});
