/* eslint-disable react-native/no-inline-styles */
import {
  BottomSheetFooter,
  BottomSheetScrollView,
  type BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import {
  BottomSheet,
  Button,
  cn,
  colorKit,
  Tabs,
  useThemeColor,
} from 'heroui-native';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../contexts/app-theme-context';
import { simulatePress } from '../../../helpers/utils/simulate-press';
import { AppTabContent } from './app-tab-content';
import { SuperTabContent } from './super-tab-content';

type TabTriggerProps = {
  value: string;
  label: string;
};

function PaywallTabTrigger({ value, label }: TabTriggerProps) {
  const { isDark } = useAppTheme();

  return (
    <Tabs.Trigger value={value} className="flex-1 h-10">
      {({ isSelected }) => (
        <Tabs.Label
          className={
            isSelected
              ? 'text-white font-black'
              : isDark
                ? 'text-neutral-300 font-medium'
                : 'text-neutral-800 font-medium'
          }
        >
          {label}
        </Tabs.Label>
      )}
    </Tabs.Trigger>
  );
}

export function PaywallFooter(props: BottomSheetFooterProps) {
  const themeColorBackground = useThemeColor('background');

  const { isDark } = useAppTheme();

  return (
    <BottomSheetFooter {...props}>
      <LinearGradient
        colors={[
          colorKit.setAlpha(themeColorBackground, 0).hex(),
          themeColorBackground,
        ]}
        style={{
          position: 'absolute',
          top: -50,
          left: 0,
          right: 0,
          height: 50,
        }}
        pointerEvents="none"
      />
      <View className="px-4 pb-safe-offset-2 bg-background gap-2">
        {/* Continue Button */}
        <Button
          size="lg"
          className={cn('bg-black', isDark && 'bg-white')}
          onPress={simulatePress}
          pressableFeedbackHighlightProps={{
            isAnimatedStyleActive: false,
          }}
        >
          <Button.Label
            className={cn(
              'text-xl font-black text-white',
              isDark && 'text-black'
            )}
          >
            Continue
          </Button.Label>
        </Button>

        {/* All Plans Link */}
        <Button
          variant="ghost"
          className="self-center"
          onPress={simulatePress}
          animation="disable-all"
        >
          <Button.Label
            className={cn('text-sm font-medium', isDark && 'text-neutral-300')}
          >
            All plans
          </Button.Label>
        </Button>
      </View>
    </BottomSheetFooter>
  );
}

export function SuperAppPaywallContent() {
  const [activeTab, setActiveTab] = useState<'app' | 'super'>('app');
  const insets = useSafeAreaInsets();

  const { height: screenHeight } = useWindowDimensions();

  const { isDark } = useAppTheme();

  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: insets.bottom + 150,
      }}
      bounces={false}
    >
      <View className="w-full" style={{ height: screenHeight * 0.4 }}>
        <Image
          source={{
            uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/super-app-paywall-hero.png',
          }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />
        <BottomSheet.Close
          className="absolute top-4 right-4"
          iconProps={{ color: 'gray' }}
        />
      </View>

      {/* Tabs Section */}
      <View className="mb-6 px-4 pt-6">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'app' | 'super')}
          className="gap-2"
        >
          <Tabs.List
            className={cn(
              'w-full bg-stone-200/75 p-0',
              isDark && 'bg-neutral-900'
            )}
          >
            <Tabs.Indicator
              className={
                activeTab === 'app' ? 'bg-yellow-500' : 'bg-purple-500'
              }
            />
            <PaywallTabTrigger value="app" label="App" />
            <PaywallTabTrigger value="super" label="Super" />
          </Tabs.List>

          <View className="mt-4">
            <Tabs.Content value="app">
              <AppTabContent />
            </Tabs.Content>
            <Tabs.Content value="super">
              <SuperTabContent />
            </Tabs.Content>
          </View>
        </Tabs>
      </View>
    </BottomSheetScrollView>
  );
}
