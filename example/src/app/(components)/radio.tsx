import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Radio, RadioGroup } from '@/components/radio';
import { cn } from '@/helpers/utils';
import { useTheme } from 'heroui-native';
import { Zap } from 'lucide-react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { StyledRadio } from '../../components/styled-radio';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function RadioScreen() {
  // State for size variants
  const [smSize, setSmSize] = React.useState('paris');
  const [mdSize, setMdSize] = React.useState('london');
  const [lgSize, setLgSize] = React.useState('berlin');
  // State for color variants
  const [selectedColor, setSelectedColor] = React.useState('default');

  // State for states
  const [disabledState, setDisabledState] = React.useState('option1');
  const [readOnlyState, setReadOnlyState] = React.useState('option1');

  // State for custom variants
  const [customBackground, setCustomBackground] = React.useState('custom1');
  const [customThumb, setCustomThumb] = React.useState('custom1');
  const [withDescription, setWithDescription] = React.useState('desc1');
  const [advancedContent, setAdvancedContent] = React.useState('option1');

  const { theme } = useTheme();

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
        <RadioGroup
          value={smSize}
          onValueChange={setSmSize}
          orientation="horizontal"
        >
          <Radio value="paris" size="sm" alignIndicator="start">
            <Radio.Content>
              <Radio.Label>Paris (Small)</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="london" size="sm" alignIndicator="start">
            <Radio.Content>
              <Radio.Label>London (Small)</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="berlin" size="sm" alignIndicator="start">
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

      <View className="w-full mb-6">
        <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
          <Radio value="default" color="default">
            <Radio.Content>
              <Radio.Label>Default</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="success" color="success">
            <Radio.Content>
              <Radio.Label>Success</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="warning" color="warning">
            <Radio.Content>
              <Radio.Label>Warning</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="danger" color="danger">
            <Radio.Content>
              <Radio.Label>Danger</Radio.Label>
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
            <Radio.Indicator
              className="w-8 h-8"
              colors={{
                selectedBorder: '#a855f7',
              }}
            >
              <Radio.IndicatorBackground>
                {customBackground === 'custom1' ? (
                  <View className="absolute inset-0 rounded-full bg-purple-500" />
                ) : (
                  <View className="bg-transparent" />
                )}
              </Radio.IndicatorBackground>
              <Radio.IndicatorThumb
                className="w-3.5 h-3.5"
                colors={{ selectedThumb: '#f3e8ff' }}
              />
            </Radio.Indicator>
            <Radio.Content>
              <Radio.Label>Custom Background</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="custom2">
            <Radio.Indicator
              className="w-8 h-8"
              colors={{
                selectedBorder: '#3b82f6',
              }}
            >
              <Radio.IndicatorBackground>
                {customBackground === 'custom2' ? (
                  <View className="absolute inset-0 rounded-full bg-blue-500" />
                ) : (
                  <View className="bg-transparent" />
                )}
              </Radio.IndicatorBackground>
              <Radio.IndicatorThumb
                className="w-3.5 h-3.5"
                colors={{ selectedThumb: '#dbeafe' }}
              />
            </Radio.Indicator>
            <Radio.Content>
              <Radio.Label>Custom Background</Radio.Label>
            </Radio.Content>
          </Radio>
        </RadioGroup>

        <RadioGroup value={customThumb} onValueChange={setCustomThumb}>
          <Radio value="custom1" size="lg">
            <Radio.Indicator>
              <Radio.IndicatorThumb>
                {customThumb === 'custom1' ? (
                  <AnimatedView entering={FadeIn.duration(200)}>
                    <Zap
                      size={12}
                      color={theme === 'dark' ? 'black' : 'white'}
                      fill={theme === 'dark' ? 'black' : 'white'}
                    />
                  </AnimatedView>
                ) : null}
              </Radio.IndicatorThumb>
            </Radio.Indicator>
            <Radio.Content>
              <Radio.Label>Icon Thumb</Radio.Label>
            </Radio.Content>
          </Radio>

          <Radio value="custom2" size="lg">
            <Radio.Indicator>
              <Radio.IndicatorThumb>
                {customThumb === 'custom2' ? (
                  <AnimatedView
                    key="square-thumb"
                    entering={ZoomIn.springify().stiffness(300).damping(20)}
                    className={cn(
                      'h-2.5 w-2.5 rounded-xs bg-lime-300',
                      theme === 'dark' && 'bg-lime-600'
                    )}
                  />
                ) : null}
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

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Advanced Styled Radio
      </Text>

      <View className="w-full">
        <RadioGroup
          value={advancedContent}
          onValueChange={setAdvancedContent}
          className="w-full"
        >
          <StyledRadio
            value="option1"
            isSelected={advancedContent === 'option1'}
            title="Basic Plan"
            description="Perfect for individuals"
          />
          <StyledRadio
            value="option2"
            isSelected={advancedContent === 'option2'}
            title="Premium"
            description="Best for teams"
          />
          <StyledRadio
            value="option3"
            isSelected={advancedContent === 'option3'}
            title="Enterprise"
            description="Custom solutions"
          />
        </RadioGroup>
      </View>
    </ScrollView>
  );
}
