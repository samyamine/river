import countriesDict from "@/assets/utils/countries.json";
import BackButton from '@/components/back_button';
import { router } from "expo-router";
import { fetch } from "expo/fetch";
import { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import AntDesign from '@expo/vector-icons/AntDesign';
import { white } from "@/assets/utils/colors";
import LoadingCircle from "@/components/loading_circle";


interface ICountry {
    iso: string,
    name: string,
    prefix: string,
}

const countries: ICountry[] = Object.values(countriesDict).map(country => ({
    iso: country.iso2.toLowerCase(),
    name: country.name,
    prefix: `+${country.prefix}`,
}));

const fetchAPI = async (completePhoneNumber: string) => {
    console.log(`CALL ${completePhoneNumber}`);

    const response = await fetch("http://51.83.79.164:8000/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({phone_number: completePhoneNumber})
    });

    return await response.json();
};


export default function AuthPage() {
    const inputRef = useRef<TextInput>(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(countries.find(country => country.iso === "fr") as ICountry);
    const isPhoneComplete = phoneNumber.replace(/[^0-9]/g, '').length >= 10;

    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 550);

        return () => clearTimeout(timer);
    }, []);

    const sendPhoneNumber = async (prefix: string, phoneNumber: string) => {
        setIsLoading(true);
        const completePhoneNumber = `${prefix}${phoneNumber.replace(/\s+/g, "")}`;
        const code = await fetchAPI(completePhoneNumber);

        console.log(code);

        setIsLoading(false);
        router.push(`/auth/otp_code?phone_number=${encodeURIComponent(completePhoneNumber)}`);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setOpen(false) }} accessible={false}>
                <View className="w-full flex-1 p-5">
                    <View className='py-2 mb-5'>
                        <BackButton />
                    </View>

                    <View className="w-full pt-12 flex-grow justify-start gap-6">
                        <Text className='font-agathobold text-4xl'>Type your phone number</Text>
                        <Text className='text-primaryGray-400'>Please enter a valid phone number. We will send you a 4-digit code to verify your account</Text>

                        <View className="h-12 flex-row border border-primaryGray-200 rounded-lg overflow-hidden">
                            <Pressable
                                onPress={() => {
                                    Keyboard.dismiss();
                                    setOpen(!open);
                                }}
                                className="px-2 flex-row items-center gap-2 bg-primaryGray-200">
                                <View className="rounded-sm overflow-hidden">
                                    <CountryFlag isoCode={selectedCountry.iso} size={15} />
                                </View>
                                <Text>{selectedCountry.prefix}</Text>
                            </Pressable>
                            <TextInput
                                ref={inputRef}
                                className="flex-1 px-3"
                                placeholder="Enter phone number"
                                placeholderTextColor={"#B0A9AA"}
                                keyboardType="numeric"
                                value={phoneNumber}
                                maxLength={14}
                                onChangeText={(text) => {
                                    const digitsOnly = text.replace(/[^0-9]/g, '');
                                    //space every 2 digits
                                    const formatted = digitsOnly.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
                                    setPhoneNumber(formatted);
                                }}
                            />
                        </View>

                        {/* Dropdown */}
                        {open && (
                            <ScrollView className="w-full rounded-lg max-h-52 border border-primaryGray-200 bg-white">
                                {countries.map((country, index) => (
                                    <Pressable
                                        key={index}
                                        onPress={() => {
                                            setSelectedCountry(country);
                                            setOpen(false);
                                            inputRef.current?.focus();
                                        }}
                                        className="px-3 py-2 flex-row items-center gap-3 border-b border-primaryGray-300">
                                        <View className="rounded-sm overflow-hidden">
                                            <CountryFlag isoCode={country.iso} size={18} />
                                        </View>
                                        <Text>{country.name} ({country.prefix})</Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        )}

                        <Pressable
                            disabled={!isPhoneComplete}
                            onPress={() => sendPhoneNumber(selectedCountry.prefix, phoneNumber)} 
                            className={`w-full ${isLoading ? "py-[12.5px]" : "py-4"} rounded-2xl ${isPhoneComplete ? "bg-primaryColor" : "bg-primaryGray-100"}`}>
                                {isLoading ? (
                                    <View className="flex justify-center items-center">
                                        <LoadingCircle />
                                    </View>
                                ) : (
                                    <Text className={`text-center font-agathobold text-2xl leading-6 ${isPhoneComplete ? "text-white" : "text-primaryGray-400"}`}>Send verification code</Text>
                                )}
                        </Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
