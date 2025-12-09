import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { cn, Divider, RadioGroup, Surface } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import Animated, {
  FadeIn,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const AnimatedView = Animated.createAnimatedComponent(View);
const StyleAnimatedView = withUniwind(Animated.View);

const StyledIonicons = withUniwind(Ionicons);
const StyledFontAwesome = withUniwind(FontAwesome);

const BasicRadioGroupContent = () => {
  const [withDescSelection, setWithDescSelection] = React.useState('desc1');

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <Surface className="w-full">
        <RadioGroup
          value={withDescSelection}
          onValueChange={setWithDescSelection}
        >
          <RadioGroup.Item value="desc1">
            <View>
              <RadioGroup.Label>Standard Shipping</RadioGroup.Label>
              <RadioGroup.Description>
                Delivered in 5-7 business days
              </RadioGroup.Description>
            </View>
            <RadioGroup.Indicator />
          </RadioGroup.Item>
          <Divider className="my-1" />
          <RadioGroup.Item value="desc2">
            <View>
              <RadioGroup.Label>Express Shipping</RadioGroup.Label>
              <RadioGroup.Description>
                Delivered in 2-3 business days
              </RadioGroup.Description>
            </View>
            <RadioGroup.Indicator />
          </RadioGroup.Item>
          <Divider className="my-1" />
          <RadioGroup.Item value="desc3">
            <View>
              <RadioGroup.Label>Overnight Shipping</RadioGroup.Label>
              <RadioGroup.Description>
                Delivered next business day
              </RadioGroup.Description>
            </View>
            <RadioGroup.Indicator />
          </RadioGroup.Item>
        </RadioGroup>
      </Surface>
    </View>
  );
};

// ------------------------------------------------------------------------------

interface ShippingOptionItemProps {
  /** The value for the radio item */
  value: string;
  /** The label text */
  label: string;
  /** The description text */
  description: string;
  /** The price/value text to display on the right */
  price: string;
  /** Optional className for the container */
  containerClassName?: string;
  /** Optional className for the indicator */
  indicatorClassName?: string;
  /** Optional className for the price text */
  priceClassName?: string;
}

/**
 * Reusable shipping option item component for RadioGroup
 * Displays a radio option with indicator, label, description, and price
 */
const ShippingOptionItem = ({
  value,
  label,
  description,
  price,
  containerClassName,
  indicatorClassName,
  priceClassName,
}: ShippingOptionItemProps) => {
  return (
    <RadioGroup.Item value={value}>
      {({ isSelected }) => (
        <View
          className={cn(
            'flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-transparent',
            isSelected && 'bg-surface',
            containerClassName
          )}
        >
          <RadioGroup.Indicator
            className={cn(
              !isSelected && 'border border-muted/10',
              indicatorClassName
            )}
          />
          <View className="flex-1">
            <RadioGroup.Label>{label}</RadioGroup.Label>
            <RadioGroup.Description>{description}</RadioGroup.Description>
          </View>
          <AppText
            className={cn(
              'text-foreground font-semibold',
              isSelected && 'text-accent',
              priceClassName
            )}
          >
            {price}
          </AppText>
        </View>
      )}
    </RadioGroup.Item>
  );
};

const StartIndicatorAlignmentContent = () => {
  const [shippingSpeed, setShippingSpeed] = React.useState('standard');

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <RadioGroup
        value={shippingSpeed}
        onValueChange={setShippingSpeed}
        className="gap-4"
        isOnSurface
      >
        <ShippingOptionItem
          value="standard"
          label="Standard Shipping"
          description="5-7 business days"
          price="Free"
        />
        <ShippingOptionItem
          value="express"
          label="Express Shipping"
          description="2-3 business days"
          price="$9.99"
        />
        <ShippingOptionItem
          value="overnight"
          label="Overnight Shipping"
          description="Next business day"
          price="$24.99"
        />
      </RadioGroup>
    </View>
  );
};

// ------------------------------------------------------------------------------

const InlineRadioOptionsContent = () => {
  const [size, setSize] = React.useState('M');
  const sizes = ['XS', 'S', 'M', 'L'];

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <Surface className="w-full gap-6">
        <View>
          <AppText className="text-foreground font-semibold text-base">
            Select Size
          </AppText>
          <AppText className="text-muted text-sm">
            Classic Cotton T-Shirt
          </AppText>
        </View>
        <RadioGroup
          value={size}
          onValueChange={setSize}
          className="flex-row gap-3"
        >
          {sizes.map((sizeOption) => (
            <RadioGroup.Item
              key={sizeOption}
              value={sizeOption}
              className="flex-1 gap-1.5"
            >
              <RadioGroup.Indicator />
              <RadioGroup.Label className="flex-1">
                {sizeOption}
              </RadioGroup.Label>
            </RadioGroup.Item>
          ))}
        </RadioGroup>
        <AppText className="text-muted text-xs">
          * Size guide available in product details
        </AppText>
      </Surface>
    </View>
  );
};

// ------------------------------------------------------------------------------

const RadioGroupStatesContent = () => {
  const [plan, setPlan] = React.useState('basic');

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <StyleAnimatedView className="w-full" layout={LinearTransition}>
        <Surface className="gap-6">
          <View>
            <AppText className="text-foreground font-semibold text-base">
              Choose Your Plan
            </AppText>
            <AppText className="text-muted text-sm">
              Select a subscription plan to continue
            </AppText>
          </View>
          <RadioGroup
            value={plan}
            onValueChange={setPlan}
            isInvalid={plan === 'enterprise'}
          >
            <RadioGroup.Item value="basic" isInvalid={false}>
              <View className="flex-1">
                <RadioGroup.Label>Basic Plan</RadioGroup.Label>
                <RadioGroup.Description>
                  Perfect for individuals - $9/month
                </RadioGroup.Description>
              </View>
              <RadioGroup.Indicator />
            </RadioGroup.Item>

            <Divider />

            <RadioGroup.Item value="pro" isDisabled isInvalid={false}>
              <View className="flex-1">
                <RadioGroup.Label>Pro Plan</RadioGroup.Label>
                <RadioGroup.Description>
                  Coming soon - Advanced features
                </RadioGroup.Description>
              </View>
              <RadioGroup.Indicator />
            </RadioGroup.Item>

            <Divider />
            <RadioGroup.Item value="enterprise" isInvalid>
              <View className="flex-1">
                <RadioGroup.Label>Enterprise Plan</RadioGroup.Label>
                <RadioGroup.Description>
                  Not available in your region
                </RadioGroup.Description>
              </View>
              <RadioGroup.Indicator />
            </RadioGroup.Item>
            <RadioGroup.ErrorMessage>
              Enterprise plan is not available in your region
            </RadioGroup.ErrorMessage>
          </RadioGroup>
        </Surface>
      </StyleAnimatedView>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomIndicatorBackgroundContent = () => {
  const [priority, setPriority] = React.useState('medium');

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <Surface className="w-full gap-6">
        <View>
          <AppText className="text-foreground font-semibold text-base">
            Priority Level
          </AppText>
          <AppText className="text-muted text-sm">
            Set the priority for this task
          </AppText>
        </View>
        <RadioGroup value={priority} onValueChange={setPriority}>
          <RadioGroup.Item value="high">
            {({ isSelected }) => (
              <>
                <View className="flex-1">
                  <RadioGroup.Label>High Priority</RadioGroup.Label>
                  <RadioGroup.Description>
                    Urgent - requires immediate attention
                  </RadioGroup.Description>
                </View>
                <RadioGroup.Indicator
                  className={cn(
                    'size-8',
                    isSelected && 'bg-red-500 border-red-400'
                  )}
                >
                  <RadioGroup.IndicatorThumb className="size-3.5 bg-red-100" />
                </RadioGroup.Indicator>
              </>
            )}
          </RadioGroup.Item>

          <Divider />

          <RadioGroup.Item value="medium">
            {({ isSelected }) => (
              <>
                <View className="flex-1">
                  <RadioGroup.Label>Medium Priority</RadioGroup.Label>
                  <RadioGroup.Description>
                    Important - complete within this week
                  </RadioGroup.Description>
                </View>
                <RadioGroup.Indicator
                  className={cn(
                    'size-8',
                    isSelected && 'bg-amber-500 border-amber-400'
                  )}
                >
                  <RadioGroup.IndicatorThumb className="size-3.5 bg-amber-100" />
                </RadioGroup.Indicator>
              </>
            )}
          </RadioGroup.Item>

          <Divider />

          <RadioGroup.Item value="low">
            {({ isSelected }) => (
              <>
                <View className="flex-1">
                  <RadioGroup.Label>Low Priority</RadioGroup.Label>
                  <RadioGroup.Description>
                    Standard - complete when possible
                  </RadioGroup.Description>
                </View>
                <RadioGroup.Indicator
                  className={cn(
                    'size-8',
                    isSelected && 'bg-emerald-500 border-emerald-400'
                  )}
                >
                  <RadioGroup.IndicatorThumb className="size-3.5 bg-emerald-100" />
                </RadioGroup.Indicator>
              </>
            )}
          </RadioGroup.Item>
        </RadioGroup>
      </Surface>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomIndicatorThumbContent = () => {
  const [notification, setNotification] = React.useState('email');

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <Surface className="w-full gap-6">
        <View>
          <AppText className="text-foreground font-semibold text-base">
            Notification Preferences
          </AppText>
          <AppText className="text-muted text-sm">
            Choose how you'd like to receive updates
          </AppText>
        </View>
        <RadioGroup value={notification} onValueChange={setNotification}>
          <RadioGroup.Item value="email">
            {({ isSelected }) => (
              <>
                <RadioGroup.Indicator>
                  {isSelected && (
                    <AnimatedView entering={FadeIn.duration(200)}>
                      <StyledFontAwesome
                        name="check"
                        size={12}
                        className="text-accent-foreground"
                      />
                    </AnimatedView>
                  )}
                </RadioGroup.Indicator>
                <View className="flex-1">
                  <RadioGroup.Label>Email Notifications</RadioGroup.Label>
                  <RadioGroup.Description>
                    Get updates via email
                  </RadioGroup.Description>
                </View>
              </>
            )}
          </RadioGroup.Item>

          <Divider />

          <RadioGroup.Item value="push">
            {({ isSelected }) => (
              <>
                <RadioGroup.Indicator>
                  {isSelected && (
                    <AnimatedView entering={FadeIn.duration(200)}>
                      <StyledIonicons
                        name="flash"
                        size={12}
                        className="text-background"
                      />
                    </AnimatedView>
                  )}
                </RadioGroup.Indicator>
                <View className="flex-1">
                  <RadioGroup.Label>Push Notifications</RadioGroup.Label>
                  <RadioGroup.Description>
                    Get instant push alerts
                  </RadioGroup.Description>
                </View>
              </>
            )}
          </RadioGroup.Item>

          <Divider />

          <RadioGroup.Item value="none">
            {({ isSelected }) => (
              <>
                <RadioGroup.Indicator>
                  {isSelected && (
                    <AnimatedView
                      key="none"
                      entering={ZoomIn.springify()}
                      className="h-2.5 w-2.5 bg-accent-foreground"
                    />
                  )}
                </RadioGroup.Indicator>
                <View className="flex-1">
                  <RadioGroup.Label>No Notifications</RadioGroup.Label>
                  <RadioGroup.Description>
                    Only check updates manually
                  </RadioGroup.Description>
                </View>
              </>
            )}
          </RadioGroup.Item>
        </RadioGroup>
      </Surface>
    </View>
  );
};

// ------------------------------------------------------------------------------

const RADIO_GROUP_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-radio-group',
    label: 'Basic RadioGroup',
    content: <BasicRadioGroupContent />,
  },
  {
    value: 'start-indicator-alignment',
    label: 'Start indicator alignment',
    content: <StartIndicatorAlignmentContent />,
  },
  {
    value: 'inline-radio-options',
    label: 'Inline Radio Options',
    content: <InlineRadioOptionsContent />,
  },
  {
    value: 'radio-group-states',
    label: 'RadioGroup States',
    content: <RadioGroupStatesContent />,
  },
  {
    value: 'custom-indicator-background',
    label: 'Custom Indicator Background',
    content: <CustomIndicatorBackgroundContent />,
  },
  {
    value: 'custom-indicator-thumb',
    label: 'Custom Indicator Thumb',
    content: <CustomIndicatorThumbContent />,
  },
];

export default function RadioGroupScreen() {
  return <UsageVariantFlatList data={RADIO_GROUP_VARIANTS} />;
}
