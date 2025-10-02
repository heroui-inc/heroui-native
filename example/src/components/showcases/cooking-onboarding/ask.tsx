import Ionicons from '@expo/vector-icons/Ionicons';
import { cn, Popover, useTheme, type PopoverTriggerRef } from 'heroui-native';
import { type FC, type RefObject } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { simulatePress } from '../../../helpers/utils/simulate-press';
import { AppText } from '../../app-text';
import { progressAnimationConfigs } from './constants';
import { className } from './styles';

type Props = {
  isOnboardingDone: boolean;
  triggerRef: RefObject<PopoverTriggerRef | null>;
};

export const Ask: FC<Props> = ({ isOnboardingDone, triggerRef }) => {
  const { colors } = useTheme();

  return (
    <Popover>
      <Popover.Trigger ref={triggerRef}>
        <Pressable
          className={cn(
            className.buttonSecondaryLayout,
            className.buttonSecondaryColors
          )}
          style={styles.borderCurve}
          onPress={isOnboardingDone ? simulatePress : undefined}
        >
          <Ionicons name="sparkles-sharp" size={14} color="#fdba74" />
          <AppText className="text-lg text-foreground font-semibold">
            Ask
          </AppText>
        </Pressable>
      </Popover.Trigger>
      <Popover.Portal progressAnimationConfigs={progressAnimationConfigs}>
        <Popover.Content
          className={cn(className.popoverContent, 'w-[240px]')}
          placement="top"
        >
          <Popover.Arrow stroke={colors.foreground} fill={colors.foreground} />
          <AppText className={className.popoverText}>
            Chat with AI to get recipe suggestions and cooking tips
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
