import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

export default function Timer() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds === 0) return; 
    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-bold text-red-500">
        {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
      </Text>
    </View>
  );
}

