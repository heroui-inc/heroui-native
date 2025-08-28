import { Ionicons } from '@expo/vector-icons';
import { Switch, useTheme } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import Animated, {
  FadeInLeft,
  FadeInRight,
  ZoomIn,
} from 'react-native-reanimated';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

export default function SwitchScreen() {
  const [defaultSwitch, setDefaultSwitch] = React.useState(true);
  const [defaultColor, setDefaultColor] = React.useState(true);
  const [success, setSuccess] = React.useState(true);
  const [warning, setWarning] = React.useState(true);
  const [danger, setDanger] = React.useState(true);
  const [defaultState, setDefaultState] = React.useState(true);
  const [disabled, setDisabled] = React.useState(true);
  const [icon, setIcon] = React.useState(true);
  const [contentIcon, setContentIcon] = React.useState(true);
  const [contentText, setContentText] = React.useState(true);
  const [custom1, setCustom1] = React.useState(true);

  const { theme, colors } = useTheme();

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Default" />
      <Switch
        isSelected={defaultSwitch}
        onSelectedChange={setDefaultSwitch}
        className="self-center"
      />

      <SectionTitle title="Colors" />
      <View className="flex-row gap-4 self-center">
        <Switch
          isSelected={defaultColor}
          onSelectedChange={setDefaultColor}
          color="default"
        />
        <Switch
          isSelected={success}
          onSelectedChange={setSuccess}
          color="success"
        />
        <Switch
          isSelected={warning}
          onSelectedChange={setWarning}
          color="warning"
        />
        <Switch
          isSelected={danger}
          onSelectedChange={setDanger}
          color="danger"
        />
      </View>

      <SectionTitle title="States" />
      <View className="flex-row gap-8 self-center">
        <View className="items-center gap-2">
          <Switch
            isSelected={defaultState}
            onSelectedChange={setDefaultState}
          />
          <AppText className="text-xs text-muted-foreground">Default</AppText>
        </View>
        <View className="items-center gap-2">
          <Switch
            isSelected={disabled}
            onSelectedChange={setDisabled}
            isDisabled={true}
          />
          <AppText className="text-xs text-muted-foreground">Disabled</AppText>
        </View>
      </View>

      <SectionTitle title="Custom Thumb" />
      <Switch
        isSelected={icon}
        onSelectedChange={setIcon}
        className="self-center"
      >
        <Switch.Thumb>
          {icon ? (
            <Animated.View key="check" entering={ZoomIn}>
              <Ionicons name="checkmark" size={12} color={colors.accent} />
            </Animated.View>
          ) : (
            <Animated.View key="x" entering={ZoomIn}>
              <Ionicons name="close" size={14} color={colors.default} />
            </Animated.View>
          )}
        </Switch.Thumb>
      </Switch>

      <SectionTitle title="With Start & End Content" />
      <View className="gap-8 items-center">
        <Switch
          isSelected={contentIcon}
          onSelectedChange={setContentIcon}
          className="w-[56px] h-[32px]"
          classNames={{
            contentPaddingContainer: 'px-1.5',
          }}
          colors={{
            defaultBackground: '#172554',
            selectedBackground: '#eab308',
            defaultBorder: '#dbeafe20',
            selectedBorder: '#eab308',
          }}
        >
          <Switch.Thumb
            width={22}
            colors={{
              defaultBackground: '#dbeafe',
              selectedBackground: '#854d0e',
            }}
            animationConfig={{
              translateX: {
                damping: 30,
                stiffness: 300,
                mass: 1,
              },
            }}
          />
          <Switch.StartContent className="left-0.5">
            {contentIcon && (
              <Animated.View
                key="sun"
                entering={ZoomIn.springify().damping(30).stiffness(300)}
              >
                <Ionicons name="sunny" size={16} color="#854d0e" />
              </Animated.View>
            )}
          </Switch.StartContent>
          <Switch.EndContent className="right-0.5">
            {!contentIcon && (
              <Animated.View
                key="moon"
                entering={ZoomIn.springify().damping(30).stiffness(300)}
              >
                <Ionicons name="moon" size={16} color="#dbeafe" />
              </Animated.View>
            )}
          </Switch.EndContent>
        </Switch>

        <Switch
          isSelected={contentText}
          onSelectedChange={setContentText}
          className="w-[60px] h-[32px]"
          classNames={{
            contentPaddingContainer: 'px-1.5',
          }}
          colors={{
            defaultBackground: '#71717a',
            selectedBackground: '#16a34a',
            defaultBorder: '#71717a',
            selectedBorder: '#16a34a',
          }}
        >
          <Switch.Thumb
            width={22}
            colors={{ defaultBackground: '#fff', selectedBackground: '#fff' }}
            animationConfig={{
              translateX: {
                damping: 36,
                stiffness: 400,
                mass: 1,
              },
            }}
          />
          <Switch.StartContent className="left-1">
            {contentText && (
              <Animated.View
                key="sun"
                entering={FadeInRight.springify().damping(36).stiffness(400)}
              >
                <AppText className="text-xs font-bold text-white">ON</AppText>
              </Animated.View>
            )}
          </Switch.StartContent>
          <Switch.EndContent className="right-0.5">
            {!contentText && (
              <Animated.View
                key="moon"
                entering={FadeInLeft.springify().damping(36).stiffness(400)}
              >
                <AppText className="text-xs font-bold text-zinc-200">
                  OFF
                </AppText>
              </Animated.View>
            )}
          </Switch.EndContent>
        </Switch>
      </View>

      <SectionTitle title="Custom Style" />
      <Switch
        isSelected={custom1}
        onSelectedChange={setCustom1}
        className="self-center"
        classNames={{
          container: 'w-[40px] h-[8px]',
          contentPaddingContainer: 'p-0 overflow-visible',
        }}
        colors={{
          defaultBackground: 'darkgray',
          selectedBackground: theme === 'dark' ? 'darkgray' : 'black',
        }}
        hitSlop={20}
      >
        <Switch.Thumb
          width={20}
          className="border-[1.5px] border-muted-foreground"
          colors={{
            defaultBackground: 'black',
            selectedBackground: 'black',
          }}
        />
      </Switch>
    </ScreenScrollView>
  );
}
