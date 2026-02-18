import { Ionicons } from '@expo/vector-icons';
import {
  Chip,
  ControlField,
  ListGroup,
  PressableFeedback,
  Separator,
  useThemeColor,
} from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledIonicons = withUniwind(Ionicons);

// ------------------------------------------------------------------------------

const BasicContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full">
        <ListGroup>
          <PressableFeedback onPress={() => console.log('General')}>
            <ListGroup.Item>
              <ListGroup.ItemContent>
                <ListGroup.ItemTitle>General</ListGroup.ItemTitle>
                <ListGroup.ItemDescription>
                  App language, appearance
                </ListGroup.ItemDescription>
              </ListGroup.ItemContent>
              <ListGroup.ItemSuffix />
            </ListGroup.Item>
            <PressableFeedback.Ripple />
          </PressableFeedback>
          <Separator className="mx-4" />
          <PressableFeedback onPress={() => console.log('Notifications')}>
            <ListGroup.Item>
              <ListGroup.ItemContent>
                <ListGroup.ItemTitle>Notifications</ListGroup.ItemTitle>
                <ListGroup.ItemDescription>
                  Push, email preferences
                </ListGroup.ItemDescription>
              </ListGroup.ItemContent>
              <ListGroup.ItemSuffix />
            </ListGroup.Item>
            <PressableFeedback.Ripple />
          </PressableFeedback>
          <Separator className="mx-4" />
          <ListGroup.Item>
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>Privacy</ListGroup.ItemTitle>
              <ListGroup.ItemDescription>
                Data sharing, permissions
              </ListGroup.ItemDescription>
            </ListGroup.ItemContent>
            <ListGroup.ItemSuffix />
          </ListGroup.Item>
        </ListGroup>
      </View>
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
              {/* <View className="bg-danger rounded-full size-5 items-center justify-center">
                <StyledIonicons name="alert" size={12} className="text-white" />
              </View> */}
            </ListGroup.ItemSuffix>
          </ListGroup.Item>
        </ListGroup>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const VariantsContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <ListGroup variant="default">
          <ListGroup.Item>
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>Default variant</ListGroup.ItemTitle>
              <ListGroup.ItemDescription>
                Uses bg-surface styling
              </ListGroup.ItemDescription>
            </ListGroup.ItemContent>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup variant="secondary">
          <ListGroup.Item>
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>Secondary variant</ListGroup.ItemTitle>
              <ListGroup.ItemDescription>
                Uses bg-surface-secondary styling
              </ListGroup.ItemDescription>
            </ListGroup.ItemContent>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup variant="tertiary">
          <ListGroup.Item>
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>Tertiary variant</ListGroup.ItemTitle>
              <ListGroup.ItemDescription>
                Uses bg-surface-tertiary styling
              </ListGroup.ItemDescription>
            </ListGroup.ItemContent>
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
  {
    value: 'variants',
    label: 'Variants',
    content: <VariantsContent />,
  },
];

export default function ListGroupScreen() {
  return <UsageVariantFlatList data={LIST_GROUP_VARIANTS} />;
}
