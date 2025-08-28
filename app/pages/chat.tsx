import { primaryBlack, white } from '@/assets/utils/colors';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from "expo-blur";
import { Link, router } from "expo-router";
import { useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type TestDataType = {sender: string, message: string, timestamp: number}

const TEST_DATA: TestDataType[] = [
    {sender: "Ouiam", message: "Hey there ! How are you Samy ?", timestamp: 1756051264},
    {sender: "me", message: "Hello Ouiam ! I am doing good what about you ?", timestamp: 1756051264},
    {sender: "Ouiam", message: "I am doing great thanks !", timestamp: 1756051264},
    {sender: "Ouiam", message: "Do you have time to chat now ?", timestamp: 1756051264},
    {sender: "me", message: "Of course I can !", timestamp: 1756051264},
    {sender: "me", message: "I am happy to be chatting with you :) Tell me, what is your ideal type of man for a love relationship ? I am interested in this because I have no specific criteria. I am open-minded :)", timestamp: 1756051264},
    {sender: "me", message: "Of course I can !", timestamp: 1756051264},
];

const renderItem = ({item}: {item: TestDataType}) => {
    const date = new Date(item.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (item.sender === "me") {
        return (
            <View className='w-full mb-2 flex-row justify-end'>
                <View className='max-w-[66%] p-3 gap-2 rounded-xl rounded-br-none bg-primaryColor'>
                    <Text className='text-lg leading-6 text-white'>{item.message}</Text>
                    <View className='flex-row justify-end items-center gap-3'>
                        <Text className='text-right text-sm text-white'>{date}</Text>
                        <Ionicons name="checkmark-done-outline" size={18} color={white} />
                    </View>
                </View>
            </View>
        );
    }
    else {
        return (
            <View className='max-w-[66%] p-3 mb-2 gap-2 rounded-xl rounded-bl-none bg-gray-50'>
                <Text className='text-lg leading-6 text-primaryBlack'>{item.message}</Text>
                <Text className='text-right text-sm text-primaryBlack'>{date}</Text>
            </View>
        );
    }
};

export default function ChatPage() {
    const [text, setText] = useState("");
    const [inputHeight, setInputHeight] = useState(40);

    const MIN_INPUT_HEIGHT = 40;
    const MAX_INPUT_HEIGHT = 120;

    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === "ios" ? "padding" : "height"} // "padding" is best for iOS, "height" for Android
            keyboardVerticalOffset={20}>
            {/* FIXME: Header */}
            <View className="w-full px-5 pt-2 pb-3">
                <View className="w-full flex-row justify-between items-center gap-4">
                    <Pressable className='pr-4 py-2' onPress={() => router.back()}>
                        <Entypo name="chevron-thin-left" size={24} color="black" />
                    </Pressable>
                    <Link href={"./profile"} className='flex-1'>
                        <View className='flex-row justify-start items-center gap-4'>
                            <View className="w-16 h-16 rounded-full overflow-hidden">
                                <Image source={{ uri: "https://i.pinimg.com/736x/6b/16/2d/6b162dccddf34dbc4b0040d911d3046f.jpg" }} className="w-full h-full" />
                                <BlurView intensity={30} tint="light" className="absolute w-full h-full rounded-full" />
                            </View>
                            <Text className="text-primaryBlack font-agathobold text-3xl">Ouiam</Text>
                        </View>
                    </Link>
                    <View className="w-12 h-12 flex justify-center items-center rounded-full bg-primaryGray-50">
                        <Entypo name="dots-three-vertical" size={24} color="black" />
                    </View>
                </View>
            </View>

            {/* <Image source={{ uri: "https://i.pinimg.com/736x/6b/16/2d/6b162dccddf34dbc4b0040d911d3046f.jpg" }} className="w-24 h-24" /> */}

            {/* FIXME: Content */}
            <View className='flex-1 bg-primaryGray-100'>
                <FlatList inverted data={TEST_DATA.reverse()} renderItem={renderItem} contentContainerStyle={{ paddingTop: 10, paddingBottom: 10, paddingHorizontal: 20 }} />
            </View>


            {/* FIXME: Footer */}
            <View className='w-full max-w-full min-h-20 px-5 pt-3 pb-2 flex-row justify-between items-center gap-4 bg-white'>
                <Pressable className='w-12 h-12 flex justify-center items-center rounded-full bg-primaryColor'>
                    <Ionicons name="sparkles" size={18} color={white} />
                </Pressable>
                <TextInput 
                    className='px-3 py-2 w-full h-12 shrink rounded-full bg-white border border-primaryBlack'
                    // style={{ height: Math.min(inputHeight, 120) }}
                    placeholderTextColor={primaryBlack} 
                    onChangeText={setText} 
                    value={text} 
                    placeholder='Ecris ton message ici...'
                    textAlignVertical="center"
                    scrollEnabled={true}
                    multiline
                    
                    onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)} />
                <Pressable className='w-12 h-12 flex justify-center items-center rounded-full bg-primaryBlack'>
                    <Ionicons name="send" size={18} color={white} />
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlignVertical: "top", // important pour Android
  },
});
