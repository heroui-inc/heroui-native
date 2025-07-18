import { Switch, useTheme } from 'heroui-native';
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
  const [success, setSuccess] = React.useState(true);
  const [warning, setWarning] = React.useState(true);
  const [danger, setDanger] = React.useState(true);
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

      <Switch isSelected={md} onSelectedChange={setMd} className="mb-6" />

      <Switch
        isSelected={lg}
        onSelectedChange={setLg}
        size="lg"
        className="mb-6"
      />

      <Switch
        isSelected={success}
        onSelectedChange={setSuccess}
        size="lg"
        color="success"
        className="mb-6"
      />

      <Switch
        isSelected={warning}
        onSelectedChange={setWarning}
        size="lg"
        color="warning"
        className="mb-6"
      />

      <Switch
        isSelected={danger}
        onSelectedChange={setDanger}
        size="lg"
        color="danger"
        className="mb-6"
      />

      <Switch isSelected={icon} onSelectedChange={setIcon} className="mb-6">
        <Switch.Thumb>
          {icon ? (
            <Animated.View key="check" entering={ZoomIn}>
              <Check size={12} color={colors.accent} strokeWidth={4} />
            </Animated.View>
          ) : (
            <Animated.View key="x" entering={ZoomIn}>
              <X size={14} color={colors.base} strokeWidth={3} />
            </Animated.View>
          )}
        </Switch.Thumb>
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
              <Sun size={16} color="#854d0e" strokeWidth={3} />
            </Animated.View>
          )}
        </Switch.StartContent>
        <Switch.EndContent className="right-0.5">
          {!contentIcon && (
            <Animated.View
              key="moon"
              entering={ZoomIn.springify().damping(30).stiffness(300)}
            >
              <Moon size={16} color="#dbeafe" />
            </Animated.View>
          )}
        </Switch.EndContent>
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
              <Text className="text-xs font-bold text-white">ON</Text>
            </Animated.View>
          )}
        </Switch.StartContent>
        <Switch.EndContent className="right-0.5">
          {!contentText && (
            <Animated.View
              key="moon"
              entering={FadeInLeft.springify().damping(36).stiffness(400)}
            >
              <Text className="text-xs font-bold text-zinc-200">OFF</Text>
            </Animated.View>
          )}
        </Switch.EndContent>
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
        <Switch.Thumb
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
