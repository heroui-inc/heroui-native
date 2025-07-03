import React, { useCallback, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import type { SwitchProps } from './types';

export const Switch: React.FC<SwitchProps> = ({
  value = false,
  onValueChange,
  disabled = false,
  trackColorOn = '#4CD964',
  trackColorOff = '#e9e9e9',
  thumbColor = '#ffffff',
  style,
}) => {
  // Animation value for the thumb position
  const translateX = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  // Update animation when value changes
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 1 : 0,
      duration: 200,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [value, translateX]);

  // Handle toggle press
  const handleToggle = useCallback(() => {
    if (!disabled && onValueChange) {
      onValueChange(!value);
    }
  }, [disabled, value, onValueChange]);

  // Calculate interpolated values for animations
  const thumbTranslateX = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const trackBackgroundColor = value ? trackColorOn : trackColorOff;
  const opacity = disabled ? 0.5 : 1;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleToggle}
      disabled={disabled}
      style={[styles.container, style]}
    >
      <View
        style={[
          styles.track,
          { backgroundColor: trackBackgroundColor, opacity },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: thumbColor,
              transform: [{ translateX: thumbTranslateX }],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
});
