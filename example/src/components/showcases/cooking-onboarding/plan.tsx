import Entypo from '@expo/vector-icons/Entypo';
import {
  Button,
  cn,
  Popover,
  useThemeColor,
  type PopoverTriggerRef,
} from 'heroui-native';
import { type FC, type RefObject } from 'react';
import { withUniwind } from 'uniwind';
import { simulatePress } from '../../../helpers/utils/simulate-press';
import { AppText } from '../../app-text';
import { className } from './styles';

const StyledEntypo = withUniwind(Entypo);

type Props = {
  isOnboardingDone: boolean;
  triggerRef: RefObject<PopoverTriggerRef | null>;
};

export const Plan: FC<Props> = ({ isOnboardingDone, triggerRef }) => {
  const themeColorForeground = useThemeColor('foreground');

  return (
    <Popover>
      <Popover.Trigger ref={triggerRef}>
        <Button
          variant="secondary"
          className={cn(
            className.buttonSecondaryLayout,
            className.buttonSecondaryColors
          )}
          onPress={isOnboardingDone ? simulatePress : undefined}
        >
          <StyledEntypo name="plus" size={16} className="text-orange-300" />
          <AppText className="text-lg text-foreground font-semibold">
            Plan
          </AppText>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          presentation="popover"
          className={className.popoverContent}
          placement="top"
        >
          <Popover.Arrow
            stroke={themeColorForeground}
            fill={themeColorForeground}
          />
          <AppText className={className.popoverText}>
            Create and organize your meal plans
          </AppText>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};
