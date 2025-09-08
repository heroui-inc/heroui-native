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
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcases-onboarding-light-1.png',
    imageDark:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcases-onboarding-dark-1.png',
    title: 'Auth Flow',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    href: '/showcases/auth',
    components: [
      { name: 'Button', href: '/components/button' },
      { name: 'Card', href: '/components/card' },
      { name: 'DropShadowView', href: '/components/drop-shadow-view' },
    ],
  },
  {
    imageLight:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcases-onboarding-light-1.png',
    imageDark:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcases-onboarding-dark-1.png',
    title: 'Settings',
    description: 'Onboarding step with marquee carousel of shadowed cards',
    href: '/showcases/onboarding',
    components: [
      { name: 'Button', href: '/components/button' },
      { name: 'Card', href: '/components/card' },
      { name: 'DropShadowView', href: '/components/drop-shadow-view' },
    ],
  },
  {
    imageLight:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcases-onboarding-light-1.png',
    imageDark:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcases-onboarding-dark-1.png',
    title: 'Login',
    description: 'Onboarding step with marquee carousel of shadowed cards',
    href: '/showcases/onboarding',
    components: [
      { name: 'Button', href: '/components/button' },
      { name: 'Card', href: '/components/card' },
      { name: 'DropShadowView', href: '/components/drop-shadow-view' },
    ],
  },
  {
    imageLight:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcases-onboarding-light-1.png',
    imageDark:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcases-onboarding-dark-1.png',
    title: 'Register',
    description: 'Onboarding step with marquee carousel of shadowed cards',
    href: '/showcases/onboarding',
    components: [
      { name: 'Button', href: '/components/button' },
      { name: 'Card', href: '/components/card' },
      { name: 'DropShadowView', href: '/components/drop-shadow-view' },
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
