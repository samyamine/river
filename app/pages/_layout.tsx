import { white } from '@/assets/utils/colors';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PageLayout() {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: white}}>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: white }}} />
        </SafeAreaView>
    )
}
