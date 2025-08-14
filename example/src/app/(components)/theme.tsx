import { Radio, RadioGroup } from 'heroui-native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function Theme() {
  const [selectedCity, setSelectedCity] = React.useState('london');
  const [selectedPlan, setSelectedPlan] = React.useState('');

  const isValidSelection = selectedPlan !== '';

  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-background"
      contentContainerClassName="pb-20"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="gap-8">
        <View>
          <Text className="text-lg font-semibold mb-3">Select City</Text>
          <RadioGroup value={selectedCity} onValueChange={setSelectedCity}>
            <Radio value="paris">
              <Radio.Content>
                <Radio.Label>Paris</Radio.Label>
              </Radio.Content>
            </Radio>
            <Radio value="london">
              <Radio.Content>
                <Radio.Label>London</Radio.Label>
              </Radio.Content>
            </Radio>
            <Radio value="berlin">
              <Radio.Content>
                <Radio.Label>Berlin</Radio.Label>
              </Radio.Content>
            </Radio>
          </RadioGroup>
        </View>

        <View>
          <Text className="text-lg font-semibold mb-3">Choose Plan</Text>
          <RadioGroup
            value={selectedPlan}
            onValueChange={setSelectedPlan}
            isValid={isValidSelection}
            orientation="vertical"
          >
            <Radio value="basic">
              <Radio.Content>
                <Radio.Label>Basic Plan</Radio.Label>
                <Radio.Description>Perfect for individuals</Radio.Description>
              </Radio.Content>
            </Radio>
            <Radio value="pro">
              <Radio.Content>
                <Radio.Label>Pro Plan</Radio.Label>
                <Radio.Description>Best for small teams</Radio.Description>
              </Radio.Content>
            </Radio>
            <Radio value="enterprise">
              <Radio.Content>
                <Radio.Label>Enterprise</Radio.Label>
                <Radio.Description>
                  Custom solutions for large organizations
                </Radio.Description>
              </Radio.Content>
            </Radio>
            <RadioGroup.ErrorMessage>
              Please select a plan to continue
            </RadioGroup.ErrorMessage>
          </RadioGroup>
        </View>
      </View>
    </ScrollView>
  );
}
