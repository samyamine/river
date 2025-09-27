import { primaryColor } from "@/assets/utils/colors";
import { postAPI } from "@/assets/utils/functions";
import BackButton from "@/components/back_button";
import LoadingCircle from "@/components/loading_circle";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from "expo-haptics";
import { Animated } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

const RESEND_TIMEOUT = 60;

export default function VerificationCodePage() {
    const { phone_number } = useLocalSearchParams();
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [seconds, setSeconds] = useState(RESEND_TIMEOUT);
    const hiddenInputRef = useRef<TextInput>(null);
    const opacity = useRef(new Animated.Value(0)).current;
    const timerRef = useRef<number | null>(null);

    const isPinComplete = pin.length === 4;

    // Keyboard appearance
    useEffect(() => {
        const timer = setTimeout(() => {
            hiddenInputRef.current?.focus();
        }, 550);

        return () => clearTimeout(timer);
    }, []);


    const fadeOut = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setError("");
        });
    };


    // Trigger fade in/out when error changes
    useEffect(() => {
        if (error.length > 0) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();

            // Auto dismiss after 5s
            if (timerRef.current) { 
                clearTimeout(timerRef.current);
            }

            timerRef.current = setTimeout(() => fadeOut(), 5000);
        }
    }, [error]);


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
        await postAPI({
            endpoint: "code",
            body: {phone_number: phone_number as string},
        });
    };


    const handleChange = (text: string) => {
        setPin(text.replace(/[^0-9]/g, "").slice(0, 4))

        if (text.length === 4) {
            hiddenInputRef.current?.blur();
        }
    };


    const verifyOTP = async () => {
        setIsLoading(true);

        const response = await postAPI({
            endpoint: "verify-otp",
            body: {phone_number: phone_number as string, otp: pin},
        });

        if (response.status === "not verified") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

            setError(response.description);
            setIsLoading(false);
        }
        else {
            try {
                await AsyncStorage.setItem('session', response.token);
                setIsLoading(false);
                router.push(`/auth/success`);
            } catch (e) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

                setError("Unable to create a session");
                setIsLoading(false);
            }
        }
    };


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}>
            <TouchableWithoutFeedback onPress={() => hiddenInputRef.current?.blur()}>
                <View className="w-full flex-1 p-5">
                    {error.length > 0 && (
                        <Animated.View style={{ opacity: opacity }} className="w-full absolute top-5 left-5 z-[999]">
                            <Pressable
                                onPress={fadeOut} 
                                className={`w-full p-5 rounded-2xl flex-row items-center gap-2 shadow-md shadow-primaryGray-200 bg-white`}>
                                    <Ionicons name="close-circle" size={28} color={primaryColor} />
                                    <Text className="text-xl text-primaryBlack">Error: {error}</Text>
                            </Pressable>
                        </Animated.View>
                    )}

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

                        {/* <Link href="/auth/success" asChild> */}
                        <Pressable
                            disabled={!isPinComplete}
                            onPress={verifyOTP}
                            className={`w-full ${isLoading ? "py-[12.5px]" : "py-4"} rounded-2xl ${isPinComplete ? "bg-primaryColor" : "bg-primaryGray-100"}`}>
                                {isLoading ? (
                                    <View className="flex justify-center items-center">
                                        <LoadingCircle />
                                    </View>
                                ) : (
                                    <Text className={`text-center font-agathobold text-2xl leading-6 ${isPinComplete ? "text-white" : "text-primaryGray-400"}`}>Continue</Text>
                                )}
                        </Pressable>

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
