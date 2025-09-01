import { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import CountryFlag from "react-native-country-flag";
import { Link, router } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { primaryColor } from "@/assets/utils/colors";


export default function SignUpPhonePage() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState({ code: "+1", label: "United States" , flag: <CountryFlag isoCode="us" size={10}/>});
    const [phone, setPhone] = useState("");

    const countries = [
        { code: "+1", label: "United States", flag: <CountryFlag isoCode="us" size={10} /> },
        { code: "+44", label: "United Kingdom", flag: <CountryFlag isoCode="gb" size={10} /> },
        { code: "+61", label: "Australia", flag: <CountryFlag isoCode="au" size={10} /> },
        { code: "+49", label: "Germany", flag: <CountryFlag isoCode="de" size={10} /> },
        { code: "+33", label: "France", flag: <CountryFlag isoCode="fr" size={10} /> },
    ];
    const navigation = useNavigation();

    return (
        

        <View className="flex-1   mx-4 ">
            
            <View>
                <Pressable
                    onPress={() => navigation.goBack()}    
                    className="border border-red-100 p-4 rounded-lg w-16 h-16 mb-8"
                >
                    <Ionicons name="arrow-back" size={24} color={primaryColor} />
                </Pressable>
            </View>
            <View>
                
            </View>
            
            <View className="mt-8">
                <Text className="text-2xl font-semibold my-4 ">Enter your phone number</Text>
                <Text className="mb-5 text-black/50">Plese enter a valid phone number. We will send you a 4-digit code to verify your account</Text>
                <View className="flex-row border border-gray-300 rounded-lg overflow-hidden">
                    <Pressable
                        onPress={() => setOpen(!open)}
                        className="px-3 justify-center bg-gray-200 p-2"
                    >
                        <Text> {selected.flag} {selected.code}</Text>
                    </Pressable>
                    <TextInput
                        className="flex-1 px-3"
                        placeholder="Enter phone number"
                        keyboardType="numeric"
                        value={phone}
                        maxLength={14}
                        onChangeText={(text) => {
                            const digitsOnly = text.replace(/[^0-9]/g, '');
                            //space every 2 digits
                            const formatted = digitsOnly.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
                            setPhone(formatted);
                        }}
                    />
                </View>

                {/* Dropdown */}
                {open && (
                    <ScrollView className="mt-2 bg-white rounded-lg max-h-52 border border-gray-300">
                        {countries.map((country, index) => (
                            <Pressable
                                key={index}
                                onPress={() => {
                                    setSelected(country);
                                    setOpen(false);
                                }}
                                className="px-3 py-2 border-b border-gray-200"
                            >
                                <Text>{country.flag} {country.label} ({country.code})</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                )}

                <Pressable
                    onPress={() => router.push('/concepts/verificationcode_page')}
                    className="mt-4 bg-primaryColor rounded-lg py-3 items-center ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-pink-700"
                >
                    <Text className="text-white font-semibold px-4">Send verification code</Text>
                </Pressable>


            </View>
        </View>
    );
}

