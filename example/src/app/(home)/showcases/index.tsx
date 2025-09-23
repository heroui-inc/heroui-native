/* eslint-disable react-native/no-inline-styles */
import { HeaderBackButton } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Carousel } from '../../../components/showcase-carousel';

const data = [
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
      { name: 'RadioGroup', href: '/components/radio' },
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
      { name: 'RadioGroup', href: '/components/radio' },
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
      { name: 'DropShadowView', href: '/components/drop-shadow-view' },
      { name: 'Divider', href: '/components/divider' },
    ],
  },
];

export default function ScaleCarousel() {
  const router = useRouter();

  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      {Platform.OS === 'android' && (
        <HeaderBackButton
          displayMode="minimal"
          onPress={router.back}
          pressColor="transparent"
          style={{
            position: 'absolute',
            top: insets.top + 12,
            left: 16,
            zIndex: 99,
          }}
        />
      )}
      <Carousel data={data} />
    </View>
  );
}
