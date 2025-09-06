import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { Pressable } from "react-native";

export default function BackButton() {
    return (
        <Pressable className='w-12 h-12 flex justify-center items-center' onPress={() => router.back()}>
            <Entypo name="chevron-thin-left" size={24} color="black" />
        </Pressable>
    );
}

