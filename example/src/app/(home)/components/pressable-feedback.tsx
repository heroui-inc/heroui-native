/* eslint-disable react-native/no-inline-styles */
import { Ionicons } from '@expo/vector-icons';
import { PressableFeedback } from 'heroui-native';
import { Text, View } from 'react-native';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledIonicons = withUniwind(Ionicons);

const DefaultContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center justify-center gap-4">
        <PressableFeedback className="bg-surface rounded-2xl h-36 w-36 items-center justify-center">
          <StyledIonicons
            name="checkmark"
            size={32}
            className="text-surface-foreground"
          />
        </PressableFeedback>
        {/* <PressableFeedback className="bg-accent rounded-2xl h-24 w-24 items-center justify-center">
          <StyledIonicons
            name="heart"
            size={32}
            className="text-accent-foreground"
          />
        </PressableFeedback>
        <PressableFeedback className="bg-success rounded-2xl h-24 w-24 items-center justify-center">
          <StyledIonicons
            name="checkmark"
            size={32}
            className="text-success-foreground"
          />
        </PressableFeedback>
        <PressableFeedback className="bg-warning rounded-2xl h-24 w-24 items-center justify-center">
          <StyledIonicons
            name="star"
            size={32}
            className="text-warning-foreground"
          />
        </PressableFeedback> */}
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomOpacityContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center justify-center gap-4">
        <PressableFeedback
          className="bg-accent rounded-2xl h-24 w-24 items-center justify-center"
          animation={{
            opacity: {
              value: [0, 0.3],
            },
          }}
        >
          <Text className="text-accent-foreground font-semibold">0.3</Text>
        </PressableFeedback>
        <PressableFeedback
          className="bg-success rounded-2xl h-24 w-24 items-center justify-center"
          animation={{
            opacity: {
              value: [0, 0.5],
            },
          }}
        >
          <Text className="text-success-foreground font-semibold">0.5</Text>
        </PressableFeedback>
        <PressableFeedback
          className="bg-warning rounded-2xl h-24 w-24 items-center justify-center"
          animation={{
            opacity: {
              value: [0, 0.8],
            },
          }}
        >
          <Text className="text-warning-foreground font-semibold">0.8</Text>
        </PressableFeedback>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomColorContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center justify-center gap-4">
        <PressableFeedback
          className="bg-surface-quaternary rounded-2xl h-24 w-24 items-center justify-center"
          animation={{
            backgroundColor: {
              value: '#ec4899',
            },
            opacity: {
              value: [0, 0.2],
            },
          }}
        >
          <Text className="text-foreground font-semibold">Pink</Text>
        </PressableFeedback>
        <PressableFeedback
          className="bg-surface-quaternary rounded-2xl h-24 w-24 items-center justify-center"
          animation={{
            backgroundColor: {
              value: '#3b82f6',
            },
            opacity: {
              value: [0, 0.2],
            },
          }}
        >
          <Text className="text-foreground font-semibold">Blue</Text>
        </PressableFeedback>
        <PressableFeedback
          className="bg-surface-quaternary rounded-2xl h-24 w-24 items-center justify-center"
          animation={{
            backgroundColor: {
              value: '#8b5cf6',
            },
            opacity: {
              value: [0, 0.2],
            },
          }}
        >
          <Text className="text-foreground font-semibold">Purple</Text>
        </PressableFeedback>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomTimingContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center justify-center gap-4">
        <PressableFeedback
          className="bg-accent rounded-2xl h-24 w-24 items-center justify-center"
          animation={{
            opacity: {
              timingConfig: {
                duration: 100,
              },
            },
          }}
        >
          <Text className="text-accent-foreground font-semibold text-xs text-center">
            Fast{'\n'}100ms
          </Text>
        </PressableFeedback>
        <PressableFeedback
          className="bg-success rounded-2xl h-24 w-24 items-center justify-center"
          animation={{
            opacity: {
              timingConfig: {
                duration: 300,
              },
            },
          }}
        >
          <Text className="text-success-foreground font-semibold text-xs text-center">
            Normal{'\n'}300ms
          </Text>
        </PressableFeedback>
        <PressableFeedback
          className="bg-warning rounded-2xl h-24 w-24 items-center justify-center"
          animation={{
            opacity: {
              timingConfig: {
                duration: 600,
              },
            },
          }}
        >
          <Text className="text-warning-foreground font-semibold text-xs text-center">
            Slow{'\n'}600ms
          </Text>
        </PressableFeedback>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DisabledStateContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center justify-center gap-4">
        <PressableFeedback
          className="bg-accent rounded-2xl h-24 w-24 items-center justify-center"
          isDisabled
        >
          <Text className="text-accent-foreground font-semibold opacity-50">
            Disabled
          </Text>
        </PressableFeedback>
        <PressableFeedback
          className="bg-success rounded-2xl h-24 w-24 items-center justify-center"
          animation={false}
        >
          <Text className="text-success-foreground font-semibold">No Anim</Text>
        </PressableFeedback>
        <PressableFeedback
          className="bg-warning rounded-2xl h-24 w-24 items-center justify-center"
          animation="disabled"
        >
          <Text className="text-warning-foreground font-semibold text-xs text-center">
            Anim{'\n'}Disabled
          </Text>
        </PressableFeedback>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ListItemContent = () => {
  const items = [
    { id: 1, icon: 'home', label: 'Home', subtitle: 'Go to home screen' },
    {
      id: 2,
      icon: 'settings',
      label: 'Settings',
      subtitle: 'Manage your preferences',
    },
    { id: 3, icon: 'person', label: 'Profile', subtitle: 'View your profile' },
    {
      id: 4,
      icon: 'notifications',
      label: 'Notifications',
      subtitle: 'Manage notifications',
    },
  ];

  return (
    <View className="flex-1 px-5 justify-center">
      <View className="bg-surface-secondary rounded-2xl overflow-hidden">
        {items.map((item, index) => (
          <View key={item.id}>
            <PressableFeedback className="flex-row items-center px-4 py-3.5">
              <View className="bg-accent/10 rounded-full h-10 w-10 items-center justify-center mr-3">
                <StyledIonicons
                  name={item.icon as any}
                  size={20}
                  className="text-accent"
                />
              </View>
              <View className="flex-1">
                <Text className="text-foreground font-semibold">
                  {item.label}
                </Text>
                <Text className="text-foreground-secondary text-xs mt-0.5">
                  {item.subtitle}
                </Text>
              </View>
              <StyledIonicons
                name="chevron-forward"
                size={20}
                className="text-foreground-tertiary"
              />
            </PressableFeedback>
            {index < items.length - 1 && (
              <View className="h-px bg-border ml-[58px]" />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CardContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <PressableFeedback className="bg-surface-secondary rounded-3xl p-6 w-full max-w-sm">
        <View className="flex-row items-center mb-4">
          <View className="bg-accent rounded-full h-12 w-12 items-center justify-center mr-3">
            <StyledIonicons
              name="trophy"
              size={24}
              className="text-accent-foreground"
            />
          </View>
          <View className="flex-1">
            <Text className="text-foreground font-bold text-lg">
              Achievement Unlocked!
            </Text>
            <Text className="text-foreground-secondary text-sm">
              Tap to view details
            </Text>
          </View>
        </View>
        <Text className="text-foreground-secondary">
          You've completed 10 tasks this week. Keep up the great work!
        </Text>
      </PressableFeedback>
    </View>
  );
};

// ------------------------------------------------------------------------------

const PRESSABLE_FEEDBACK_VARIANTS: UsageVariant[] = [
  {
    value: 'default',
    label: 'Default',
    content: <DefaultContent />,
  },
  {
    value: 'custom-opacity',
    label: 'Custom opacity',
    content: <CustomOpacityContent />,
  },
  {
    value: 'custom-color',
    label: 'Custom color',
    content: <CustomColorContent />,
  },
  {
    value: 'custom-timing',
    label: 'Custom timing',
    content: <CustomTimingContent />,
  },
  {
    value: 'disabled',
    label: 'Disabled state',
    content: <DisabledStateContent />,
  },
  {
    value: 'list-item',
    label: 'List item',
    content: <ListItemContent />,
  },
  {
    value: 'card',
    label: 'Card',
    content: <CardContent />,
  },
];

export default function PressableFeedbackScreen() {
  return <UsageVariantFlatList data={PRESSABLE_FEEDBACK_VARIANTS} />;
}
