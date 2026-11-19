import Ionicons from '@expo/vector-icons/Ionicons';
import { useLingui } from '@lingui/react/macro';
import {
  BottomSheet,
  Button,
  useBottomSheetAnimation,
  type BottomSheetRef,
} from 'heroui-native';
import { useRef } from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

/** Three resting sizes, so dragging moves the sheet between them. */
const DETENTS = [0.5, 0.7, 0.9];

/**
 * Reads the live sheet values. `useBottomSheetAnimation` only works inside
 * `BottomSheet`, so this lives in the sheet content.
 */
const SheetValues = () => {
  const { t } = useLingui();
  const { progress, animatedIndex, animatedDetent } = useBottomSheetAnimation();

  /** Grows in as the sheet presents and shrinks away as it is dragged out */
  const iconStyle = useAnimatedStyle(() => ({
    opacity: progress.get(),
    transform: [{ scale: interpolate(progress.get(), [0, 1], [0.4, 1]) }],
  }));

  /** Fills with the sheet's height as a fraction of the screen */
  const detentBarStyle = useAnimatedStyle(() => ({
    width: `${animatedDetent.get() * 100}%`,
  }));

  /** Rotates a quarter turn per detent, following the drag in between */
  const indexStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(
          animatedIndex.get(),
          [0, DETENTS.length - 1],
          [0, 180],
          Extrapolation.CLAMP
        )}deg`,
      },
    ],
  }));

  return (
    <BottomSheet.Body className="gap-6">
      <Animated.View
        style={iconStyle}
        className="size-16 self-center items-center justify-center rounded-full bg-accent/10"
      >
        <StyledIonicons name="pulse" size={32} className="text-accent" />
      </Animated.View>
      <View className="gap-2">
        <BottomSheet.Description>{t`Sheet height`}</BottomSheet.Description>
        <View className="h-2 rounded-full bg-default overflow-hidden">
          <Animated.View
            style={detentBarStyle}
            className="h-full rounded-full bg-accent"
          />
        </View>
      </View>
      <View className="flex-row items-center gap-3">
        <Animated.View style={indexStyle}>
          <StyledIonicons
            name="arrow-forward"
            size={24}
            className="text-foreground"
          />
        </Animated.View>
        <BottomSheet.Description className="flex-1">
          {t`Points right at the first detent and turns as you drag up.`}
        </BottomSheet.Description>
      </View>
    </BottomSheet.Body>
  );
};

/**
 * Drives Reanimated styles from the sheet's live position: `progress` while
 * it presents and dismisses, `animatedDetent` for its height, and
 * `animatedIndex` between detents.
 */
export const AnimatedValuesContent = () => {
  const { t } = useLingui();
  const sheetRef = useRef<BottomSheetRef>(null);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Button variant="secondary" onPress={() => sheetRef.current?.present()}>
          <Button.Label maxFontSizeMultiplier={1.2}>
            {t`Animated with the sheet`}
          </Button.Label>
        </Button>
        <BottomSheet ref={sheetRef} detents={DETENTS}>
          <BottomSheet.Content>
            <BottomSheet.Header className="mb-6 gap-2">
              <BottomSheet.Title>{t`Live sheet values`}</BottomSheet.Title>
              <BottomSheet.Description>
                {t`Drag the sheet between its three sizes.`}
              </BottomSheet.Description>
            </BottomSheet.Header>
            <SheetValues />
          </BottomSheet.Content>
        </BottomSheet>
      </View>
    </View>
  );
};
