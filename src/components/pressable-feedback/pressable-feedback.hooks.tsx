import { useSharedValue } from 'react-native-reanimated';
import type { RippleValue } from './pressable-feedback.types';
import { useMemo } from 'react';

/**
 * Hook to create and manage a ripple value instance
 */
export function useRippleValue(): RippleValue {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);
    const locationX = useSharedValue(0);
    const locationY = useSharedValue(0);
    const radius = useSharedValue(0);
    const active = useSharedValue(0);

    return useMemo(() => ({
        scale,
        opacity,
        locationX,
        locationY,
        radius,
        active,
    }), [scale, opacity, locationX, locationY, radius, active]);
}

/**
 * Hook to create and manage a ripple pool
 */
export function useRipplePool(): RippleValue[] {
    const ripplePool = [useRippleValue(), useRippleValue(), useRippleValue()];
    return useMemo(() => ripplePool, ripplePool);
}
