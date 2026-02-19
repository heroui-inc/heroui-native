import { LinearGradient } from 'expo-linear-gradient';
import {
  Button,
  cn,
  PressableFeedback,
  Spinner,
  useThemeColor,
} from 'heroui-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FadeIn, LinearTransition } from 'react-native-reanimated';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { ArrowDownToSquareIcon } from '../../../components/icons/arrow-down-to-square';
import { CircleInfoFillIcon } from '../../../components/icons/circle-info-fill';
import { HeartFillIcon } from '../../../components/icons/heart-fill';
import { PaperClipIcon } from '../../../components/icons/paper-clip';
import { PlusIcon } from '../../../components/icons/plus';
import { ShoppingCartIcon } from '../../../components/icons/shopping-cart';
import { TrashIcon } from '../../../components/icons/trash';
import { useAppTheme } from '../../../contexts/app-theme-context';

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
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="danger-soft">Danger Soft</Button>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DisabledStateContent = () => {
  const [themeColorAccent, themeColorAccentForeground] = useThemeColor([
    'accent',
    'accent-foreground',
  ]);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-8 w-full px-8">
          <Button isDisabled>
            <Spinner color={themeColorAccentForeground} size="sm" />
            <Button.Label>Loading</Button.Label>
          </Button>
          <Button variant="secondary" isDisabled>
            <Spinner size="sm" color={themeColorAccent} />
            <Button.Label>Loading</Button.Label>
          </Button>
          <Button variant="tertiary" isDisabled>
            <CircleInfoFillIcon size={16} colorClassName="accent-muted" />
            <Button.Label>Access Denied</Button.Label>
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
            <PlusIcon size={16} colorClassName="accent-accent-foreground" />
            <Button.Label>Add Member</Button.Label>
          </Button>

          <Button variant="secondary">
            <Button.Label>Download</Button.Label>
            <ArrowDownToSquareIcon size={16} colorClassName="accent-accent" />
          </Button>

          <Button variant="danger">
            <TrashIcon size={15} colorClassName="accent-danger-foreground" />
            <Button.Label>Delete</Button.Label>
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
            <Button.Label>
              <PaperClipIcon
                size={16}
                colorClassName="accent-accent-foreground"
              />
            </Button.Label>
          </Button>
          <Button size="md" variant="secondary" isIconOnly>
            <Button.Label>
              <HeartFillIcon size={18} colorClassName="accent-danger" />
            </Button.Label>
          </Button>
          <Button size="lg" variant="danger" isIconOnly>
            <Button.Label>
              <TrashIcon size={18} colorClassName="accent-danger-foreground" />
            </Button.Label>
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
                  value: [0, 0.5],
                },
              },
            }}
          >
            <Button.Label className="text-white font-semibold">
              Custom Purple
            </Button.Label>
          </Button>

          <Button feedbackVariant="scale">
            <LinearGradient
              colors={['#0d9488', '#ec4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
            <PressableFeedback.Ripple
              animation={{
                backgroundColor: { value: 'white' },
                opacity: { value: [0, 0.5, 0] },
              }}
            />
            <Button.Label className="text-white font-bold" pointerEvents="none">
              Gradient
            </Button.Label>
          </Button>
          <Button
            className={cn(
              'bg-neutral-950 rounded-md',
              isDark && 'bg-neutral-50'
            )}
            feedbackVariant="scale"
          >
            <ShoppingCartIcon
              size={18}
              colorClassName={cn(
                'accent-neutral-50',
                isDark && 'accent-neutral-950'
              )}
            />
            <Button.Label
              className={cn('text-neutral-50', isDark && 'text-neutral-950')}
            >
              Add to Cart
            </Button.Label>
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
