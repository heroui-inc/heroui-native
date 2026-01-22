import { Ionicons } from '@expo/vector-icons';
import { CloseButton, useThemeColor } from 'heroui-native';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledIonicons = withUniwind(Ionicons);

const BasicUsageContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <CloseButton />
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomIconColorContent = () => {
  const [themeColorDanger, themeColorAccent] = useThemeColor([
    'danger',
    'accent',
  ]);

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center gap-4">
        <CloseButton iconProps={{ color: themeColorDanger }} />
        <CloseButton iconProps={{ color: themeColorAccent }} />
        <CloseButton />
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomChildrenContent = () => {
  const themeColorForeground = useThemeColor('foreground');

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center gap-4">
        <CloseButton>
          <StyledIonicons
            name="arrow-back"
            size={20}
            color={themeColorForeground}
          />
        </CloseButton>
        <CloseButton>
          <StyledIonicons
            name="close-circle"
            size={28}
            color={themeColorForeground}
          />
        </CloseButton>
        <CloseButton>❌</CloseButton>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DisabledStateContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center gap-4">
        <CloseButton />
        <CloseButton isDisabled />
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CLOSE_BUTTON_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-usage',
    label: 'Basic usage',
    content: <BasicUsageContent />,
  },
  {
    value: 'custom-icon-color',
    label: 'Custom icon color',
    content: <CustomIconColorContent />,
  },
  {
    value: 'custom-children',
    label: 'Custom children',
    content: <CustomChildrenContent />,
  },
  {
    value: 'disabled-state',
    label: 'Disabled state',
    content: <DisabledStateContent />,
  },
];

export default function CloseButtonScreen() {
  return <UsageVariantFlatList data={CLOSE_BUTTON_VARIANTS} />;
}
