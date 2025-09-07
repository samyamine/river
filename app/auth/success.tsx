import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";


export default function CreationAccountSucessPage() {

    return (
        <View className="flex-1 justify-center items-center  bg-white  px-8">
            <Ionicons name="checkmark-circle-outline" size={(150)} color="green" />
            <Text className="text-3xl font-agathoblack  mt-4">Account Created!</Text>
            <Text className="text-center text-gray-400 mt-4">Your account has been successfully created. You can now continue to your profile.</Text>
            <Pressable
                onPress={() => router.push('/profile')}
                className="mt-4 bg-primaryColor rounded-lg py-3 items-center w-full"
            >
                <Text className="text-white font-agathobold text-lg px-4">Continue</Text>
            </Pressable>
        </View>
    );
}
