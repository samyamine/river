import BackButton from "@/components/back_button";
import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

const RESEND_TIMEOUT = 60;

export default function VerificationCodePage() {
    const [pin, setPin] = useState(["", "", "", ""]);
    const [seconds, setSeconds] = useState(RESEND_TIMEOUT);
    const [isFinished, setIsFinished] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(0);


    const inputs = [
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
    ];

    // Countdown timer
    useEffect(() => {
        if (seconds === 0) {
            return;
        }

        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev === 1) {
                    clearInterval(interval);
                    setIsFinished(true);
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleChange = (text: string, index: number) => {
        const newPin = [...pin];
        newPin[index] = text;
        setPin(newPin);

        // Move to next input automatically
        if (text && index < inputs.length - 1) {
            inputs[index + 1].current?.focus();
        } else if (!text && index > 0) {
            inputs[index - 1].current?.focus();
        }
    };

    // Reset countdown
    const handleResend = () => {
        setSeconds(RESEND_TIMEOUT);
        setIsFinished(false);
    };

    const isPinComplete = pin.every((digit) => digit !== "");

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="w-full flex-1 p-5">
                    <View className='py-2 mb-5'>
                        <BackButton />
                    </View>

                    <View className="w-full pt-12 flex-grow justify-start gap-6">
                        <Text className="font-agathobold text-4xl">Enter your verification code</Text>
                        <View className="flex-row gap-2 justify-center px-4">
                            {pin.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={inputs[index]}
                                    value={digit}
                                    onChangeText={(text) => handleChange(text, index)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    className={`w-16 h-24 text-center text-3xl border-2 ${focusedIndex === index ? "border-primaryColor" : "border-primaryGray-200"} rounded-xl`}
                                />
                            ))}
                        </View>

                        <Link href="/auth/sucess" asChild>
                            <Pressable disabled={!isPinComplete} className={`w-full py-4 rounded-2xl ${isPinComplete ? "bg-primaryColor" : "bg-primaryGray-100"}`}>
                                <Text className={`text-center font-agathobold text-2xl leading-6 ${isPinComplete ? "text-white" : "text-primaryGray-400"}`}>Continue</Text>
                            </Pressable>
                        </Link>

                        <View className="w-full flex justify-center">
                            {!isFinished ? (
                                <Text className="text-primaryGray-400 text-center">
                                    Resend available in{" "}
                                    <Text className="text-primaryColor font-bold">
                                        {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
                                    </Text>
                                </Text>
                            ) : (
                                <Pressable className="self-center">
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
