import { Radio, RadioGroup } from 'heroui-native';
import { Zap } from 'lucide-react-native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function Theme() {
  const [selectedPlan, setSelectedPlan] = React.useState('basic');
  const [selectedColor, setSelectedColor] = React.useState('success');

  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-background"
      contentContainerClassName="pb-20"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="gap-8">
        <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
          <Radio value="basic">
            <Radio.Content>
              <Radio.Label>Basic Plan</Radio.Label>
              <Radio.Description>Perfect for individuals</Radio.Description>
            </Radio.Content>
          </Radio>
          <Radio value="pro">
            <Radio.Content>
              <Radio.Label>Pro Plan</Radio.Label>
              <Radio.Description>Best for teams</Radio.Description>
            </Radio.Content>
          </Radio>
          <Radio value="enterprise">
            <Radio.Content>
              <Radio.Label>Enterprise</Radio.Label>
              <Radio.Description>Custom solutions</Radio.Description>
            </Radio.Content>
          </Radio>
        </RadioGroup>

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
              <Radio.Label>Danger with Icon</Radio.Label>
            </Radio.Content>
            <Radio.Indicator>
              <Radio.IndicatorThumb>
                {selectedColor === 'danger' ? (
                  <Animated.View key="zap-icon" entering={FadeIn.duration(200)}>
                    <Zap size={12} color="white" fill="white" />
                  </Animated.View>
                ) : null}
              </Radio.IndicatorThumb>
            </Radio.Indicator>
          </Radio>
        </RadioGroup>
      </View>
    </ScrollView>
  );
}
