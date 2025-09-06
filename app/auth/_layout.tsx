import { white } from "@/assets/utils/colors";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function AuthLayout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: white }}}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaView>
    );
}
