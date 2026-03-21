import Ionicons from '@expo/vector-icons/Ionicons';
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

const StyledIonicons = withUniwind(Ionicons);

type Props = {
  isOnboardingDone: boolean;
  triggerRef: RefObject<PopoverTriggerRef | null>;
};

export const Ask: FC<Props> = ({ isOnboardingDone, triggerRef }) => {
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
          <StyledIonicons
            name="sparkles-sharp"
            size={14}
            className="text-orange-300"
          />
          <AppText className="text-lg text-foreground font-semibold">
            Ask
          </AppText>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          presentation="popover"
          className={cn(className.popoverContent, 'w-[240px]')}
          placement="top"
        >
          <Popover.Arrow
            stroke={themeColorForeground}
            fill={themeColorForeground}
          />
          <AppText className={className.popoverText}>
            Chat with AI to get recipe suggestions and cooking tips
          </AppText>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};
