import { primaryColor } from "@/assets/utils/colors";
import BackButton from "@/components/back_button";
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const RESEND_TIMEOUT = 60;
export default function VerificationCodePage() {
    const [pin, setPin] = useState(["", "", "", ""]);
    const [seconds, setSeconds] = useState(RESEND_TIMEOUT);
    const [isFinished, setIsFinished] = useState(false);


    const inputs = [
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
    ];

    // Countdown timer
    useEffect(() => {
        if (seconds === 0) {
            setIsFinished(true);
            return;
        }

        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev === 1) {
                    clearInterval(interval);
                    setIsFinished(true);
                    return 0;
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
        <View className="flex-1  bg-white py-12 px-8">
            <View className="mt-12 pt-12">
                <View className='py-2 mb-5'>
                    <BackButton />
                </View>
            </View>
            <Text className="text-3xl font-agathoblack  mb-4">Enter your verification Code</Text>
            <View className="flex-row gap-2 mb-4 justify-center p-4">
                {pin.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={inputs[index]}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        className="w-14 h-14 text-center text-xl border-2 border-primaryColor rounded-xl"
                    />
                ))}
            </View>
            {!isFinished ? (
                <Text className="text-gray-500 mb-2">
                    Resend available in{" "}
                    <Text className="text-pink-600 font-bold">
                        {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
                    </Text>
                </Text>
            ) : (
                <Text className="text-green-600 mb-2">
                    You can resend the code now
                </Text>
            )}
            <Pressable
                onPress={() => router.push('/auth/sucess')}
                disabled={!isPinComplete}
                className={`mt-4 rounded-lg py-3 items-center ${isPinComplete ? "bg-primaryColor" : "bg-gray-300"
                    }`}
            >
                <Text className="text-white text-lg font-agathobold px-4">Continue</Text>
            </Pressable>
            <Pressable
                onPress={handleResend}
                disabled={!isFinished}
                className={`mt-3 px-6 py-3 rounded-lg  items-center ${isFinished ? "bg-primaryColor" : "bg-gray-300"
                    }`}
            >
                <Text
                    className={`text-white text-lg font-agathobold items-center ${!isFinished ? "text-opacity-50" : ""
                        }`}
                >
                    Resend Code
                </Text>
            </Pressable>
        </View>
    );
}
