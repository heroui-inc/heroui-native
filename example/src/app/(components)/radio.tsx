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
            <Radio.Content>
              <Radio.Label>Paris (Small)</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="london" size="sm">
            <Radio.Content>
              <Radio.Label>London (Small)</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="berlin" size="sm">
            <Radio.Content>
              <Radio.Label>Berlin (Small)</Radio.Label>
            </Radio.Content>
          </Radio>
        </RadioGroup>

        <RadioGroup value={mdSize} onValueChange={setMdSize}>
          <Radio value="paris" size="md">
            <Radio.Content>
              <Radio.Label>Paris (Medium)</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="london" size="md">
            <Radio.Content>
              <Radio.Label>London (Medium)</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="berlin" size="md">
            <Radio.Content>
              <Radio.Label>Berlin (Medium)</Radio.Label>
            </Radio.Content>
          </Radio>
        </RadioGroup>

        <RadioGroup value={lgSize} onValueChange={setLgSize}>
          <Radio value="paris" size="lg">
            <Radio.Content>
              <Radio.Label>Paris (Large)</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="london" size="lg">
            <Radio.Content>
              <Radio.Label>London (Large)</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="berlin" size="lg">
            <Radio.Content>
              <Radio.Label>Berlin (Large)</Radio.Label>
            </Radio.Content>
          </Radio>
        </RadioGroup>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Colors
      </Text>

      <View className="w-full mb-6 gap-6">
        <RadioGroup value={defaultColor} onValueChange={setDefaultColor}>
          <Radio value="option1" color="default">
            <Radio.Content>
              <Radio.Label>Default Color</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="option2" color="default">
            <Radio.Content>
              <Radio.Label>Another Option</Radio.Label>
            </Radio.Content>
          </Radio>
        </RadioGroup>

        <RadioGroup value={successColor} onValueChange={setSuccessColor}>
          <Radio value="option1" color="success">
            <Radio.Content>
              <Radio.Label>Success Color</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="option2" color="success">
            <Radio.Content>
              <Radio.Label>Another Option</Radio.Label>
            </Radio.Content>
          </Radio>
        </RadioGroup>

        <RadioGroup value={warningColor} onValueChange={setWarningColor}>
          <Radio value="option1" color="warning">
            <Radio.Content>
              <Radio.Label>Warning Color</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="option2" color="warning">
            <Radio.Content>
              <Radio.Label>Another Option</Radio.Label>
            </Radio.Content>
          </Radio>
        </RadioGroup>

        <RadioGroup value={dangerColor} onValueChange={setDangerColor}>
          <Radio value="option1" color="danger">
            <Radio.Content>
              <Radio.Label>Danger Color</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="option2" color="danger">
            <Radio.Content>
              <Radio.Label>Another Option</Radio.Label>
            </Radio.Content>
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
            <Radio.Content>
              <Radio.Label>Disabled Option 1</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="option2">
            <Radio.Content>
              <Radio.Label>Disabled Option 2</Radio.Label>
            </Radio.Content>
          </Radio>
        </RadioGroup>

        <RadioGroup value={readOnlyState} onValueChange={setReadOnlyState}>
          <Radio value="option1" isReadOnly>
            <Radio.Content>
              <Radio.Label>Read-only Option 1</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="option2" isReadOnly>
            <Radio.Content>
              <Radio.Label>Read-only Option 2</Radio.Label>
            </Radio.Content>
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
            <Radio.Content>
              <Radio.Label>Custom Background</Radio.Label>
            </Radio.Content>
          </Radio>

          <Radio value="custom2">
            <Radio.Indicator>
              <Radio.IndicatorBackground>
                <View className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-green-500" />
              </Radio.IndicatorBackground>
            </Radio.Indicator>
            <Radio.Content>
              <Radio.Label>Another Custom</Radio.Label>
            </Radio.Content>
          </Radio>
        </RadioGroup>

        <RadioGroup value={customThumb} onValueChange={setCustomThumb}>
          <Radio value="custom1">
            <Radio.Indicator>
              <Radio.IndicatorThumb>
                <View className="h-2 w-2 rounded-full bg-red-500" />
              </Radio.IndicatorThumb>
            </Radio.Indicator>
            <Radio.Content>
              <Radio.Label>Custom Thumb</Radio.Label>
            </Radio.Content>
          </Radio>

          <Radio value="custom2">
            <Radio.Indicator>
              <Radio.IndicatorThumb>
                <View className="h-2 w-2 bg-blue-500" />
              </Radio.IndicatorThumb>
            </Radio.Indicator>
            <Radio.Content>
              <Radio.Label>Square Thumb</Radio.Label>
            </Radio.Content>
          </Radio>
        </RadioGroup>

        <RadioGroup value={withDescription} onValueChange={setWithDescription}>
          <Radio value="desc1">
            <Radio.Content>
              <Radio.Label>Option with Description</Radio.Label>
              <Radio.Description>
                This is a helpful description that provides more context about
                this option.
              </Radio.Description>
            </Radio.Content>
          </Radio>

          <Radio value="desc2">
            <Radio.Content>
              <Radio.Label>Another Option</Radio.Label>
              <Radio.Description>
                Here's another description to help users make an informed
                choice.
              </Radio.Description>
            </Radio.Content>
          </Radio>
        </RadioGroup>
      </View>

      <View className="w-full mb-6">
        <Text className="text-lg font-bold text-muted-foreground mb-4">
          Minimal Usage
        </Text>

        <RadioGroup value="minimal" onValueChange={() => {}}>
          <Radio value="min1">
            <Radio.Content>
              <Radio.Label>Minimal with default indicator</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="min2">
            <Radio.Content>
              <Radio.Label>Just a label</Radio.Label>
            </Radio.Content>
          </Radio>
        </RadioGroup>
      </View>

      <View className="w-full mb-6">
        <Text className="text-lg font-bold text-muted-foreground mb-4">
          Custom Content
        </Text>

        <RadioGroup value="custom-content" onValueChange={() => {}}>
          <Radio value="custom1">
            <Radio.Content>
              <View className="flex-row items-center gap-2">
                <View className="h-8 w-8 bg-blue-500 rounded-full" />
                <View>
                  <Text className="text-foreground font-medium">
                    Custom Content
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    With icon
                  </Text>
                </View>
              </View>
            </Radio.Content>
          </Radio>

          <Radio value="custom2">
            <Radio.Content>
              <View className="px-3 py-2 bg-accent/10 rounded-lg">
                <Text className="text-foreground font-semibold">
                  Content Left
                </Text>
                <Text className="text-muted-foreground text-sm">
                  Content can be placed before indicator
                </Text>
              </View>
            </Radio.Content>
          </Radio>
        </RadioGroup>
      </View>
    </ScrollView>
  );
}
