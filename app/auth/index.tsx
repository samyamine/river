import countriesDict from "@/assets/utils/countries.json";
import BackButton from '@/components/back_button';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import CountryFlag from "react-native-country-flag";

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


export default function AuthPage() {
    const inputRef = useRef<TextInput>(null);
    const dropdownRef = useRef<View>(null);
    const selectorRef = useRef<TextInput>(null);
    const [open, setOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(countries.find(country => country.iso === "fr") as ICountry);

    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 522);

        return () => clearTimeout(timer);
    }, []);

    console.log(open);
    

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); setOpen(false)}} accessible={false}>
            <View className="flex-1 p-5">
                {/* FIXME: Return button */}
                <View className='py-2 mb-5'>
                    <BackButton />
                </View>

                <View className="mt-16 gap-4">
                    <Text className='font-agathobold text-3xl'>Enter your phone number</Text>
                    <Text className='text-primaryGray-400'>Please enter a valid phone number. We will send you a 4-digit code to verify your account</Text>

                    <View className="h-12 flex-row border border-primaryGray-200 rounded-lg overflow-hidden">
                        <Pressable 
                            onPress={() => {
                                Keyboard.dismiss();
                                setOpen(!open);
                            }}
                            className="px-2 flex-row items-center gap-2 bg-primaryGray-200">
                            <View className="rounded-sm overflow-hidden">
                                <CountryFlag isoCode={selectedCountry.iso} size={25} />
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
                        <ScrollView className="bg-white rounded-lg max-h-52 border border-primaryGray-200">
                            {countries.map((country, index) => (
                                <Pressable 
                                    key={index}
                                    onPress={() => {
                                        setSelectedCountry(country);
                                        setOpen(false);
                                    }}
                                    className="px-3 py-2 flex-row items-center gap-3 border-b border-primaryGray-300">
                                    <View className="rounded-sm overflow-hidden">
                                        <CountryFlag isoCode={country.iso} size={25} />
                                    </View>
                                    <Text>{country.name} ({country.prefix})</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    )}

                    <Pressable onPress={() => console.log("FIXME")} className="w-full p-3 rounded-lg bg-primaryColor">
                        <Text className="text-white text-center font-bold">
                            Send verification code
                        </Text>
                </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
