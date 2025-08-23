import { primaryBlack, primaryColor, white } from '@/assets/utils/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1, backgroundColor: white}}>
                <Tabs screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: white }}}>
                    <Tabs.Screen name='index' options={{ title: 'Home', tabBarActiveTintColor: primaryColor, tabBarInactiveTintColor: primaryBlack, tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "home-sharp" : "home-outline"} size={24} color={color} />
                    )}} />
                    <Tabs.Screen name='about' options={{ title: 'About', tabBarActiveTintColor: primaryColor, tabBarInactiveTintColor: primaryBlack, }} />
                    <Tabs.Screen name='flirts' options={{ title: 'Flirts', tabBarActiveTintColor: primaryColor, tabBarInactiveTintColor: primaryBlack, tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "sparkles": "sparkles-outline"} size={24} color={color} />
                    )}} />
                    <Tabs.Screen name='profile' options={{ title: 'Profil', tabBarActiveTintColor: primaryColor, tabBarInactiveTintColor: primaryBlack, tabBarIcon: ({ color, focused }) => (
                        <FontAwesome name={focused ? "user-circle" : "user-circle-o"} size={24} color={color} />
                    )}} />
                </Tabs>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
