import { Ionicons } from '@expo/vector-icons';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import * as Haptics from 'expo-haptics';
import { cn } from 'heroui-native';
import { type FC } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

export type SettingsButtonProps = {
  /** Called when the button is released, used to open the settings sheet */
  onPress: () => void;
  /** Accessible name for the button */
  accessibilityLabel: string;
};

/**
 * Header action that opens the settings bottom sheet.
 *
 * Mirrors the interaction of `ThemeToggle` (the opposite header action) so both
 * sides of the navigation bar feel identical: haptics fire on press-in and the
 * action itself runs on press-out.
 */
export const SettingsButton: FC<SettingsButtonProps> = ({
  onPress,
  accessibilityLabel,
}) => {
  const isLGAvailable = isLiquidGlassAvailable();

  return (
    <TouchableOpacity
      onPressIn={() => {
        if (Platform.OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      }}
      onPressOut={onPress}
      className={cn('p-3 z-50', isLGAvailable && 'px-2.5 py-2')}
      hitSlop={12}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <StyledIonicons
        name="settings-outline"
        size={20}
        className="text-foreground"
      />
    </TouchableOpacity>
  );
};
