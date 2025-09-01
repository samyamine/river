import { Text, View } from 'react-native';
import SignUpPhonePage from '../concepts/signup_phonenumber_page';

export default function OtherPage() {
    return (
        <View className='flex-1 p-5'>
            <Text className='text-5xl font-agathomedium'></Text>
            <SignUpPhonePage />
        </View>
    )
}