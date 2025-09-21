import { white } from '@/assets/utils/colors';
import { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';


export default function LoadingCircle() {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const size = 24;
    const strokeWidth = 2;
    const gapPercent = 0.2; // 20% gap

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * gapPercent;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,             // rotate from 0 to 1
                duration: 700,         // 3 seconds per rotation
                easing: Easing.linear,  // smooth linear rotation
                useNativeDriver: true,  // important for performance
            })
        ).start();
    }, []);

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],  // full circle
    });

    return (
        <Animated.View style={{ transform: [{ rotate: rotation }]}}>
            <Svg width={size} height={size}>
                <Circle 
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={white}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={`${circumference - dashOffset} ${dashOffset}`} />
            </Svg>
        </Animated.View>
    );
}
