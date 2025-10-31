import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { cn, RadioGroup } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

const AnimatedView = Animated.createAnimatedComponent(View);
const StyledIonicons = withUniwind(Ionicons);
const StyledFontAwesome = withUniwind(FontAwesome);

export default function RadioGroupScreen() {
  // Basic radio states
  const [basicSelection, setBasicSelection] = React.useState('option1');

  // With descriptions
  const [withDescSelection, setWithDescSelection] = React.useState('desc1');

  // Indicator alignment
  const [alignmentSelection, setAlignmentSelection] = React.useState('end');

  // Validation
  const [withStateSelection, setWithStateSelection] = React.useState('default');

  // Custom indicator
  const [customIndicator, setCustomIndicator] = React.useState('custom1');
  const [customThumb, setCustomThumb] = React.useState('icon');

  // Real-world examples
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const [shippingSpeed, setShippingSpeed] = React.useState('standard');

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Basic RadioGroup" />
      <RadioGroup value={basicSelection} onValueChange={setBasicSelection}>
        <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
        <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
        <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="With Descriptions" />
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
        <RadioGroup.Item value="desc2">
          <View>
            <RadioGroup.Label>Express Shipping</RadioGroup.Label>
            <RadioGroup.Description>
              Delivered in 2-3 business days
            </RadioGroup.Description>
          </View>
          <RadioGroup.Indicator />
        </RadioGroup.Item>
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

      <SectionTitle title="Different States" />
      <View className="gap-4">
        <RadioGroup
          value={withStateSelection}
          onValueChange={setWithStateSelection}
          isInvalid={withStateSelection === 'invalid'}
        >
          <RadioGroup.Item value="default">Default Option</RadioGroup.Item>
          <RadioGroup.Item value="disabled" isDisabled>
            Disabled Option
          </RadioGroup.Item>
          <RadioGroup.Item value="invalid" isInvalid>
            Invalid Option
          </RadioGroup.Item>
          <RadioGroup.ErrorMessage>
            This option is invalid
          </RadioGroup.ErrorMessage>
        </RadioGroup>
      </View>

      <SectionTitle title="Indicator Alignment" />
      <RadioGroup
        value={alignmentSelection}
        onValueChange={setAlignmentSelection}
        className="gap-8"
      >
        <RadioGroup.Item value="end">
          <View className="flex-1">
            <RadioGroup.Label>Indicator on End (Right)</RadioGroup.Label>
            <RadioGroup.Description>
              The radio button appears on the right side (default)
            </RadioGroup.Description>
          </View>
          <RadioGroup.Indicator />
        </RadioGroup.Item>
        <RadioGroup.Item value="start" className="justify-start">
          <RadioGroup.Indicator />
          <View className="flex-1">
            <RadioGroup.Label>Indicator on Start (Left)</RadioGroup.Label>
            <RadioGroup.Description>
              The radio button appears on the left side
            </RadioGroup.Description>
          </View>
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="Custom Indicator Background" />
      <RadioGroup value={customIndicator} onValueChange={setCustomIndicator}>
        <RadioGroup.Item value="custom1">
          <RadioGroup.Label>Purple Background</RadioGroup.Label>
          <RadioGroup.Indicator
            className={cn(
              'size-8',
              customIndicator === 'custom1' && 'bg-purple-500 border-purple-600'
            )}
          >
            <RadioGroup.IndicatorThumb className="size-3.5 bg-purple-200" />
          </RadioGroup.Indicator>
        </RadioGroup.Item>

        <RadioGroup.Item value="custom2">
          <RadioGroup.Label>Blue Background</RadioGroup.Label>
          <RadioGroup.Indicator
            className={cn(
              'size-8',
              customIndicator === 'custom2' && 'bg-blue-500 border-blue-600'
            )}
          >
            <RadioGroup.IndicatorThumb className="size-3.5 bg-blue-200" />
          </RadioGroup.Indicator>
        </RadioGroup.Item>

        <RadioGroup.Item value="custom3">
          <RadioGroup.Label>Green Background</RadioGroup.Label>
          <RadioGroup.Indicator
            className={cn(
              'size-8',
              customIndicator === 'custom3' &&
                'bg-emerald-500 border-emerald-600'
            )}
          >
            <RadioGroup.IndicatorThumb className="size-3.5 bg-emerald-200" />
          </RadioGroup.Indicator>
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="Custom Indicator Thumb" />
      <RadioGroup value={customThumb} onValueChange={setCustomThumb}>
        <RadioGroup.Item value="icon" className="justify-start">
          <RadioGroup.Indicator>
            {customThumb === 'icon' && (
              <AnimatedView entering={FadeIn.duration(200)}>
                <StyledFontAwesome
                  name="check"
                  size={12}
                  className="text-accent-foreground"
                />
              </AnimatedView>
            )}
          </RadioGroup.Indicator>
          <RadioGroup.Label>Checkmark Icon</RadioGroup.Label>
        </RadioGroup.Item>

        <RadioGroup.Item value="zap" className="justify-start">
          <RadioGroup.Indicator>
            {customThumb === 'zap' && (
              <AnimatedView entering={FadeIn.duration(200)}>
                <StyledIonicons
                  name="flash"
                  size={12}
                  className="text-background"
                />
              </AnimatedView>
            )}
          </RadioGroup.Indicator>
          <RadioGroup.Label>Lightning Icon</RadioGroup.Label>
        </RadioGroup.Item>

        <RadioGroup.Item value="square" className="justify-start">
          <RadioGroup.Indicator>
            {customThumb === 'square' && (
              <AnimatedView
                key="square"
                entering={ZoomIn.springify()}
                className="h-2.5 w-2.5 bg-accent-foreground"
              />
            )}
          </RadioGroup.Indicator>
          <RadioGroup.Label>Square Thumb</RadioGroup.Label>
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="Payment Method Example" />
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <RadioGroup.Item value="card">
          <View>
            <View className="flex-row items-center gap-1.5">
              <StyledIonicons
                name="card-outline"
                size={16}
                className="text-foreground"
              />
              <RadioGroup.Label>Credit/Debit Card</RadioGroup.Label>
            </View>
            <RadioGroup.Description>
              Pay securely with your credit or debit card
            </RadioGroup.Description>
          </View>
          <RadioGroup.Indicator />
        </RadioGroup.Item>

        <RadioGroup.Item value="paypal">
          <View>
            <RadioGroup.Label>PayPal</RadioGroup.Label>
            <RadioGroup.Description>
              Fast and secure payment with PayPal
            </RadioGroup.Description>
          </View>
          <RadioGroup.Indicator />
        </RadioGroup.Item>

        <RadioGroup.Item value="bank">
          <View>
            <RadioGroup.Label>Bank Transfer</RadioGroup.Label>
            <RadioGroup.Description>
              Direct transfer from your bank account
            </RadioGroup.Description>
          </View>
          <RadioGroup.Indicator />
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="Shipping Speed Example" />
      <RadioGroup
        value={shippingSpeed}
        onValueChange={setShippingSpeed}
        className="gap-4"
      >
        <RadioGroup.Item value="standard">
          {({ isSelected }) => (
            <View
              className={cn(
                'flex-row items-center justify-between gap-3 p-3 rounded-xl border border-background-secondary shadow-lg shadow-foreground/5',
                isSelected && 'bg-surface'
              )}
            >
              <RadioGroup.Indicator />
              <View className="flex-1">
                <RadioGroup.Label>Standard Shipping</RadioGroup.Label>
                <RadioGroup.Description>
                  5-7 business days
                </RadioGroup.Description>
              </View>
              <AppText className="text-foreground font-semibold">Free</AppText>
            </View>
          )}
        </RadioGroup.Item>

        <RadioGroup.Item value="express">
          {({ isSelected }) => (
            <View
              className={cn(
                'flex-row items-center justify-between gap-3 p-3 rounded-xl border border-background-secondary shadow-lg shadow-foreground/5',
                isSelected && 'bg-surface'
              )}
            >
              <RadioGroup.Indicator />
              <View className="flex-1">
                <RadioGroup.Label>Express Shipping</RadioGroup.Label>
                <RadioGroup.Description>
                  2-3 business days
                </RadioGroup.Description>
              </View>
              <AppText className="text-foreground font-semibold">$9.99</AppText>
            </View>
          )}
        </RadioGroup.Item>

        <RadioGroup.Item value="overnight">
          {({ isSelected }) => (
            <View
              className={cn(
                'flex-row items-center justify-between gap-3 p-3 rounded-xl border border-background-secondary shadow-lg shadow-foreground/5',
                isSelected && 'bg-surface'
              )}
            >
              <RadioGroup.Indicator />
              <View className="flex-1">
                <RadioGroup.Label>Overnight Shipping</RadioGroup.Label>
                <RadioGroup.Description>
                  Next business day
                </RadioGroup.Description>
              </View>
              <AppText className="text-foreground font-semibold">
                $24.99
              </AppText>
            </View>
          )}
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="Inline Radio Options" />
      <RadioGroup
        value={basicSelection}
        onValueChange={setBasicSelection}
        className="flex-row justify-center gap-6"
      >
        <RadioGroup.Item value="option1">
          <RadioGroup.Indicator />
          <RadioGroup.Label>Small</RadioGroup.Label>
        </RadioGroup.Item>
        <RadioGroup.Item value="option2">
          <RadioGroup.Indicator />
          <RadioGroup.Label>Medium</RadioGroup.Label>
        </RadioGroup.Item>
        <RadioGroup.Item value="option3">
          <RadioGroup.Indicator />
          <RadioGroup.Label>Large</RadioGroup.Label>
        </RadioGroup.Item>
      </RadioGroup>
    </ScreenScrollView>
  );
}
