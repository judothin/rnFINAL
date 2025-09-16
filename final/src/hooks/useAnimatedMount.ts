import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function useAnimatedMount(duration = 350) {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration, useNativeDriver: true }).start();
  }, [duration]);
  return opacity;
}
