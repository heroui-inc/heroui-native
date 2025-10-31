import { Ionicons } from '@expo/vector-icons';
import { Checkbox, cn, useThemeColor } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
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
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

const AnimatedView = Animated.createAnimatedComponent(View);
const StyledIonicons = withUniwind(Ionicons);

export default function CheckboxScreen() {
  const [defaultCheck, setDefaultCheck] = React.useState(true);
  const [defaultState, setDefaultState] = React.useState(true);
  const [invalid, setInvalid] = React.useState(true);
  const [disabled, setDisabled] = React.useState(true);
  const [customBackground, setCustomBackground] = React.useState(true);
  const [customIndicator, setCustomIndicator] = React.useState(true);
  const [customBoth, setCustomBoth] = React.useState(true);

  const themeColorBackground = useThemeColor('background');

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
  }, [customBoth]);

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Default" />
      <Checkbox
        isSelected={defaultCheck}
        onSelectedChange={setDefaultCheck}
        className="self-center"
      />

      <SectionTitle title="States" />
      <View className="flex-row gap-8 self-center">
        <View className="items-center gap-2">
          <Checkbox
            isSelected={defaultState}
            onSelectedChange={setDefaultState}
          />
          <AppText className="text-xs text-muted">Default</AppText>
        </View>
        <View className="items-center gap-2">
          <Checkbox
            isSelected={invalid}
            onSelectedChange={setInvalid}
            isInvalid
          />
          <AppText className="text-xs text-muted">Invalid</AppText>
        </View>
        <View className="items-center gap-2">
          <Checkbox
            isSelected={disabled}
            onSelectedChange={setDisabled}
            isDisabled
          />
          <AppText className="text-xs text-muted">Disabled</AppText>
        </View>
      </View>

      <SectionTitle title="Custom Background" />

      <Checkbox
        isSelected={customBackground}
        onSelectedChange={setCustomBackground}
        className="size-10 rounded-lg self-center"
        animatedColors={{
          backgroundColor: {
            selected: '#3730a3',
          },
        }}
      >
        <View className="absolute inset-0 bg-indigo-300" />
        {customBackground && (
          <AnimatedView
            key="unselected"
            entering={FadeInDown.duration(150).easing(Easing.out(Easing.ease))}
            exiting={FadeOutDown.duration(150).easing(Easing.in(Easing.ease))}
            className="absolute size-12 bg-indigo-700/80 rounded-full"
          />
        )}
        <Checkbox.Indicator iconProps={{ size: 18 }} />
      </Checkbox>

      <SectionTitle title="Custom Indicator" />

      <Checkbox
        isSelected={customIndicator}
        onSelectedChange={setCustomIndicator}
        className="self-center"
      >
        {({ isSelected }) => {
          return isSelected ? (
            <Animated.View key="selected" entering={ZoomIn}>
              <StyledIonicons
                name="remove"
                size={16}
                className="text-accent-foreground"
              />
            </Animated.View>
          ) : (
            <Animated.View
              key="default-1"
              entering={ZoomInDown.springify().damping(130).stiffness(1300)}
            >
              <Animated.View key="default-2" entering={ZoomIn.duration(175)}>
                <StyledIonicons name="add" size={18} className="text-accent" />
              </Animated.View>
            </Animated.View>
          );
        }}
      </Checkbox>

      <SectionTitle title="Custom Background & Indicator" />

      <Checkbox
        isSelected={customBoth}
        onSelectedChange={setCustomBoth}
        className="w-12 h-12 rounded-full self-center"
        animatedColors={{
          borderColor: {
            default: themeColorBackground,
            selected: themeColorBackground,
          },
        }}
      >
        {({ isSelected }) => (
          <>
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
              {isSelected ? (
                <>
                  <AnimatedView
                    key="selected"
                    entering={FadeIn}
                    className="size-14 bg-slate-200 rounded-full"
                  />
                  <View className="size-14" />
                </>
              ) : (
                <>
                  <View className="size-14" />
                  <AnimatedView
                    key="unselected"
                    entering={FadeIn}
                    className="size-14 bg-slate-800 rounded-full"
                  />
                </>
              )}
            </AnimatedView>
            <Checkbox.Indicator className="z-50">
              {isSelected ? (
                <AnimatedView key="check" entering={FadeInLeft.springify()}>
                  <Animated.View entering={ZoomIn.springify()}>
                    <StyledIonicons
                      name="sunny"
                      size={24}
                      className="text-slate-800"
                    />
                  </Animated.View>
                </AnimatedView>
              ) : (
                <AnimatedView key="x" entering={FadeInRight.springify()}>
                  <Animated.View entering={ZoomIn.springify()}>
                    <StyledIonicons
                      name="moon"
                      size={20}
                      className="text-slate-200"
                    />
                  </Animated.View>
                </AnimatedView>
              )}
            </Checkbox.Indicator>
          </>
        )}
      </Checkbox>
    </ScreenScrollView>
  );
}
