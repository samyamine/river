import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

SplashScreen.preventAutoHideAsync();

const IS_LOGGED_IN = false;

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "agatho-black": require("../assets/fonts/Agatho_Black.otf"),
    "agatho-bold": require("../assets/fonts/Agatho_Bold.otf"),
    "agatho-light": require("../assets/fonts/Agatho_Light.otf"),
    "agatho-medium": require("../assets/fonts/Agatho_Medium.otf"),
    "agatho-narrow": require("../assets/fonts/Agatho_Narrow.otf"),
    "agatho-regular": require("../assets/fonts/Agatho_Regular.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={IS_LOGGED_IN}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
          <Stack.Screen name="concepts" options={{ headerShown: false }}/>
        </Stack.Protected>

        <Stack.Protected guard={!IS_LOGGED_IN}>
          <Stack.Screen name="index" options={{ headerShown: false }}/>
          <Stack.Screen name="auth" options={{ headerShown: false }}/>
        </Stack.Protected>
      </Stack>
    </SafeAreaProvider>

  );
}
