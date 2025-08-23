import React from "react";
import { Text } from "react-native";

export default function MainTitle({children}: {children: React.ReactNode}) {
    return (
        <Text className='text-5xl font-agathomedium'>{children}</Text>
    );
}