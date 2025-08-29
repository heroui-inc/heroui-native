import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Radio, RadioGroup, Surface, useTheme } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function RadioScreen() {
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
        <Radio value="option1">
          <Radio.Content>
            <Radio.Title>Option 1</Radio.Title>
          </Radio.Content>
        </Radio>
        <Radio value="option2">
          <Radio.Content>
            <Radio.Title>Option 2</Radio.Title>
          </Radio.Content>
        </Radio>
        <Radio value="option3">
          <Radio.Content>
            <Radio.Title>Option 3</Radio.Title>
          </Radio.Content>
        </Radio>
      </RadioGroup>

      <SectionTitle title="With Descriptions" />
      <RadioGroup
        value={withDescSelection}
        onValueChange={setWithDescSelection}
      >
        <Radio value="desc1">
          <Radio.Content>
            <Radio.Title>Standard Shipping</Radio.Title>
            <Radio.Description>
              Delivered in 5-7 business days
            </Radio.Description>
          </Radio.Content>
        </Radio>
        <Radio value="desc2">
          <Radio.Content>
            <Radio.Title>Express Shipping</Radio.Title>
            <Radio.Description>
              Delivered in 2-3 business days
            </Radio.Description>
          </Radio.Content>
        </Radio>
        <Radio value="desc3">
          <Radio.Content>
            <Radio.Title>Overnight Shipping</Radio.Title>
            <Radio.Description>Delivered next business day</Radio.Description>
          </Radio.Content>
        </Radio>
      </RadioGroup>

      <SectionTitle title="Color Variants" />
      <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
        <View className="gap-8">
          <Radio value="default" color="default">
            <Radio.Content>
              <Radio.Title>Default Color</Radio.Title>
            </Radio.Content>
          </Radio>
          <Radio value="success" color="success">
            <Radio.Content>
              <Radio.Title>Success Color</Radio.Title>
            </Radio.Content>
          </Radio>
          <Radio value="warning" color="warning">
            <Radio.Content>
              <Radio.Title>Warning Color</Radio.Title>
            </Radio.Content>
          </Radio>
          <Radio value="danger" color="danger">
            <Radio.Content>
              <Radio.Title>Danger Color</Radio.Title>
            </Radio.Content>
          </Radio>
        </View>
      </RadioGroup>

      <SectionTitle title="Indicator Alignment" />
      <RadioGroup
        value={alignmentSelection}
        onValueChange={setAlignmentSelection}
        className="gap-8"
      >
        <Radio value="start" alignIndicator="start">
          <Radio.Content>
            <Radio.Title>Indicator on Start (Left)</Radio.Title>
            <Radio.Description>
              The radio button appears on the left side
            </Radio.Description>
          </Radio.Content>
        </Radio>
        <Radio value="end" alignIndicator="end">
          <Radio.Content>
            <Radio.Title>Indicator on End (Right)</Radio.Title>
            <Radio.Description>
              The radio button appears on the right side (default)
            </Radio.Description>
          </Radio.Content>
        </Radio>
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
          <Radio value="option1">
            <Radio.Content>
              <Radio.Title>Disabled Option 1</Radio.Title>
            </Radio.Content>
          </Radio>
          <Radio value="option2">
            <Radio.Content>
              <Radio.Title>Disabled Option 2</Radio.Title>
            </Radio.Content>
          </Radio>
        </RadioGroup>
      </View>

      <SectionTitle title="Validation & Error States" />
      <RadioGroup
        value={validationSelection}
        onValueChange={setValidationSelection}
        isInvalid={!validationSelection}
      >
        <Radio value="agree">
          <Radio.Content>
            <Radio.Title>I agree to the terms</Radio.Title>
            <Radio.Description>
              You must select this option to continue
            </Radio.Description>
          </Radio.Content>
        </Radio>
        <Radio value="disagree">
          <Radio.Content>
            <Radio.Title>I do not agree</Radio.Title>
          </Radio.Content>
        </Radio>
        <RadioGroup.ErrorMessage>
          Please select an option to continue
        </RadioGroup.ErrorMessage>
      </RadioGroup>

      <SectionTitle title="Custom Indicator Background" />
      <RadioGroup value={customIndicator} onValueChange={setCustomIndicator}>
        <Radio value="custom1">
          <Radio.Indicator
            className="w-8 h-8"
            colors={{
              selectedBorder: '#a855f7',
            }}
          >
            <Radio.IndicatorBackground>
              {customIndicator === 'custom1' && (
                <View className="absolute inset-0 rounded-full bg-purple-500" />
              )}
            </Radio.IndicatorBackground>
            <Radio.IndicatorThumb
              className="w-3.5 h-3.5"
              colors={{ selectedThumb: '#f3e8ff' }}
            />
          </Radio.Indicator>
          <Radio.Content>
            <Radio.Title>Purple Background</Radio.Title>
          </Radio.Content>
        </Radio>

        <Radio value="custom2">
          <Radio.Indicator
            className="w-8 h-8"
            colors={{
              selectedBorder: '#3b82f6',
            }}
          >
            <Radio.IndicatorBackground
              colors={{ selectedBackground: '#3b82f6' }}
            />
            <Radio.IndicatorThumb
              className="w-3.5 h-3.5"
              colors={{ selectedThumb: '#dbeafe' }}
            />
          </Radio.Indicator>
          <Radio.Content>
            <Radio.Title>Blue Background</Radio.Title>
          </Radio.Content>
        </Radio>

        <Radio value="custom3">
          <Radio.Indicator
            className="w-8 h-8"
            colors={{
              selectedBorder: '#10b981',
            }}
          >
            <Radio.IndicatorBackground>
              {customIndicator === 'custom3' && (
                <View className="absolute inset-0 rounded-full bg-emerald-500" />
              )}
            </Radio.IndicatorBackground>
            <Radio.IndicatorThumb
              className="w-3.5 h-3.5"
              colors={{ selectedThumb: '#d1fae5' }}
            />
          </Radio.Indicator>
          <Radio.Content>
            <Radio.Title>Green Background</Radio.Title>
          </Radio.Content>
        </Radio>
      </RadioGroup>

      <SectionTitle title="Custom Indicator Thumb" />
      <RadioGroup value={customThumb} onValueChange={setCustomThumb}>
        <Radio value="icon">
          <Radio.Indicator>
            <Radio.IndicatorThumb>
              {customThumb === 'icon' && (
                <AnimatedView entering={FadeIn.duration(200)}>
                  <FontAwesome
                    name="check"
                    size={12}
                    color={colors.accentForeground}
                  />
                </AnimatedView>
              )}
            </Radio.IndicatorThumb>
          </Radio.Indicator>
          <Radio.Content>
            <Radio.Title>Checkmark Icon</Radio.Title>
          </Radio.Content>
        </Radio>

        <Radio value="zap">
          <Radio.Indicator>
            <Radio.IndicatorThumb>
              {customThumb === 'zap' && (
                <AnimatedView entering={FadeIn.duration(200)}>
                  <Ionicons name="flash" size={12} color={colors.background} />
                </AnimatedView>
              )}
            </Radio.IndicatorThumb>
          </Radio.Indicator>
          <Radio.Content>
            <Radio.Title>Lightning Icon</Radio.Title>
          </Radio.Content>
        </Radio>

        <Radio value="square">
          <Radio.Indicator>
            <Radio.IndicatorThumb>
              {customThumb === 'square' && (
                <AnimatedView
                  key="square"
                  entering={ZoomIn.springify().stiffness(300).damping(20)}
                  className="h-2.5 w-2.5 bg-accent-foreground"
                />
              )}
            </Radio.IndicatorThumb>
          </Radio.Indicator>
          <Radio.Content>
            <Radio.Title>Square Thumb</Radio.Title>
          </Radio.Content>
        </Radio>
      </RadioGroup>

      <SectionTitle title="Payment Method Example" />
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <Radio value="card">
          <Radio.Content>
            <View className="flex-row items-center gap-1.5">
              <Ionicons
                name="card-outline"
                size={16}
                color={colors.foreground}
              />
              <Radio.Title>Credit/Debit Card</Radio.Title>
            </View>
            <Radio.Description>
              Pay securely with your credit or debit card
            </Radio.Description>
          </Radio.Content>
        </Radio>

        <Radio value="paypal">
          <Radio.Content>
            <Radio.Title>PayPal</Radio.Title>
            <Radio.Description>
              Fast and secure payment with PayPal
            </Radio.Description>
          </Radio.Content>
        </Radio>

        <Radio value="bank">
          <Radio.Content>
            <Radio.Title>Bank Transfer</Radio.Title>
            <Radio.Description>
              Direct transfer from your bank account
            </Radio.Description>
          </Radio.Content>
        </Radio>
      </RadioGroup>

      <SectionTitle title="Shipping Speed Example" />
      <RadioGroup
        value={shippingSpeed}
        onValueChange={setShippingSpeed}
        className="gap-4"
      >
        <Surface>
          <Radio value="standard" alignIndicator="start">
            <Radio.Content className="flex-1">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Radio.Title>Standard Shipping</Radio.Title>
                  <Radio.Description>5-7 business days</Radio.Description>
                </View>
                <AppText className="text-foreground font-semibold">
                  Free
                </AppText>
              </View>
            </Radio.Content>
          </Radio>
        </Surface>

        <Surface>
          <Radio value="express" alignIndicator="start">
            <Radio.Content className="flex-1">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Radio.Title>Express Shipping</Radio.Title>
                  <Radio.Description>2-3 business days</Radio.Description>
                </View>
                <AppText className="text-foreground font-semibold">
                  $9.99
                </AppText>
              </View>
            </Radio.Content>
          </Radio>
        </Surface>

        <Surface>
          <Radio value="overnight" alignIndicator="start">
            <Radio.Content className="flex-1">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Radio.Title>Overnight Shipping</Radio.Title>
                  <Radio.Description>Next business day</Radio.Description>
                </View>
                <AppText className="text-foreground font-semibold">
                  $24.99
                </AppText>
              </View>
            </Radio.Content>
          </Radio>
        </Surface>
      </RadioGroup>

      <SectionTitle title="Inline Radio Options" />
      <RadioGroup
        value={basicSelection}
        onValueChange={setBasicSelection}
        orientation="horizontal"
        className="self-center gap-10"
      >
        <Radio value="option1">
          <Radio.Content>
            <Radio.Title>Small</Radio.Title>
          </Radio.Content>
        </Radio>
        <Radio value="option2">
          <Radio.Content>
            <Radio.Title>Medium</Radio.Title>
          </Radio.Content>
        </Radio>
        <Radio value="option3">
          <Radio.Content>
            <Radio.Title>Large</Radio.Title>
          </Radio.Content>
        </Radio>
      </RadioGroup>
    </ScreenScrollView>
  );
}
