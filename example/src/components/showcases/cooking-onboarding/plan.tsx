import Entypo from '@expo/vector-icons/Entypo';
import {
  Button,
  cn,
  Popover,
  useTheme,
  type PopoverTriggerRef,
} from 'heroui-native';
import { type FC, type RefObject } from 'react';
import { simulatePress } from '../../../helpers/utils/simulate-press';
import { AppText } from '../../app-text';
import { progressAnimationConfigs } from './constants';
import { className } from './styles';

type Props = {
  isOnboardingDone: boolean;
  triggerRef: RefObject<PopoverTriggerRef | null>;
};

export const Plan: FC<Props> = ({ isOnboardingDone, triggerRef }) => {
  const { colors } = useTheme();

  return (
    <Popover>
      <Popover.Trigger ref={triggerRef}>
        <Button
          className={cn(
            className.buttonSecondaryLayout,
            className.buttonSecondaryColors
          )}
          onPress={isOnboardingDone ? simulatePress : undefined}
        >
          <Entypo name="plus" size={16} color="#fdba74" />
          <AppText className="text-lg text-foreground font-semibold">
            Plan
          </AppText>
        </Button>
      </Popover.Trigger>
      <Popover.Portal progressAnimationConfigs={progressAnimationConfigs}>
        <Popover.Content className={className.popoverContent} placement="top">
          <Popover.Arrow stroke={colors.foreground} fill={colors.foreground} />
          <AppText className={className.popoverText}>
            Create and organize your meal plans
          </AppText>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};
