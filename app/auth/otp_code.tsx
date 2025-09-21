import BackButton from "@/components/back_button";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

const RESEND_TIMEOUT = 60;

const fetchAPI = async (completePhoneNumber: string) => {
    const response = await fetch("http://51.83.79.164:8000/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({phone_number: completePhoneNumber})
    });

    await response.json();
};

export default function VerificationCodePage() {
    const { phone_number } = useLocalSearchParams();
    const [pin, setPin] = useState("");
    const [seconds, setSeconds] = useState(RESEND_TIMEOUT);
    const hiddenInputRef = useRef<TextInput>(null);
    const isPinComplete = pin.length === 4;

    // Keyboard appearance
    useEffect(() => {
        const timer = setTimeout(() => {
            hiddenInputRef.current?.focus();
        }, 550);

        return () => clearTimeout(timer);
    }, []);


    // Countdown timer
    useEffect(() => {
        let interval: number | null = null;

        if (seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prev => prev - 1);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [seconds]);


    // Reset countdown
    const handleResend = async () => {
        setSeconds(RESEND_TIMEOUT);
        await fetchAPI(phone_number as string);
    };


    const handleChange = (text: string) => {
        setPin(text.replace(/[^0-9]/g, "").slice(0, 4))

        if (text.length === 4) {
            hiddenInputRef.current?.blur();
        }
    };


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}>
            <TouchableWithoutFeedback onPress={() => hiddenInputRef.current?.blur()}>
                <View className="w-full flex-1 p-5">
                    <View className='py-2 mb-5'>
                        <BackButton />
                    </View>

                    <View className="w-full pt-12 flex-grow justify-start gap-6">
                        <Text className="font-agathobold text-4xl">Enter your verification code</Text>

                        <TextInput
                            ref={hiddenInputRef}
                            value={pin}
                            onChangeText={handleChange}
                            keyboardType="number-pad"
                            maxLength={4}
                            textContentType="oneTimeCode"
                            autoComplete="sms-otp"
                            style={{ position: "absolute", opacity: 0, height: 0 }}/>


                        <View className="flex-row gap-2 justify-center px-4">
                            {[0, 1, 2, 3].map((index) => (
                                <Pressable key={index} onPress={() => hiddenInputRef.current?.focus()}>
                                    <View className={`w-16 h-24 justify-center items-center border-2 rounded-xl ${(pin.length === index) || (index === 3 && pin.length > 3) ? "border-primaryColor" : "border-primaryGray-200"}`}>
                                        <Text className="text-3xl">{pin[index] ?? ""}</Text>
                                    </View>
                                </Pressable>
                            ))}
                        </View>

                        <Link href="/auth/success" asChild>
                            <Pressable disabled={!isPinComplete} className={`w-full py-4 rounded-2xl ${isPinComplete ? "bg-primaryColor" : "bg-primaryGray-100"}`}>
                                <Text className={`text-center font-agathobold text-2xl leading-6 ${isPinComplete ? "text-white" : "text-primaryGray-400"}`}>Continue</Text>
                            </Pressable>
                        </Link>

                        <View className="w-full flex justify-center">
                            {seconds !== 0 ? (
                                <Text className="text-primaryGray-400 text-center">
                                    Resend available in{" "}
                                    <Text className="text-primaryColor font-bold">
                                        {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
                                    </Text>
                                </Text>
                            ) : (
                                <Pressable className="self-center" onPress={handleResend}>
                                    <Text className="text-primaryColor text-center underline">Resend code</Text>
                                </Pressable>
                            )}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
