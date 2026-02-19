import { Ionicons } from '@expo/vector-icons';
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
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledIonicons = withUniwind(Ionicons);

// ------------------------------------------------------------------------------

const BasicContent = () => {
  return (
    <View className="flex-1 justify-center px-5">
      <AppText className="text-sm text-muted mb-2 ml-2">Account</AppText>
      <ListGroup className="mb-6">
        <ListGroup.Item>
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
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Notifications</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>
              Alerts, sounds, badges
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix />
        </ListGroup.Item>
        <Separator className="mx-4" />
        <ListGroup.Item>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Privacy & Security</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>
              Two-factor auth, app lock
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix />
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
      <AppText className="text-sm text-muted mb-2 ml-2">Account</AppText>
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

const WithIconsContent = () => {
  const mutedColor = useThemeColor('muted');

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full">
        <ListGroup>
          <ListGroup.Item>
            <ListGroup.ItemPrefix>
              <StyledIonicons
                name="person-outline"
                size={22}
                className="text-foreground"
              />
            </ListGroup.ItemPrefix>
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>Profile</ListGroup.ItemTitle>
              <ListGroup.ItemDescription>
                Name, photo, bio
              </ListGroup.ItemDescription>
            </ListGroup.ItemContent>
            <ListGroup.ItemSuffix />
          </ListGroup.Item>
          <Separator className="mx-4" />
          <ListGroup.Item>
            <ListGroup.ItemPrefix>
              <StyledIonicons
                name="lock-closed-outline"
                size={22}
                className="text-foreground"
              />
            </ListGroup.ItemPrefix>
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>Security</ListGroup.ItemTitle>
              <ListGroup.ItemDescription>
                Password, 2FA
              </ListGroup.ItemDescription>
            </ListGroup.ItemContent>
            <ListGroup.ItemSuffix />
          </ListGroup.Item>
          <Separator className="mx-4" />
          <ListGroup.Item>
            <ListGroup.ItemPrefix>
              <StyledIonicons
                name="cloud-outline"
                size={22}
                className="text-foreground"
              />
            </ListGroup.ItemPrefix>
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>Storage</ListGroup.ItemTitle>
              <ListGroup.ItemDescription>
                12.4 GB of 50 GB used
              </ListGroup.ItemDescription>
            </ListGroup.ItemContent>
            <ListGroup.ItemSuffix iconProps={{ size: 18, color: mutedColor }} />
          </ListGroup.Item>
        </ListGroup>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TitleOnlyContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full">
        <ListGroup variant="transparent">
          <ListGroup.Item>
            <ListGroup.ItemPrefix>
              <StyledIonicons
                name="wifi-outline"
                size={22}
                className="text-foreground"
              />
            </ListGroup.ItemPrefix>
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>Wi-Fi</ListGroup.ItemTitle>
            </ListGroup.ItemContent>
            <ListGroup.ItemSuffix />
          </ListGroup.Item>
          <Separator className="mx-4" />
          <ListGroup.Item>
            <ListGroup.ItemPrefix>
              <StyledIonicons
                name="bluetooth-outline"
                size={22}
                className="text-foreground"
              />
            </ListGroup.ItemPrefix>
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>Bluetooth</ListGroup.ItemTitle>
            </ListGroup.ItemContent>
            <ListGroup.ItemSuffix />
          </ListGroup.Item>
          <Separator className="mx-4" />
          <ListGroup.Item>
            <ListGroup.ItemPrefix>
              <StyledIonicons
                name="cellular-outline"
                size={22}
                className="text-foreground"
              />
            </ListGroup.ItemPrefix>
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>Cellular</ListGroup.ItemTitle>
            </ListGroup.ItemContent>
            <ListGroup.ItemSuffix />
          </ListGroup.Item>
        </ListGroup>
      </View>
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
            <StyledIonicons
              name="moon-outline"
              size={22}
              className="text-foreground"
            />
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>Dark mode</ListGroup.ItemTitle>
            </ListGroup.ItemContent>
            <ControlField.Indicator />
          </ControlField>
          <Separator className="mx-4" />
          <ListGroup.Item>
            <ListGroup.ItemPrefix>
              <StyledIonicons
                name="language-outline"
                size={22}
                className="text-foreground"
              />
            </ListGroup.ItemPrefix>
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>Language</ListGroup.ItemTitle>
              <ListGroup.ItemDescription>English</ListGroup.ItemDescription>
            </ListGroup.ItemContent>
            <ListGroup.ItemSuffix>
              <StyledIonicons
                name="arrow-forward"
                size={18}
                className="text-muted"
              />
            </ListGroup.ItemSuffix>
          </ListGroup.Item>
          <Separator className="mx-4" />
          <ListGroup.Item>
            <ListGroup.ItemPrefix>
              <StyledIonicons
                name="notifications-outline"
                size={22}
                className="text-foreground"
              />
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
    value: 'with-icons',
    label: 'With icons',
    content: <WithIconsContent />,
  },
  {
    value: 'title-only',
    label: 'Title only',
    content: <TitleOnlyContent />,
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
