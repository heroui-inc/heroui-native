import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, cn, Spinner, useThemeColor } from 'heroui-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FadeIn, LinearTransition } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { useAppTheme } from '../../../contexts/app-theme-context';

const StyledIonicons = withUniwind(Ionicons);

const SizesContent = () => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-8 w-full px-8">
          <Button size="sm">Small Button</Button>
          <Button size="md">Medium Button</Button>
          <Button size="lg">Large Button</Button>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const VariantsContent = () => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-6 w-full px-8">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="destructive-soft">Destructive Soft</Button>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DisabledStateContent = () => {
  const themeColorMuted = useThemeColor('muted');

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-8 w-full px-8">
          <Button isDisabled>
            <Spinner color={themeColorMuted} size="sm" />
            <Button.Title>Loading</Button.Title>
          </Button>
          <Button variant="secondary" isDisabled>
            <Spinner size="sm" color={themeColorMuted} />
            <Button.Title>Loading</Button.Title>
          </Button>
          <Button variant="tertiary" isDisabled>
            <StyledIonicons
              name="alert-circle"
              size={16}
              className="text-muted"
            />
            <Button.Title>Access Denied</Button.Title>
          </Button>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WidthAlignmentContent = () => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-8 w-full px-8">
          <Button>Full Width Button</Button>
          <View>
            <Button variant="secondary" size="sm" className="self-start">
              Start
            </Button>
            <Button variant="secondary" size="sm" className="self-center">
              Center
            </Button>
            <Button variant="secondary" size="sm" className="self-end">
              End
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithIconsContent = () => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-8 w-full px-8">
          <Button variant="primary">
            <StyledIonicons
              name="add"
              size={20}
              className="text-accent-foreground"
            />
            <Button.Title>Add Item</Button.Title>
          </Button>

          <Button variant="secondary">
            <Button.Title>Download</Button.Title>
            <StyledIonicons
              name="download"
              size={18}
              className="text-accent-soft-foreground"
            />
          </Button>

          <Button variant="tertiary">
            <StyledIonicons
              name="heart"
              size={14}
              className="text-default-foreground"
            />
            <Button.Title>Favorite</Button.Title>
            <StyledIonicons
              name="chevron-forward"
              size={18}
              className="text-default-foreground"
            />
          </Button>

          <Button variant="destructive" size="sm">
            <StyledIonicons
              name="trash"
              size={14}
              className="text-danger-foreground"
            />
            <Button.Title>Delete</Button.Title>
          </Button>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const IconOnlyContent = () => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="flex-row gap-8">
          <Button size="sm" isIconOnly>
            <Button.Title>
              <StyledIonicons
                name="add"
                size={16}
                className="text-accent-foreground"
              />
            </Button.Title>
          </Button>
          <Button size="md" variant="secondary" isIconOnly>
            <Button.Title>
              <StyledIonicons
                name="heart"
                size={18}
                className="text-pink-500"
              />
            </Button.Title>
          </Button>
          <Button size="lg" variant="destructive" isIconOnly>
            <Button.Title>
              <StyledIonicons
                name="trash"
                size={20}
                className="text-danger-foreground"
              />
            </Button.Title>
          </Button>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomStylingContent = () => {
  const { isDark } = useAppTheme();

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-8 w-full px-8">
          <Button
            className="bg-purple-600"
            animation={{
              highlight: {
                backgroundColor: {
                  value: '#c084fc',
                },
                opacity: {
                  value: [0, 1],
                },
              },
            }}
          >
            <Button.Title className="text-white font-semibold">
              Custom Purple
            </Button.Title>
          </Button>

          <Button
            feedbackPosition="top"
            animation={{
              highlight: {
                backgroundColor: {
                  value: '#ec4899',
                },
                opacity: {
                  value: [0, 0.25],
                },
              },
            }}
          >
            <LinearGradient
              colors={['#0d9488', '#ec4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
            <Button.Title className="text-white font-bold">
              Gradient
            </Button.Title>
          </Button>
          <Button
            className={cn(
              'bg-neutral-950 rounded-none',
              isDark && 'bg-neutral-50'
            )}
            animation={{
              highlight: { backgroundColor: { value: 'transparent' } },
            }}
          >
            <StyledIonicons
              name="cart-outline"
              size={18}
              className={cn('text-neutral-50', isDark && 'text-neutral-950')}
            />
            <Button.Title
              className={cn('text-neutral-50', isDark && 'text-neutral-950')}
            >
              Add to Cart
            </Button.Title>
          </Button>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const LayoutTransitionsContent = () => {
  const [isDownloading, setIsDownloading] = React.useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Button
          layout={LinearTransition.springify()}
          variant="primary"
          onPress={() => {
            setIsDownloading(true);
            setTimeout(() => {
              setIsDownloading(false);
            }, 3000);
          }}
          isIconOnly={isDownloading}
        >
          {isDownloading ? (
            <Spinner entering={FadeIn.delay(50)} color="white" />
          ) : (
            'Download now'
          )}
        </Button>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const BUTTON_VARIANTS: UsageVariant[] = [
  {
    value: 'sizes',
    label: 'Sizes',
    content: <SizesContent />,
  },
  {
    value: 'variants',
    label: 'Variants',
    content: <VariantsContent />,
  },
  {
    value: 'disabled-state',
    label: 'Disabled state',
    content: <DisabledStateContent />,
  },
  {
    value: 'width-alignment',
    label: 'Width/alignment control',
    content: <WidthAlignmentContent />,
  },
  {
    value: 'with-icons',
    label: 'With icons',
    content: <WithIconsContent />,
  },
  {
    value: 'icon-only',
    label: 'Icon only',
    content: <IconOnlyContent />,
  },
  {
    value: 'custom-styling',
    label: 'Custom styling',
    content: <CustomStylingContent />,
  },
  {
    value: 'layout-transitions',
    label: 'Layout transitions demo',
    content: <LayoutTransitionsContent />,
  },
];

export default function ButtonScreen() {
  return <UsageVariantFlatList data={BUTTON_VARIANTS} />;
}
