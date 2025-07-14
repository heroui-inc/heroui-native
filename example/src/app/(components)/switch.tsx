import { cn } from '@/helpers/utils';
import {
  Switch,
  SwitchEndContent,
  SwitchStartContent,
  SwitchThumb,
} from 'heroui-native';
import { Check, Moon, Sun, X } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
} from 'react-native-reanimated';

export default function SwitchScreen() {
  const [base, setBase] = React.useState(true);
  const [icon, setIcon] = React.useState(true);
  const [contentIcon, setContentIcon] = React.useState(true);
  const [contentText, setContentText] = React.useState(true);
  const [custom1, setCustom1] = React.useState(true);

  return (
    <View className="flex-1 items-center justify-center bg-background">
      {/* BASE */}
      <Switch isSelected={base} onSelectedChange={setBase} className="mb-6" />
      {/* ICON */}
      <Switch
        width={40}
        height={25}
        isSelected={icon}
        onSelectedChange={setIcon}
        className="mb-6"
      >
        <SwitchThumb>
          {icon ? (
            <Animated.View key="check" entering={ZoomIn}>
              <Check size={12} color="#0A0A0A" strokeWidth={4} />
            </Animated.View>
          ) : (
            <Animated.View key="x" entering={ZoomIn}>
              <X size={14} color="#FAFAFA" strokeWidth={3} />
            </Animated.View>
          )}
        </SwitchThumb>
      </Switch>
      {/* CONTENT ICON */}
      <Switch
        width={56}
        height={32}
        isSelected={contentIcon}
        onSelectedChange={setContentIcon}
        className="mb-7"
        classNames={{
          contentPaddingContainer: 'px-1.5',
        }}
        colors={{
          defaultBackground: '#172554',
          selectedBackground: '#eab308',
          defaultBorder: '#172554',
          selectedBorder: '#eab308',
        }}
      >
        <SwitchThumb
          width={22}
          colors={{
            defaultBackground: '#dbeafe',
            selectedBackground: '#854d0e',
          }}
        />
        <SwitchStartContent className="left-0.5">
          {contentIcon && (
            <Animated.View key="sun" entering={ZoomIn}>
              <Sun size={16} color="#854d0e" strokeWidth={3} />
            </Animated.View>
          )}
        </SwitchStartContent>
        <SwitchEndContent className="right-0.5">
          {!contentIcon && (
            <Animated.View key="moon" entering={ZoomIn}>
              <Moon size={16} color="#dbeafe" />
            </Animated.View>
          )}
        </SwitchEndContent>
      </Switch>
      {/* CONTENT TEXT */}
      <Switch
        width={60}
        height={32}
        isSelected={contentText}
        onSelectedChange={setContentText}
        className="mb-7"
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
        <SwitchThumb width={22} />
        <SwitchStartContent className="left-1">
          {contentText && (
            <Animated.View
              key="sun"
              entering={FadeInRight.easing(Easing.out(Easing.ease))}
            >
              <Text className="text-xs font-bold text-white">ON</Text>
            </Animated.View>
          )}
        </SwitchStartContent>
        <SwitchEndContent className="right-0.5">
          {!contentText && (
            <Animated.View
              key="moon"
              entering={FadeInLeft.easing(Easing.out(Easing.ease))}
            >
              <Text className="text-xs font-bold text-zinc-200">OFF</Text>
            </Animated.View>
          )}
        </SwitchEndContent>
      </Switch>
      {/* CUSTOM 1 */}
      <Switch
        width={40}
        height={8}
        isSelected={custom1}
        onSelectedChange={setCustom1}
        classNames={{
          container: 'mb-6 border-none shadow-none',
          contentPaddingContainer: 'p-0 overflow-visible',
        }}
        colors={{
          defaultBackground: 'darkgray',
          selectedBackground: 'black',
        }}
        hitSlop={20}
      >
        <SwitchThumb
          width={custom1 ? 20 : 16}
          className={cn(
            'shadow-none',
            custom1 && 'border-[2px] border-stone-300'
          )}
          colors={{
            defaultBackground: 'black',
            selectedBackground: 'black',
          }}
        />
      </Switch>
    </View>
  );
}
