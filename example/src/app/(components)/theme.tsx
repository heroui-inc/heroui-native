import { Switch } from 'heroui-native';
import { Moon, Sun } from 'lucide-react-native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

export default function Theme() {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-background"
      contentContainerClassName="pb-20"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-row gap-4">
        <Switch
          isSelected={darkMode}
          onSelectedChange={setDarkMode}
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
          />
          <Switch.StartContent className="left-0.5">
            {darkMode && (
              <Animated.View key="sun" entering={ZoomIn}>
                <Sun size={16} color="#854d0e" strokeWidth={3} />
              </Animated.View>
            )}
          </Switch.StartContent>
          <Switch.EndContent className="right-0.5">
            {!darkMode && (
              <Animated.View key="moon" entering={ZoomIn}>
                <Moon size={16} color="#dbeafe" />
              </Animated.View>
            )}
          </Switch.EndContent>
        </Switch>
      </View>
    </ScrollView>
  );
}
