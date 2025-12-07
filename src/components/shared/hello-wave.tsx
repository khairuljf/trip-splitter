import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

export function HelloWave() {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotation, { toValue: 25, duration: 160, useNativeDriver: true }),
        Animated.timing(rotation, { toValue: -5, duration: 160, useNativeDriver: true }),
        Animated.timing(rotation, { toValue: 0, duration: 160, useNativeDriver: true }),
      ]),
      { iterations: 4 },
    ).start();
  }, [rotation]);

  const animatedStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [-30, 30],
          outputRange: ['-30deg', '30deg'],
        }),
      },
    ],
  };

  return (
    <Animated.Text style={[styles.wave, animatedStyle]}>
      👋
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  wave: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
