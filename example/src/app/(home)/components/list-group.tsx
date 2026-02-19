import {
  Chip,
  ControlField,
  ListGroup,
  PressableFeedback,
  Separator,
  useThemeColor,
} from 'heroui-native';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { BellIcon } from '../../../components/icons/bell';
import { CreditCardIcon } from '../../../components/icons/credit-card';
import { GlobeIcon } from '../../../components/icons/globe';
import { MoonIcon } from '../../../components/icons/moon';
import { PaletteIcon } from '../../../components/icons/palette';
import { PersonIcon } from '../../../components/icons/person';

const BasicContent = () => {
  const mutedColor = useThemeColor('muted');

  return (
    <View className="flex-1 justify-center px-5">
      <AppText className="text-sm text-muted mb-2 ml-2">Account</AppText>
      <ListGroup className="mb-6">
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <PersonIcon size={20} colorClassName="accent-foreground" />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Personal Info</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>
              Name, email, phone number
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix />
        </ListGroup.Item>
        <Separator className="mx-4" />
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <CreditCardIcon size={20} colorClassName="accent-foreground" />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Payment Methods</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>
              Visa ending in 4829
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix />
        </ListGroup.Item>
      </ListGroup>
      <AppText className="text-sm text-muted mb-2 ml-2">Preferences</AppText>
      <ListGroup>
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <PaletteIcon size={20} colorClassName="accent-foreground" />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Appearance</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>
              Theme, font size, display
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix />
        </ListGroup.Item>
        <Separator className="mx-4" />
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <BellIcon size={20} colorClassName="accent-foreground" />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Notifications</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>
              Alerts, sounds, badges
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix iconProps={{ size: 18, color: mutedColor }} />
        </ListGroup.Item>
      </ListGroup>
    </View>
  );
};

// ------------------------------------------------------------------------------

interface PressableListGroupItemProps {
  /** Primary text label */
  title: string;
  /** Secondary descriptive text */
  description?: string;
  /** Called when the item is pressed */
  onPress?: () => void;
  /** Custom trailing content; defaults to a chevron icon when omitted */
  suffix?: ReactNode;
  /** Custom leading content rendered before the title/description */
  prefix?: ReactNode;
}

/**
 * Reusable list-group row wrapped in PressableFeedback with scale + ripple.
 * Combines PressableFeedback (animation disabled on root), PressableFeedback.Scale,
 * ListGroup.Item, and PressableFeedback.Ripple into a single composable unit.
 */
const PressableListGroupItem = ({
  title,
  description,
  onPress,
  suffix,
  prefix,
}: PressableListGroupItemProps) => {
  return (
    <PressableFeedback animation={false} onPress={onPress}>
      <PressableFeedback.Scale>
        <ListGroup.Item>
          {prefix !== undefined && (
            <ListGroup.ItemPrefix>{prefix}</ListGroup.ItemPrefix>
          )}
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>{title}</ListGroup.ItemTitle>
            {description !== undefined && (
              <ListGroup.ItemDescription>
                {description}
              </ListGroup.ItemDescription>
            )}
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix>{suffix}</ListGroup.ItemSuffix>
        </ListGroup.Item>
      </PressableFeedback.Scale>
      <PressableFeedback.Ripple />
    </PressableFeedback>
  );
};

const WithPressableFeedbackContent = () => {
  return (
    <View className="flex-1 justify-center px-5">
      <ListGroup>
        <PressableListGroupItem
          title="Appearance"
          description="Theme, font size, display"
          onPress={() => console.log('Appearance')}
        />
        <Separator className="mx-4" />
        <PressableListGroupItem
          title="Notifications"
          description="Alerts, sounds, badges"
          onPress={() => console.log('Notifications')}
        />
        <Separator className="mx-4" />
        <PressableListGroupItem
          title="Privacy & Security"
          description="Two-factor auth, app lock"
          onPress={() => console.log('Privacy & Security')}
        />
      </ListGroup>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithCustomSuffixContent = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full">
        <ListGroup>
          <ControlField
            isSelected={isDarkMode}
            onSelectedChange={setIsDarkMode}
            className="flex-row items-center gap-3 py-4 px-4"
          >
            <MoonIcon size={18} colorClassName="accent-foreground" />
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>Dark mode</ListGroup.ItemTitle>
            </ListGroup.ItemContent>
            <ControlField.Indicator />
          </ControlField>
          <Separator className="mx-4" />
          <ListGroup.Item>
            <ListGroup.ItemPrefix>
              <GlobeIcon size={18} colorClassName="accent-foreground" />
            </ListGroup.ItemPrefix>
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>Language</ListGroup.ItemTitle>
              <ListGroup.ItemDescription>English</ListGroup.ItemDescription>
            </ListGroup.ItemContent>
            <ListGroup.ItemSuffix>
              <AppText className="text-sm text-muted">Select</AppText>
            </ListGroup.ItemSuffix>
          </ListGroup.Item>
          <Separator className="mx-4" />
          <ListGroup.Item>
            <ListGroup.ItemPrefix>
              <BellIcon size={18} colorClassName="accent-foreground" />
            </ListGroup.ItemPrefix>
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>Notifications</ListGroup.ItemTitle>
            </ListGroup.ItemContent>
            <ListGroup.ItemSuffix>
              <Chip variant="primary" color="danger">
                <Chip.Label className="font-bold">7</Chip.Label>
              </Chip>
            </ListGroup.ItemSuffix>
          </ListGroup.Item>
        </ListGroup>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const LIST_GROUP_VARIANTS: UsageVariant[] = [
  {
    value: 'basic',
    label: 'Basic',
    content: <BasicContent />,
  },
  {
    value: 'with-pressable-feedback',
    label: 'With pressable feedback',
    content: <WithPressableFeedbackContent />,
  },
  {
    value: 'custom-suffix',
    label: 'Custom suffix',
    content: <WithCustomSuffixContent />,
  },
];

export default function ListGroupScreen() {
  return <UsageVariantFlatList data={LIST_GROUP_VARIANTS} />;
}
