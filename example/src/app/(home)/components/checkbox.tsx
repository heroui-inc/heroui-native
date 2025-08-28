import { Ionicons } from '@expo/vector-icons';
import { Checkbox, cn, useTheme } from 'heroui-native';
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
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function CheckboxScreen() {
  const [defaultCheck, setDefaultCheck] = React.useState(true);
  const [success, setSuccess] = React.useState(true);
  const [warning, setWarning] = React.useState(true);
  const [danger, setDanger] = React.useState(true);
  const [defaultState, setDefaultState] = React.useState(true);
  const [disabled, setDisabled] = React.useState(true);
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
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Default" />
      <Checkbox
        isSelected={defaultCheck}
        onSelectedChange={setDefaultCheck}
        className="self-center"
      />

      <SectionTitle title="Colors" />
      <View className="flex-row gap-8 self-center">
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

      <SectionTitle title="States" />
      <View className="flex-row gap-8 self-center">
        <View className="items-center gap-2">
          <Checkbox
            isSelected={defaultState}
            onSelectedChange={setDefaultState}
          />
          <AppText className="text-xs text-muted-foreground">Default</AppText>
        </View>
        <View className="items-center gap-2">
          <Checkbox
            isSelected={disabled}
            onSelectedChange={setDisabled}
            isDisabled={true}
          />
          <AppText className="text-xs text-muted-foreground">Disabled</AppText>
        </View>
      </View>

      <SectionTitle title="Custom Background" />

      <Checkbox
        isSelected={customBackground}
        onSelectedChange={setCustomBackground}
        className="w-10 h-10 rounded-lg self-center"
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

      <SectionTitle title="Custom Indicator" />

      <Checkbox
        isSelected={customIndicator}
        onSelectedChange={setCustomIndicator}
        className="self-center"
      >
        <Checkbox.Indicator>
          <View>
            {customIndicator ? (
              <Animated.View key="selected" entering={ZoomIn}>
                <Ionicons
                  name="remove"
                  size={16}
                  color={colors.accentForeground}
                />
              </Animated.View>
            ) : (
              <Animated.View
                key="default-1"
                entering={ZoomInDown.springify().damping(38).stiffness(450)}
              >
                <Animated.View key="default-2" entering={ZoomIn.duration(175)}>
                  <Ionicons name="add" size={16} color={colors.accent} />
                </Animated.View>
              </Animated.View>
            )}
          </View>
        </Checkbox.Indicator>
      </Checkbox>

      <SectionTitle title="Custom Background & Indicator" />

      <Checkbox
        isSelected={customBoth}
        onSelectedChange={setCustomBoth}
        className="w-12 h-12 rounded-full self-center"
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
                <Ionicons name="sunny" size={24} color="#0f172a" />
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
                <Ionicons name="moon" size={20} color="#e2e8f0" />
              </Animated.View>
            </AnimatedView>
          )}
        </Checkbox.Indicator>
      </Checkbox>
    </ScreenScrollView>
  );
}
