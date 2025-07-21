import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Radio, RadioGroup } from '@/components/radio';

export default function RadioScreen() {
  // State for size variants
  const [smSize, setSmSize] = React.useState('paris');
  const [mdSize, setMdSize] = React.useState('london');
  const [lgSize, setLgSize] = React.useState('berlin');
  // State for color variants
  const [defaultColor, setDefaultColor] = React.useState('option1');
  const [successColor, setSuccessColor] = React.useState('option1');
  const [warningColor, setWarningColor] = React.useState('option1');
  const [dangerColor, setDangerColor] = React.useState('option1');

  // State for states
  const [disabledState, setDisabledState] = React.useState('option1');
  const [readOnlyState, setReadOnlyState] = React.useState('option1');

  // State for custom variants
  const [customBackground, setCustomBackground] = React.useState('custom1');
  const [customThumb, setCustomThumb] = React.useState('custom1');
  const [withDescription, setWithDescription] = React.useState('desc1');

  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="items-center justify-center p-4"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Sizes
      </Text>

      <View className="w-full mb-6 gap-6">
        <RadioGroup value={smSize} onValueChange={setSmSize}>
          <Radio value="paris" size="sm">
            <Radio.Label>Paris (Small)</Radio.Label>
          </Radio>
          <Radio value="london" size="sm">
            <Radio.Label>London (Small)</Radio.Label>
          </Radio>
          <Radio value="berlin" size="sm">
            <Radio.Label>Berlin (Small)</Radio.Label>
          </Radio>
        </RadioGroup>

        <RadioGroup value={mdSize} onValueChange={setMdSize}>
          <Radio value="paris" size="md">
            <Radio.Label>Paris (Medium)</Radio.Label>
          </Radio>
          <Radio value="london" size="md">
            <Radio.Label>London (Medium)</Radio.Label>
          </Radio>
          <Radio value="berlin" size="md">
            <Radio.Label>Berlin (Medium)</Radio.Label>
          </Radio>
        </RadioGroup>

        <RadioGroup value={lgSize} onValueChange={setLgSize}>
          <Radio value="paris" size="lg">
            <Radio.Label>Paris (Large)</Radio.Label>
          </Radio>
          <Radio value="london" size="lg">
            <Radio.Label>London (Large)</Radio.Label>
          </Radio>
          <Radio value="berlin" size="lg">
            <Radio.Label>Berlin (Large)</Radio.Label>
          </Radio>
        </RadioGroup>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Colors
      </Text>

      <View className="w-full mb-6 gap-6">
        <RadioGroup value={defaultColor} onValueChange={setDefaultColor}>
          <Radio value="option1" color="default">
            <Radio.Label>Default Color</Radio.Label>
          </Radio>
          <Radio value="option2" color="default">
            <Radio.Label>Another Option</Radio.Label>
          </Radio>
        </RadioGroup>

        <RadioGroup value={successColor} onValueChange={setSuccessColor}>
          <Radio value="option1" color="success">
            <Radio.Label>Success Color</Radio.Label>
          </Radio>
          <Radio value="option2" color="success">
            <Radio.Label>Another Option</Radio.Label>
          </Radio>
        </RadioGroup>

        <RadioGroup value={warningColor} onValueChange={setWarningColor}>
          <Radio value="option1" color="warning">
            <Radio.Label>Warning Color</Radio.Label>
          </Radio>
          <Radio value="option2" color="warning">
            <Radio.Label>Another Option</Radio.Label>
          </Radio>
        </RadioGroup>

        <RadioGroup value={dangerColor} onValueChange={setDangerColor}>
          <Radio value="option1" color="danger">
            <Radio.Label>Danger Color</Radio.Label>
          </Radio>
          <Radio value="option2" color="danger">
            <Radio.Label>Another Option</Radio.Label>
          </Radio>
        </RadioGroup>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        States
      </Text>

      <View className="w-full mb-6 gap-6">
        <RadioGroup
          value={disabledState}
          onValueChange={setDisabledState}
          isDisabled
        >
          <Radio value="option1">
            <Radio.Label>Disabled Option 1</Radio.Label>
          </Radio>
          <Radio value="option2">
            <Radio.Label>Disabled Option 2</Radio.Label>
          </Radio>
        </RadioGroup>

        <RadioGroup value={readOnlyState} onValueChange={setReadOnlyState}>
          <Radio value="option1" isReadOnly>
            <Radio.Label>Read-only Option 1</Radio.Label>
          </Radio>
          <Radio value="option2" isReadOnly>
            <Radio.Label>Read-only Option 2</Radio.Label>
          </Radio>
        </RadioGroup>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Custom Variants
      </Text>

      <View className="w-full mb-6 gap-6">
        <RadioGroup
          value={customBackground}
          onValueChange={setCustomBackground}
        >
          <Radio value="custom1">
            <Radio.Indicator>
              <Radio.IndicatorBackground>
                <View className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              </Radio.IndicatorBackground>
            </Radio.Indicator>
            <Radio.Label>Custom Background</Radio.Label>
          </Radio>

          <Radio value="custom2">
            <Radio.Indicator>
              <Radio.IndicatorBackground>
                <View className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-green-500" />
              </Radio.IndicatorBackground>
            </Radio.Indicator>
            <Radio.Label>Another Custom</Radio.Label>
          </Radio>
        </RadioGroup>

        <RadioGroup value={customThumb} onValueChange={setCustomThumb}>
          <Radio value="custom1">
            <Radio.Indicator>
              <Radio.IndicatorThumb>
                <View className="h-2 w-2 rounded-full bg-red-500" />
              </Radio.IndicatorThumb>
            </Radio.Indicator>
            <Radio.Label>Custom Thumb</Radio.Label>
          </Radio>

          <Radio value="custom2">
            <Radio.Indicator>
              <Radio.IndicatorThumb>
                <View className="h-2 w-2 bg-blue-500" />
              </Radio.IndicatorThumb>
            </Radio.Indicator>
            <Radio.Label>Square Thumb</Radio.Label>
          </Radio>
        </RadioGroup>

        <RadioGroup value={withDescription} onValueChange={setWithDescription}>
          <Radio value="desc1">
            <Radio.Label>Option with Description</Radio.Label>
            <Radio.Description>
              This is a helpful description that provides more context about
              this option.
            </Radio.Description>
          </Radio>

          <Radio value="desc2">
            <Radio.Label>Another Option</Radio.Label>
            <Radio.Description>
              Here's another description to help users make an informed choice.
            </Radio.Description>
          </Radio>
        </RadioGroup>
      </View>

      <View className="w-full">
        <Text className="text-lg font-bold text-muted-foreground mb-4">
          Minimal Usage
        </Text>

        <RadioGroup value="minimal" onValueChange={() => {}}>
          <Radio value="min1">
            <Radio.Label>Minimal with default indicator</Radio.Label>
          </Radio>
          <Radio value="min2">
            <Radio.Label>Just a label</Radio.Label>
          </Radio>
        </RadioGroup>
      </View>
    </ScrollView>
  );
}
