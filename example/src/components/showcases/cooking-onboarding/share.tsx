import Feather from '@expo/vector-icons/Feather';
import { Popover, useTheme, type PopoverTriggerRef } from 'heroui-native';
import { type FC, type RefObject } from 'react';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { simulatePress } from '../../../helpers/utils/simulate-press';
import { AppText } from '../../app-text';

type Props = {
  isOnboardingDone: boolean;
  triggerRef: RefObject<PopoverTriggerRef | null>;
};

export const Share: FC<Props> = ({ isOnboardingDone, triggerRef }) => {
  const insets = useSafeAreaInsets();

  const { colors } = useTheme();

  return (
    <Popover>
      <Popover.Trigger ref={triggerRef}>
        <Pressable
          className="bg-surface-2 w-10 h-10 rounded-md justify-center items-center"
          onPress={isOnboardingDone ? simulatePress : triggerRef.current?.open}
        >
          <Feather name="share" size={16} color={colors.foreground} />
        </Pressable>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content offset={insets.top + 45}>
          <Popover.Arrow />
          <AppText className="text-foreground">
            This is a basic popover with simple content
          </AppText>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};
