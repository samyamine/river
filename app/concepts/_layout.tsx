import { Stack } from "expo-router";

export default function ConceptsLayout() {
  return (
    // <Stack screenOptions={{ contentStyle: { backgroundColor: '#F5F5F5' } }}>
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#EBEBEB' } }}>
      <Stack.Screen name="profile" options={{ headerShown: false }}/>
      <Stack.Screen name="verificationcode_page" options={{ headerShown: false }}/>
    </Stack>
  );
}
