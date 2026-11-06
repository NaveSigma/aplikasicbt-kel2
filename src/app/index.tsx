import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useExam } from "@/context/ExamContext";

const examInfo = [
  { title: "10 Soal", description: "Pilihan ganda A sampai D" },
  { title: "60 Menit", description: "Waktu berjalan otomatis" },
  { title: "Nilai 100", description: "Nilai muncul setelah selesai" },
];

export default function StartScreen() {
  const router = useRouter();
  const { startExam } = useExam();
  const [name, setName] = useState("");
  const canStart = name.trim().length > 0;

  const handleStart = () => {
    if (!canStart) {
      return;
    }

    startExam(name);
    router.replace("/exam");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.hero}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoText}>CBT</Text>
            </View>
            <Text style={styles.title}>Ujian Online</Text>
            <Text style={styles.subtitle}>
              Kerjakan soal dengan teliti dan jangan lupa cek kembali jawabanmu
              sebelum menyelesaikan ujian.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Nama Peserta</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Masukkan nama lengkap"
              placeholderTextColor="#94A3B8"
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="go"
              onSubmitEditing={handleStart}
              style={styles.input}
            />
            <Text style={styles.hint}>
              Nama akan ditampilkan pada halaman hasil ujian.
            </Text>
          </View>

          <View style={styles.infoList}>
            {examInfo.map((item, index) => (
              <View key={item.title} style={styles.infoItem}>
                <View style={styles.infoNumber}>
                  <Text style={styles.infoNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.infoTextWrapper}>
                  <Text style={styles.infoTitle}>{item.title}</Text>
                  <Text style={styles.infoDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: !canStart }}
            disabled={!canStart}
            onPress={handleStart}
            style={({ pressed }) => [
              styles.startButton,
              !canStart && styles.startButtonDisabled,
              pressed && canStart && styles.startButtonPressed,
            ]}
          >
            <Text
              style={[
                styles.startButtonText,
                !canStart && styles.startButtonTextDisabled,
              ]}
            >
              Mulai Ujian
            </Text>
          </Pressable>

          <Text style={styles.footerNote}>
            Pastikan koneksi dan perangkatmu siap sebelum memulai.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 28,
    gap: 20,
  },
  hero: {
    alignItems: "center",
    gap: 10,
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    maxWidth: 320,
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    color: "#64748B",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4EAF3",
    padding: 18,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  input: {
    marginTop: 4,
    borderWidth: 1.5,
    borderColor: "#DBE3EF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#0F172A",
    backgroundColor: "#F8FAFC",
  },
  hint: {
    fontSize: 12,
    color: "#94A3B8",
  },
  infoList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4EAF3",
    padding: 16,
    gap: 14,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoNumber: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  infoNumberText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2563EB",
  },
  infoTextWrapper: {
    flex: 1,
    gap: 2,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  infoDescription: {
    fontSize: 13,
    color: "#64748B",
  },
  startButton: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  startButtonDisabled: {
    backgroundColor: "#E2E8F0",
  },
  startButtonPressed: {
    opacity: 0.85,
  },
  startButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  startButtonTextDisabled: {
    color: "#94A3B8",
  },
  footerNote: {
    textAlign: "center",
    fontSize: 12,
    color: "#94A3B8",
  },
});
