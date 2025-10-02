import { Stack } from 'expo-router';
import { useTheme } from 'heroui-native';

export default function Layout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        fullScreenGestureEnabled: true,
        animation: 'none',
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="cooking-onboarding"
        options={{
          headerShown: true,
          headerTransparent: true,
          title: '',
        }}
      />
    </Stack>
  );
}
