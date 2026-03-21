import Feather from '@expo/vector-icons/Feather';
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

const StyledFeather = withUniwind(Feather);

type Props = {
  isOnboardingDone: boolean;
  triggerRef: RefObject<PopoverTriggerRef | null>;
};

export const Save: FC<Props> = ({ isOnboardingDone, triggerRef }) => {
  const themeColorForeground = useThemeColor('foreground');

  return (
    <Popover>
      <Popover.Trigger ref={triggerRef}>
        <Button
          variant="secondary"
          className={cn(
            className.buttonSecondarySquare,
            className.buttonSecondaryColors
          )}
          onPress={isOnboardingDone ? simulatePress : undefined}
          isIconOnly
        >
          <StyledFeather name="heart" size={16} className="text-foreground" />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          presentation="popover"
          className={className.popoverContent}
        >
          <Popover.Arrow
            stroke={themeColorForeground}
            fill={themeColorForeground}
          />
          <AppText className={className.popoverText}>
            Save your favorite recipes to your collection
          </AppText>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};
