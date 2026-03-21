import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Stack } from 'expo-router';
import { useThemeColor, useToast } from 'heroui-native';
import { useCallback, useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import LogoDark from '../../../assets/logo-dark.png';
import LogoLight from '../../../assets/logo-light.png';
import { type UpdateBottomSheetMode } from '../../components/bottom-sheet/update-bottom-sheet';
import { ThemeToggle } from '../../components/theme-toggle';
import { useAppTheme } from '../../contexts/app-theme-context';
import { COMPONENTS } from '../../helpers/data/components';
import { useOtaUpdate } from '../../helpers/hooks/use-ota-update';
import { useVersionCheck } from '../../helpers/hooks/use-version-check';

export default function Layout() {
  const { isDark } = useAppTheme();
  const [themeColorForeground, themeColorBackground] = useThemeColor([
    'foreground',
    'background',
  ]);

  const reducedMotion = useReducedMotion();
  const { toast } = useToast();

  // -- Update management state --
  const [isVersionChecked, setIsVersionChecked] = useState(false);
  const [isNewVersionAvailable, setIsNewVersionAvailable] = useState(false);
  const [_updateSheetOpen, setUpdateSheetOpen] = useState(false);
  const [_updateSheetMode, setUpdateSheetMode] =
    useState<UpdateBottomSheetMode>('new-version');

  const handleVersionChecked = useCallback((isNew: boolean) => {
    setIsVersionChecked(true);
    setIsNewVersionAvailable(isNew);

    if (isNew) {
      setUpdateSheetMode('new-version');
      setUpdateSheetOpen(true);
    }
  }, []);

  const handleOtaUpdateReady = useCallback(() => {
    setUpdateSheetMode('ota-update');
    setUpdateSheetOpen(true);
  }, []);

  useVersionCheck({ onVersionChecked: handleVersionChecked });

  useOtaUpdate({
    isVersionChecked,
    isNewVersionAvailable,
    onUpdateReady: handleOtaUpdateReady,
  });

  useEffect(() => {
    if (reducedMotion) {
      toast.show({
        duration: 'persistent',
        variant: 'warning',
        label: 'Reduce motion enabled',
        description: 'All animations will be disabled',
        actionLabel: 'Close',
        onActionPress: ({ hide }) => hide(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  const _renderTitle = () => {
    return (
      <Image
        source={isDark ? LogoLight : LogoDark}
        style={styles.logo}
        resizeMode="contain"
      />
    );
  };

  const _renderThemeToggle = useCallback(() => <ThemeToggle />, []);

  return (
    <View className="flex-1 bg-background">
      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
          headerTransparent: true,
          headerBlurEffect: isDark ? 'dark' : 'light',
          headerTintColor: themeColorForeground,
          headerStyle: {
            backgroundColor: Platform.select({
              ios: undefined,
              android: themeColorBackground,
            }),
          },
          headerTitleStyle: {
            fontFamily: 'Inter_600SemiBold',
          },
          headerRight: _renderThemeToggle,
          headerBackButtonDisplayMode: 'generic',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          fullScreenGestureEnabled: isLiquidGlassAvailable() ? false : true,
          contentStyle: {
            backgroundColor: themeColorBackground,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: _renderTitle,
          }}
        />
        <Stack.Screen
          name="components/index"
          options={{ headerTitle: 'Components' }}
        />
        {COMPONENTS.map((component) => (
          <Stack.Screen
            key={component.path}
            name={`components/${component.path}`}
            options={{ title: component.title }}
          />
        ))}
        <Stack.Screen
          name="components/bottom-sheet-native-modal"
          options={{
            title: 'Bottom Sheet Native Modal',
            presentation: 'formSheet',
          }}
        />
        <Stack.Screen
          name="components/dialog-native-modal"
          options={{ title: 'Dialog Native Modal', presentation: 'formSheet' }}
        />
        <Stack.Screen
          name="components/popover-native-modal"
          options={{ title: 'Popover Native Modal', presentation: 'formSheet' }}
        />
        <Stack.Screen
          name="components/select-native-modal"
          options={{ title: 'Select Native Modal', presentation: 'formSheet' }}
        />
        <Stack.Screen
          name="components/toast-native-modal"
          options={{
            title: 'Toast From Native Modal',
            presentation: 'formSheet',
          }}
        />
        <Stack.Screen name="themes/index" options={{ headerTitle: 'Themes' }} />
        <Stack.Screen
          name="showcases"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
            animationDuration: 300,
          }}
        />
      </Stack>
      {/* <UpdateBottomSheet
        isOpen={updateSheetOpen}
        onOpenChange={setUpdateSheetOpen}
        mode={updateSheetMode}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 24,
  },
});
