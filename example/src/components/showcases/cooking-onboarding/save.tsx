import Feather from '@expo/vector-icons/Feather';
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

export const Save: FC<Props> = ({ isOnboardingDone, triggerRef }) => {
  const { colors } = useTheme();

  return (
    <Popover>
      <Popover.Trigger ref={triggerRef}>
        <Button
          className={cn(
            className.buttonSecondarySquare,
            className.buttonSecondaryColors
          )}
          onPress={isOnboardingDone ? simulatePress : undefined}
          isIconOnly
        >
          <Feather name="heart" size={16} color={colors.foreground} />
        </Button>
      </Popover.Trigger>
      <Popover.Portal progressAnimationConfigs={progressAnimationConfigs}>
        <Popover.Content className={className.popoverContent}>
          <Popover.Arrow stroke={colors.foreground} fill={colors.foreground} />
          <AppText className={className.popoverText}>
            Save your favorite recipes to your collection
          </AppText>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};
