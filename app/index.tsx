import { primaryBlack } from '@/assets/utils/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IndexPage() {
    return (
        <View className="w-full h-full justify-center items-center">
            <Image source={require('@/assets/images/index_illustration3.jpg')} style={{ width: "100%", height: "100%" }} contentFit='cover' />

            <LinearGradient
                colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.2)", "rgba(0,0,0,1)"]}
                locations={[0, 0.45, 1]}
                style={{
                position: "absolute",
                bottom: 0,
                height: "100%",
                width: "100%",
                }}
            />

            <SafeAreaView className='w-full h-full p-5 flex justify-between absolute'>
                <View className='mt-6'>
                    <Image source={require('@/assets/images/logo/primary_logo.svg')} style={{ width: "50%", height: 55 }} contentFit='contain' />
                </View>


                <View className='gap-3'>
                    <Text className='text-2xl font-bold font-agathobold text-white'>River is full of serious people in search of their true love.</Text>
                    <Link href="/auth" asChild>
                        <Pressable className="w-full py-4 rounded-2xl bg-primaryColor">
                            <Text className="text-center font-agathobold text-2xl text-white leading-6">Continue with phone number</Text>
                        </Pressable>
                    </Link>

                    <View className='w-full flex-row justify-between items-center gap-3'>
                        <Pressable className='py-4 flex-grow flex justify-center rounded-2xl bg-white'>
                            <AntDesign name="google" size={24} color={primaryBlack} className='text-center' />
                        </Pressable>

                        <Pressable className='py-4 flex-grow rounded-2xl bg-white'>
                            <AntDesign name="apple1" size={24} color={primaryBlack} className='text-center' />
                        </Pressable>
                    </View>

                    <Text className='text-sm text-gray-500'>
                        By signing up for River, you agree to our <Link href={"https://www.google.fr"} className='text-white'>Terms of Service</Link>.
                        Learn how we process your data in our <Link href={"https://www.google.fr"} className='text-white'>Privacy Policy</Link>.
                    </Text>
                </View>
            </SafeAreaView>
        </View>
    );
}
