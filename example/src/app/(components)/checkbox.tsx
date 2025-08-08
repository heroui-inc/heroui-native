import { Checkbox, useTheme } from 'heroui-native';
import { Minus, Moon, Plus, Sun } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeOutDown,
  useAnimatedStyle,
  withTiming,
  ZoomIn,
  ZoomInDown,
} from 'react-native-reanimated';
import { cn } from '../../../../src/helpers/utils';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function CheckboxScreen() {
  const [defaultCheck, setDefaultCheck] = React.useState(true);
  const [success, setSuccess] = React.useState(true);
  const [warning, setWarning] = React.useState(true);
  const [danger, setDanger] = React.useState(true);
  const [disabled, setDisabled] = React.useState(true);
  const [readonly, setReadonly] = React.useState(true);
  const [customBackground, setCustomBackground] = React.useState(true);
  const [customIndicator, setCustomIndicator] = React.useState(true);
  const [customBoth, setCustomBoth] = React.useState(true);

  const { colors } = useTheme();

  const rThemeToggleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(customBoth ? 24.5 : -24.5, {
            duration: 200,
            easing: Easing.out(Easing.ease),
          }),
        },
      ],
    };
  });

  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="items-center justify-center  p-4"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Default
      </Text>

      <View className="flex-row gap-4 mb-6">
        <Checkbox
          isSelected={defaultCheck}
          onSelectedChange={setDefaultCheck}
        />
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Colors
      </Text>

      <View className="flex-row gap-4 mb-6">
        <Checkbox
          isSelected={success}
          onSelectedChange={setSuccess}
          color="success"
        />
        <Checkbox
          isSelected={warning}
          onSelectedChange={setWarning}
          color="warning"
        />
        <Checkbox
          isSelected={danger}
          onSelectedChange={setDanger}
          color="danger"
        />
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        States
      </Text>

      <View className="flex-row gap-4 mb-6">
        <Checkbox
          isSelected={disabled}
          onSelectedChange={setDisabled}
          isDisabled={true}
        />
        <Checkbox
          isSelected={readonly}
          onSelectedChange={setReadonly}
          isReadOnly={true}
        />
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Custom Background
      </Text>

      <Checkbox
        isSelected={customBackground}
        onSelectedChange={setCustomBackground}
        className="mb-6 w-10 h-10 rounded-lg"
        colors={{
          selectedBorder: '#3730a3',
        }}
      >
        <Checkbox.Background className="items-center justify-center">
          <View className="absolute inset-0 bg-indigo-400" />
          {customBackground && (
            <AnimatedView
              key="unselected"
              entering={FadeInDown.duration(175).easing(
                Easing.out(Easing.ease)
              )}
              exiting={FadeOutDown.duration(175).easing(Easing.in(Easing.ease))}
              className="absolute w-12 h-12 bg-indigo-700/80 rounded-full"
            />
          )}
        </Checkbox.Background>
        <Checkbox.Indicator iconProps={{ size: 18 }} />
      </Checkbox>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Custom Indicator
      </Text>

      <Checkbox
        isSelected={customIndicator}
        onSelectedChange={setCustomIndicator}
        className="mb-6"
      >
        <Checkbox.Indicator>
          <View>
            {customIndicator ? (
              <Animated.View key="selected" entering={ZoomIn}>
                <Minus
                  size={16}
                  color={colors.accentForeground}
                  strokeWidth={3}
                />
              </Animated.View>
            ) : (
              <Animated.View
                key="default-1"
                entering={ZoomInDown.springify().damping(38).stiffness(450)}
              >
                <Animated.View key="default-2" entering={ZoomIn.duration(175)}>
                  <Plus size={16} color={colors.accent} strokeWidth={3} />
                </Animated.View>
              </Animated.View>
            )}
          </View>
        </Checkbox.Indicator>
      </Checkbox>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Custom Background & Indicator
      </Text>

      <Checkbox
        isSelected={customBoth}
        onSelectedChange={setCustomBoth}
        className="w-12 h-12 rounded-full"
        colors={{
          defaultBorder: colors.background,
          selectedBorder: colors.background,
        }}
      >
        <Checkbox.Background className="items-center justify-center">
          <View
            className={cn(
              'absolute inset-0 bg-slate-200',
              customBoth && 'bg-slate-800'
            )}
          />
          <AnimatedView
            className="flex-row items-center flex-1"
            style={rThemeToggleStyle}
          >
            {customBoth ? (
              <>
                <AnimatedView
                  key="selected"
                  entering={FadeIn}
                  className="w-14 h-14 bg-slate-200 rounded-full"
                />
                <View className="w-14 h-14" />
              </>
            ) : (
              <>
                <View className="w-14 h-14" />
                <AnimatedView
                  key="unselected"
                  entering={FadeIn}
                  className="w-14 h-14 bg-slate-800 rounded-full"
                />
              </>
            )}
          </AnimatedView>
        </Checkbox.Background>
        <Checkbox.Indicator className="z-50">
          {customBoth ? (
            <AnimatedView
              key="check"
              entering={FadeInLeft.springify().damping(38).stiffness(450)}
            >
              <Animated.View
                entering={ZoomIn.springify().damping(38).stiffness(450)}
              >
                <Sun size={24} color="#0f172a" />
              </Animated.View>
            </AnimatedView>
          ) : (
            <AnimatedView
              key="x"
              entering={FadeInRight.springify().damping(38).stiffness(450)}
            >
              <Animated.View
                entering={ZoomIn.springify().damping(38).stiffness(450)}
              >
                <Moon size={20} color="#e2e8f0" />
              </Animated.View>
            </AnimatedView>
          )}
        </Checkbox.Indicator>
      </Checkbox>
    </ScrollView>
  );
}
