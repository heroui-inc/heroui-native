import { View } from 'react-native';
import { Carousel } from '../../../components/showcase-carousel';

const data = [
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
];

export default function ScaleCarousel() {
  return (
    <View className="flex-1 bg-background">
      <Carousel data={data} />
    </View>
  );
}
