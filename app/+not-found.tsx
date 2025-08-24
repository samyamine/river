import { router, Stack } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops! Not Found' }} />
            <View className='flex-1 justify-center items-center bg-primaryBlack'>
                <Text className='mb-10 text-white'>PAGE NOT FOUND !</Text>
                <Pressable onPress={() => router.back()} className='px-4 py-3 rounded-xl bg-primaryColor'>
                    <Text className='text-white'>Go back to previous screen !</Text>
                </Pressable>
            </View>
        </>
    )
}
