import {
  Switch,
  SwitchEndContent,
  SwitchStartContent,
  SwitchThumb,
  useTheme,
} from 'heroui-native';
import { Check, Moon, Sun, X } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, {
  FadeInLeft,
  FadeInRight,
  ZoomIn,
} from 'react-native-reanimated';

export default function SwitchScreen() {
  const [sm, setSm] = React.useState(true);
  const [md, setMd] = React.useState(true);
  const [lg, setLg] = React.useState(true);
  const [icon, setIcon] = React.useState(true);
  const [contentIcon, setContentIcon] = React.useState(true);
  const [contentText, setContentText] = React.useState(true);
  const [custom1, setCustom1] = React.useState(true);

  const { theme, colors } = useTheme();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Switch
        isSelected={sm}
        onSelectedChange={setSm}
        size="sm"
        className="mb-6"
      />

      <Switch
        isSelected={md}
        onSelectedChange={setMd}
        size="md"
        className="mb-6"
      />

      <Switch
        isSelected={lg}
        onSelectedChange={setLg}
        size="lg"
        className="mb-6"
      />

      <Switch isSelected={icon} onSelectedChange={setIcon} className="mb-6">
        <SwitchThumb>
          {icon ? (
            <Animated.View key="check" entering={ZoomIn}>
              <Check size={12} color={colors.accent} strokeWidth={4} />
            </Animated.View>
          ) : (
            <Animated.View key="x" entering={ZoomIn}>
              <X size={14} color={colors.base} strokeWidth={3} />
            </Animated.View>
          )}
        </SwitchThumb>
      </Switch>

      <Switch
        isSelected={contentIcon}
        onSelectedChange={setContentIcon}
        className="w-[56px] h-[32px] mb-7"
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
        <SwitchThumb
          width={22}
          colors={{
            defaultBackground: '#dbeafe',
            selectedBackground: '#854d0e',
          }}
          animatedMotionConfig={{
            damping: 30,
            stiffness: 300,
            mass: 1,
          }}
        />
        <SwitchStartContent className="left-0.5">
          {contentIcon && (
            <Animated.View
              key="sun"
              entering={ZoomIn.springify().damping(30).stiffness(300)}
            >
              <Sun size={16} color="#854d0e" strokeWidth={3} />
            </Animated.View>
          )}
        </SwitchStartContent>
        <SwitchEndContent className="right-0.5">
          {!contentIcon && (
            <Animated.View
              key="moon"
              entering={ZoomIn.springify().damping(30).stiffness(300)}
            >
              <Moon size={16} color="#dbeafe" />
            </Animated.View>
          )}
        </SwitchEndContent>
      </Switch>

      <Switch
        isSelected={contentText}
        onSelectedChange={setContentText}
        className="w-[60px] h-[32px] mb-7"
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
        <SwitchThumb
          width={22}
          colors={{ defaultBackground: '#fff', selectedBackground: '#fff' }}
          animatedMotionConfig={{
            damping: 36,
            stiffness: 400,
            mass: 1,
          }}
        />
        <SwitchStartContent className="left-1">
          {contentText && (
            <Animated.View
              key="sun"
              entering={FadeInRight.springify().damping(36).stiffness(400)}
            >
              <Text className="text-xs font-bold text-white">ON</Text>
            </Animated.View>
          )}
        </SwitchStartContent>
        <SwitchEndContent className="right-0.5">
          {!contentText && (
            <Animated.View
              key="moon"
              entering={FadeInLeft.springify().damping(36).stiffness(400)}
            >
              <Text className="text-xs font-bold text-zinc-200">OFF</Text>
            </Animated.View>
          )}
        </SwitchEndContent>
      </Switch>

      <Switch
        isSelected={custom1}
        onSelectedChange={setCustom1}
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
        <SwitchThumb
          width={20}
          className="border-[1.5px] border-muted-foreground"
          colors={{
            defaultBackground: 'black',
            selectedBackground: 'black',
          }}
        />
      </Switch>
    </View>
  );
}
