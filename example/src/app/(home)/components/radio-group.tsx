import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { RadioGroup, Surface, useTheme } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function RadioGroupScreen() {
  // Basic radio states
  const [basicSelection, setBasicSelection] = React.useState('option1');

  // Color variants
  const [selectedColor, setSelectedColor] = React.useState('default');

  // With descriptions
  const [withDescSelection, setWithDescSelection] = React.useState('desc1');

  // Indicator alignment
  const [alignmentSelection, setAlignmentSelection] = React.useState('end');

  // States
  const [disabledState, setDisabledState] = React.useState('option1');

  // Validation
  const [validationSelection, setValidationSelection] = React.useState('');

  // Custom indicator
  const [customIndicator, setCustomIndicator] = React.useState('custom1');
  const [customThumb, setCustomThumb] = React.useState('icon');

  // Real-world examples
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const [shippingSpeed, setShippingSpeed] = React.useState('standard');

  const { colors } = useTheme();

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Basic RadioGroup" />
      <RadioGroup value={basicSelection} onValueChange={setBasicSelection}>
        <RadioGroup.Item value="option1">
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Option 1</RadioGroup.ItemTitle>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
        <RadioGroup.Item value="option2">
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Option 2</RadioGroup.ItemTitle>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
        <RadioGroup.Item value="option3">
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Option 3</RadioGroup.ItemTitle>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="With Descriptions" />
      <RadioGroup
        value={withDescSelection}
        onValueChange={setWithDescSelection}
      >
        <RadioGroup.Item value="desc1">
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Standard Shipping</RadioGroup.ItemTitle>
            <RadioGroup.ItemDescription>
              Delivered in 5-7 business days
            </RadioGroup.ItemDescription>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
        <RadioGroup.Item value="desc2">
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Express Shipping</RadioGroup.ItemTitle>
            <RadioGroup.ItemDescription>
              Delivered in 2-3 business days
            </RadioGroup.ItemDescription>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
        <RadioGroup.Item value="desc3">
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Overnight Shipping</RadioGroup.ItemTitle>
            <RadioGroup.ItemDescription>
              Delivered next business day
            </RadioGroup.ItemDescription>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="Color Variants" />
      <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
        <View className="gap-8">
          <RadioGroup.Item value="default" color="default">
            <RadioGroup.ItemContent>
              <RadioGroup.ItemTitle>Default Color</RadioGroup.ItemTitle>
            </RadioGroup.ItemContent>
          </RadioGroup.Item>
          <RadioGroup.Item value="success" color="success">
            <RadioGroup.ItemContent>
              <RadioGroup.ItemTitle>Success Color</RadioGroup.ItemTitle>
            </RadioGroup.ItemContent>
          </RadioGroup.Item>
          <RadioGroup.Item value="warning" color="warning">
            <RadioGroup.ItemContent>
              <RadioGroup.ItemTitle>Warning Color</RadioGroup.ItemTitle>
            </RadioGroup.ItemContent>
          </RadioGroup.Item>
          <RadioGroup.Item value="danger" color="danger">
            <RadioGroup.ItemContent>
              <RadioGroup.ItemTitle>Danger Color</RadioGroup.ItemTitle>
            </RadioGroup.ItemContent>
          </RadioGroup.Item>
        </View>
      </RadioGroup>

      <SectionTitle title="Indicator Alignment" />
      <RadioGroup
        value={alignmentSelection}
        onValueChange={setAlignmentSelection}
        className="gap-8"
      >
        <RadioGroup.Item value="start" alignIndicator="start">
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>
              Indicator on Start (Left)
            </RadioGroup.ItemTitle>
            <RadioGroup.ItemDescription>
              The radio button appears on the left side
            </RadioGroup.ItemDescription>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
        <RadioGroup.Item value="end" alignIndicator="end">
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>
              Indicator on End (Right)
            </RadioGroup.ItemTitle>
            <RadioGroup.ItemDescription>
              The radio button appears on the right side (default)
            </RadioGroup.ItemDescription>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="Disabled & Read-Only States" />
      <View className="gap-8">
        <AppText className="text-sm text-muted-foreground">
          Disabled RadioGroup
        </AppText>
        <RadioGroup
          value={disabledState}
          onValueChange={setDisabledState}
          isDisabled
        >
          <RadioGroup.Item value="option1">
            <RadioGroup.ItemContent>
              <RadioGroup.ItemTitle>Disabled Option 1</RadioGroup.ItemTitle>
            </RadioGroup.ItemContent>
          </RadioGroup.Item>
          <RadioGroup.Item value="option2">
            <RadioGroup.ItemContent>
              <RadioGroup.ItemTitle>Disabled Option 2</RadioGroup.ItemTitle>
            </RadioGroup.ItemContent>
          </RadioGroup.Item>
        </RadioGroup>
      </View>

      <SectionTitle title="Validation & Error States" />
      <RadioGroup
        value={validationSelection}
        onValueChange={setValidationSelection}
        isInvalid={!validationSelection}
      >
        <RadioGroup.Item value="agree">
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>I agree to the terms</RadioGroup.ItemTitle>
            <RadioGroup.ItemDescription>
              You must select this option to continue
            </RadioGroup.ItemDescription>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
        <RadioGroup.Item value="disagree">
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>I do not agree</RadioGroup.ItemTitle>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
        <RadioGroup.ErrorMessage>
          Please select an option to continue
        </RadioGroup.ErrorMessage>
      </RadioGroup>

      <SectionTitle title="Custom Indicator Background" />
      <RadioGroup value={customIndicator} onValueChange={setCustomIndicator}>
        <RadioGroup.Item value="custom1">
          <RadioGroup.ItemIndicator
            className="w-8 h-8"
            colors={{
              selectedBorder: '#a855f7',
            }}
          >
            <RadioGroup.ItemIndicatorBackground>
              {customIndicator === 'custom1' && (
                <View className="absolute inset-0 rounded-full bg-purple-500" />
              )}
            </RadioGroup.ItemIndicatorBackground>
            <RadioGroup.ItemIndicatorThumb
              className="w-3.5 h-3.5"
              colors={{ selectedThumb: '#f3e8ff' }}
            />
          </RadioGroup.ItemIndicator>
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Purple Background</RadioGroup.ItemTitle>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>

        <RadioGroup.Item value="custom2">
          <RadioGroup.ItemIndicator
            className="w-8 h-8"
            colors={{
              selectedBorder: '#3b82f6',
            }}
          >
            <RadioGroup.ItemIndicatorBackground
              colors={{ selectedBackground: '#3b82f6' }}
            />
            <RadioGroup.ItemIndicatorThumb
              className="w-3.5 h-3.5"
              colors={{ selectedThumb: '#dbeafe' }}
            />
          </RadioGroup.ItemIndicator>
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Blue Background</RadioGroup.ItemTitle>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>

        <RadioGroup.Item value="custom3">
          <RadioGroup.ItemIndicator
            className="w-8 h-8"
            colors={{
              selectedBorder: '#10b981',
            }}
          >
            <RadioGroup.ItemIndicatorBackground>
              {customIndicator === 'custom3' && (
                <View className="absolute inset-0 rounded-full bg-emerald-500" />
              )}
            </RadioGroup.ItemIndicatorBackground>
            <RadioGroup.ItemIndicatorThumb
              className="w-3.5 h-3.5"
              colors={{ selectedThumb: '#d1fae5' }}
            />
          </RadioGroup.ItemIndicator>
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Green Background</RadioGroup.ItemTitle>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="Custom Indicator Thumb" />
      <RadioGroup value={customThumb} onValueChange={setCustomThumb}>
        <RadioGroup.Item value="icon">
          <RadioGroup.ItemIndicator>
            <RadioGroup.ItemIndicatorThumb>
              {customThumb === 'icon' && (
                <AnimatedView entering={FadeIn.duration(200)}>
                  <FontAwesome
                    name="check"
                    size={12}
                    color={colors.accentForeground}
                  />
                </AnimatedView>
              )}
            </RadioGroup.ItemIndicatorThumb>
          </RadioGroup.ItemIndicator>
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Checkmark Icon</RadioGroup.ItemTitle>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>

        <RadioGroup.Item value="zap">
          <RadioGroup.ItemIndicator>
            <RadioGroup.ItemIndicatorThumb>
              {customThumb === 'zap' && (
                <AnimatedView entering={FadeIn.duration(200)}>
                  <Ionicons name="flash" size={12} color={colors.background} />
                </AnimatedView>
              )}
            </RadioGroup.ItemIndicatorThumb>
          </RadioGroup.ItemIndicator>
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Lightning Icon</RadioGroup.ItemTitle>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>

        <RadioGroup.Item value="square">
          <RadioGroup.ItemIndicator>
            <RadioGroup.ItemIndicatorThumb>
              {customThumb === 'square' && (
                <AnimatedView
                  key="square"
                  entering={ZoomIn.springify()}
                  className="h-2.5 w-2.5 bg-accent-foreground"
                />
              )}
            </RadioGroup.ItemIndicatorThumb>
          </RadioGroup.ItemIndicator>
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Square Thumb</RadioGroup.ItemTitle>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="Payment Method Example" />
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <RadioGroup.Item value="card">
          <RadioGroup.ItemContent>
            <View className="flex-row items-center gap-1.5">
              <Ionicons
                name="card-outline"
                size={16}
                color={colors.foreground}
              />
              <RadioGroup.ItemTitle>Credit/Debit Card</RadioGroup.ItemTitle>
            </View>
            <RadioGroup.ItemDescription>
              Pay securely with your credit or debit card
            </RadioGroup.ItemDescription>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>

        <RadioGroup.Item value="paypal">
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>PayPal</RadioGroup.ItemTitle>
            <RadioGroup.ItemDescription>
              Fast and secure payment with PayPal
            </RadioGroup.ItemDescription>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>

        <RadioGroup.Item value="bank">
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Bank Transfer</RadioGroup.ItemTitle>
            <RadioGroup.ItemDescription>
              Direct transfer from your bank account
            </RadioGroup.ItemDescription>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="Shipping Speed Example" />
      <RadioGroup
        value={shippingSpeed}
        onValueChange={setShippingSpeed}
        className="gap-4"
      >
        <Surface>
          <RadioGroup.Item value="standard" alignIndicator="start">
            <RadioGroup.ItemContent className="flex-1">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <RadioGroup.ItemTitle>Standard Shipping</RadioGroup.ItemTitle>
                  <RadioGroup.ItemDescription>
                    5-7 business days
                  </RadioGroup.ItemDescription>
                </View>
                <AppText className="text-foreground font-semibold">
                  Free
                </AppText>
              </View>
            </RadioGroup.ItemContent>
          </RadioGroup.Item>
        </Surface>

        <Surface>
          <RadioGroup.Item value="express" alignIndicator="start">
            <RadioGroup.ItemContent className="flex-1">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <RadioGroup.ItemTitle>Express Shipping</RadioGroup.ItemTitle>
                  <RadioGroup.ItemDescription>
                    2-3 business days
                  </RadioGroup.ItemDescription>
                </View>
                <AppText className="text-foreground font-semibold">
                  $9.99
                </AppText>
              </View>
            </RadioGroup.ItemContent>
          </RadioGroup.Item>
        </Surface>

        <Surface>
          <RadioGroup.Item value="overnight" alignIndicator="start">
            <RadioGroup.ItemContent className="flex-1">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <RadioGroup.ItemTitle>
                    Overnight Shipping
                  </RadioGroup.ItemTitle>
                  <RadioGroup.ItemDescription>
                    Next business day
                  </RadioGroup.ItemDescription>
                </View>
                <AppText className="text-foreground font-semibold">
                  $24.99
                </AppText>
              </View>
            </RadioGroup.ItemContent>
          </RadioGroup.Item>
        </Surface>
      </RadioGroup>

      <SectionTitle title="Inline Radio Options" />
      <RadioGroup
        value={basicSelection}
        onValueChange={setBasicSelection}
        orientation="horizontal"
        className="self-center gap-10"
      >
        <RadioGroup.Item value="option1">
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Small</RadioGroup.ItemTitle>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
        <RadioGroup.Item value="option2">
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Medium</RadioGroup.ItemTitle>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
        <RadioGroup.Item value="option3">
          <RadioGroup.ItemContent>
            <RadioGroup.ItemTitle>Large</RadioGroup.ItemTitle>
          </RadioGroup.ItemContent>
        </RadioGroup.Item>
      </RadioGroup>
    </ScreenScrollView>
  );
}
