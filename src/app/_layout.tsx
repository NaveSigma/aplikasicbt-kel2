import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ExamProvider } from "@/context/ExamContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ExamProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#F4F7FB" },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="exam" options={{ gestureEnabled: false }} />
          <Stack.Screen name="result" options={{ gestureEnabled: false }} />
        </Stack>
      </ExamProvider>
    </SafeAreaProvider>
  );
}
