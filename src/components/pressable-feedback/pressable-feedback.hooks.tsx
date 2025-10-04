import { useSharedValue } from 'react-native-reanimated';
import type { RippleValue } from './pressable-feedback.types';

/**
 * Hook to create and manage a ripple value instance
 */
export function useRippleValue(): RippleValue {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);
    const centerX = useSharedValue(0);
    const centerY = useSharedValue(0);
    const radius = useSharedValue(0);
    const active = useSharedValue(0);

    return {
        scale,
        opacity,
        centerX,
        centerY,
        radius,
        active,
    };
}