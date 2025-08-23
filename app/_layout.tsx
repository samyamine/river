import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "./global.css";

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "agatho-bold": require("../assets/fonts/Agatho_Bold.otf"),
    "agatho-boldCAPS": require("../assets/fonts/Agatho_BoldCAPS.otf"),
    "agatho-light": require("../assets/fonts/Agatho_Light.otf"),
    "agatho-lightCAPS": require("../assets/fonts/Agatho_LightCAPS.otf"),
    "agatho-medium": require("../assets/fonts/Agatho_Medium.otf"),
    "agatho-narrow": require("../assets/fonts/Agatho_Narrow.otf"),
    "agatho-regular": require("../assets/fonts/Agatho_Regular.otf"),
    "agatho-regularCAPS": require("../assets/fonts/Agatho_RegularCAPS.otf"),
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
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <Stack.Screen name="concepts" options={{ headerShown: false }}/>
      </Stack>
    </>

  );
}
