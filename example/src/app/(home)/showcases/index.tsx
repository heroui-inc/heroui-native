import Ionicons from '@expo/vector-icons/Ionicons';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import { Carousel } from '../../../components/showcase-carousel';

const StyledIonicons = withUniwind(Ionicons);
const data = [
  {
    imageLight:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/raycast-showcase-light.png',
    imageDark:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/raycast-showcase-dark.png',
    title: 'Raycast Model Select',
    description:
      'AI model selector with animated blur backdrop, progressive blurs, and smooth spring transitions inspired by Raycast.',
    href: '/showcases/raycast',
    components: [
      { name: 'Select', href: '/components/select' },
      { name: 'Button', href: '/components/button' },
      { name: 'Avatar', href: '/components/avatar' },
    ],
  },
  {
    imageLight:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/cooking-onboarding-light-1.png',
    imageDark:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/cooking-onboarding-dark-1.png',
    title: 'Cooking Onboarding',
    description:
      'Multi-step onboarding experience with automated popover sequences, state management, and interactive recipe features.',
    href: '/showcases/cooking-onboarding',
    components: [
      { name: 'Popover', href: '/components/popover' },
      { name: 'Avatar', href: '/components/avatar' },
      { name: 'Button', href: '/components/button' },
      { name: 'Divider', href: '/components/divider' },
    ],
  },
  {
    imageLight:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/linear-task-light.png',
    imageDark:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/linear-task-dark.png',
    title: 'Linear Issue',
    description:
      'Interactive task management interface inspired by Linear, featuring dynamic dialogs and status updates.',
    href: '/showcases/linear-task',
    components: [
      { name: 'Dialog', href: '/components/dialog' },
      { name: 'Card', href: '/components/card' },
      { name: 'Chip', href: '/components/chip' },
      { name: 'RadioGroup', href: '/components/radio-group' },
      { name: 'FormField', href: '/components/form-field' },
      { name: 'Checkbox', href: '/components/checkbox' },
      { name: 'Button', href: '/components/button' },
      { name: 'Avatar', href: '/components/avatar' },
    ],
  },
  {
    imageLight:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcase-paywall.png',
    imageDark:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcase-paywall.png',
    title: 'Hero Paywall',
    description:
      'Modern, animated paywall with free trial, secure checkout, and flexible plans.',
    href: '/showcases/paywall',
    components: [
      { name: 'Switch', href: '/components/switch' },
      { name: 'FormField', href: '/components/form-field' },
      { name: 'RadioGroup', href: '/components/radio-group' },
      { name: 'Button', href: '/components/button' },
    ],
  },
  {
    imageLight:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcases-onboarding-light-1.png',
    imageDark:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcases-onboarding-dark-1.png',
    title: 'Onboarding',
    description: 'Onboarding step with marquee carousel of shadowed cards',
    href: '/showcases/onboarding',
    components: [
      { name: 'Button', href: '/components/button' },
      { name: 'Card', href: '/components/card' },
      { name: 'Divider', href: '/components/divider' },
    ],
  },
];

export default function ScaleCarousel() {
  const router = useRouter();

  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      {isLiquidGlassAvailable() ? (
        <Pressable
          className="absolute right-4 rounded-full z-50"
          style={{
            top: insets.top + 12,
          }}
          onPress={router.back}
        >
          <GlassView style={styles.glassView} isInteractive>
            <StyledIonicons name="close" size={24} className="text-muted" />
          </GlassView>
        </Pressable>
      ) : (
        <Pressable
          onPress={router.back}
          className="absolute right-3 p-2.5 rounded-full bg-foreground/10 z-50"
          style={{
            top: insets.top + 12,
          }}
          hitSlop={12}
        >
          <StyledIonicons name="close" size={20} className="text-muted" />
        </Pressable>
      )}
      <Carousel data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  glassView: {
    borderRadius: 99,
    padding: 8,
  },
});
