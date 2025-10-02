import Feather from '@expo/vector-icons/Feather';
import { cn, Popover, useTheme, type PopoverTriggerRef } from 'heroui-native';
import { type FC, type RefObject } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { simulatePress } from '../../../helpers/utils/simulate-press';
import { AppText } from '../../app-text';
import { progressAnimationConfigs } from './constants';
import { className } from './styles';

type Props = {
  isOnboardingDone: boolean;
  triggerRef: RefObject<PopoverTriggerRef | null>;
};

export const Save: FC<Props> = ({ isOnboardingDone, triggerRef }) => {
  const insets = useSafeAreaInsets();

  const { colors } = useTheme();

  return (
    <Popover>
      <Popover.Trigger ref={triggerRef}>
        <Pressable
          className={cn(
            className.buttonSecondarySquare,
            className.buttonSecondaryColors
          )}
          style={styles.borderCurve}
          onPress={isOnboardingDone ? simulatePress : undefined}
        >
          <Feather name="heart" size={16} color={colors.foreground} />
        </Pressable>
      </Popover.Trigger>
      <Popover.Portal progressAnimationConfigs={progressAnimationConfigs}>
        <Popover.Content
          offset={insets.top + 47}
          className={className.popoverContent}
        >
          <Popover.Arrow stroke={colors.foreground} fill={colors.foreground} />
          <AppText className={className.popoverText}>
            Save your favorite recipes to your collection
          </AppText>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
