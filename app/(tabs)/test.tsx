import { Text, View } from 'react-native';
import AuthPage from '../auth';


export default function OtherPage() {
    return (
        <View className='flex-1 p-5'>
            <Text className='text-5xl font-agathomedium'></Text>
            <AuthPage />
        </View>
    );
}   