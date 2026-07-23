import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import {
  Saira_400Regular,
  Saira_500Medium,
  Saira_600SemiBold,
  Saira_700Bold,
} from '@expo-google-fonts/saira';
import {
  SNPro_400Regular,
  SNPro_500Medium,
  SNPro_600SemiBold,
  SNPro_700Bold,
} from '@expo-google-fonts/sn-pro';
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { HeroUINativeProvider } from 'heroui-native';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  KeyboardAvoidingView,
  KeyboardProvider,
} from 'react-native-keyboard-controller';
import { LayoutDirection } from 'uniwind';
import '../../global.css';
import {
  AppDirectionProvider,
  useAppDirection,
} from '../contexts/app-direction-context';
import { AppThemeProvider } from '../contexts/app-theme-context';

SplashScreen.setOptions({
  duration: 300,
  fade: true,
});

/**
 * Component that wraps app content inside KeyboardProvider
 * Contains the contentWrapper and HeroUINativeProvider configuration
 */
function AppContent() {
  const { isRTL } = useAppDirection();

  const contentWrapper = useCallback(
    (children: React.ReactNode) => (
      <KeyboardAvoidingView
        pointerEvents="box-none"
        behavior="padding"
        keyboardVerticalOffset={12}
        className="flex-1"
      >
        {children}
      </KeyboardAvoidingView>
    ),
    []
  );

  return (
    <AppThemeProvider>
      {/*
       * LayoutDirection provides the scoped direction context for uniwind
       * `rtl:` variants. Its own `display: contents` wrapper is skipped by
       * Yoga on RN 0.86, so the `direction` style that actually flips the
       * layout must live on a real View below it.
       */}
      <LayoutDirection rtl={isRTL}>
        <View
          className="flex-1"
          style={isRTL ? styles.directionRTL : styles.directionLTR}
        >
          <HeroUINativeProvider
            config={{
              textProps: {
                maxFontSizeMultiplier: 2,
              },
              toast: {
                contentWrapper,
              },
              devInfo: {
                stylingPrinciples: false,
              },
              isRTL,
            }}
          >
            <Slot />
          </HeroUINativeProvider>
        </View>
      </LayoutDirection>
    </AppThemeProvider>
  );
}

export default function Layout() {
  const fonts = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    Saira_400Regular,
    Saira_500Medium,
    Saira_600SemiBold,
    Saira_700Bold,
    SNPro_400Regular,
    SNPro_500Medium,
    SNPro_600SemiBold,
    SNPro_700Bold,
  });

  if (!fonts) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <KeyboardProvider>
        <AppDirectionProvider>
          <AppContent />
        </AppDirectionProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  directionLTR: {
    direction: 'ltr',
  },
  directionRTL: {
    direction: 'rtl',
  },
});
