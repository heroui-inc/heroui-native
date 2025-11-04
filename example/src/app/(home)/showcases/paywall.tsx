import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Button, Chip, RadioGroup } from 'heroui-native';
import { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Uniwind, useUniwind, withUniwind } from 'uniwind';
import BG from '../../../../assets/images/paywall-showcase-bg.jpeg';
import LogoDark from '../../../../assets/logo-dark.png';
import { AppText } from '../../../components/app-text';
import { StyledFormField } from '../../../components/showcases/paywall/styled-form-field';
import { StyledRadio } from '../../../components/showcases/paywall/styled-radio';
import { simulatePress } from '../../../helpers/utils/simulate-press';

const AnimatedView = Animated.createAnimatedComponent(View);
const StyledFeather = withUniwind(Feather);
const StyledIonicons = withUniwind(Ionicons);

export default function Paywall() {
  const [isFreeTrialEnabled, setIsFreeTrialEnabled] = useState(false);
  const [access, setAccess] = useState<'yearly' | 'monthly'>('monthly');

  const router = useRouter();

  const insets = useSafeAreaInsets();

  const { theme } = useUniwind();

  const prevTheme = useRef(theme);

  useFocusEffect(
    useCallback(() => {
      prevTheme.current = theme;
      Uniwind.setTheme('dark');
      return () => {
        Uniwind.setTheme(prevTheme.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  return (
    <View
      className="flex-1 bg-black px-6"
      style={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 12 }}
    >
      <Animated.View
        style={StyleSheet.absoluteFill}
        entering={FadeInUp.duration(1000)}
      >
        <Image source={BG} style={StyleSheet.absoluteFill} blurRadius={50} />
      </Animated.View>
      <Animated.View entering={FadeIn.duration(1000)}>
        <View>
          <Pressable
            className="absolute top0 left-0 z-50"
            onPress={router.back}
            hitSlop={16}
          >
            <StyledFeather
              name="chevron-left"
              size={28}
              className="text-black"
            />
          </Pressable>
          <Image source={LogoDark} style={styles.logo} contentFit="contain" />
        </View>
        <AppText className="text-sm text-default font-medium text-center tracking-wider uppercase mt-3">
          Unlock premium features
        </AppText>
      </Animated.View>
      <AnimatedView
        entering={FadeInDown.duration(500)
          .delay(500)
          .easing(Easing.out(Easing.ease))}
        className="flex-1 justify-end"
      >
        <StyledFormField
          isSelected={isFreeTrialEnabled}
          onSelectedChange={setIsFreeTrialEnabled}
        />
        <RadioGroup
          value={access}
          onValueChange={(value) => setAccess(value as 'yearly' | 'monthly')}
          className="gap-4 mb-6"
        >
          <View>
            <Chip
              size="sm"
              className="absolute -top-2.5 right-6 bg-rose-600 z-50"
            >
              <Chip.Label className="text-white uppercase font-medium">
                Best offer
              </Chip.Label>
            </Chip>
            <StyledRadio
              value="yearly"
              title1="Yearly Access"
              description1="Just $120.00 per year"
              title2="$10.00"
              description2="per month"
            />
          </View>
          <StyledRadio
            value="monthly"
            title1="Monthly Access"
            description1="Just $12.00 per month"
            title2="$12.00"
            description2="per month"
          />
        </RadioGroup>
        <View className="flex-row items-center justify-center gap-2 mb-6">
          <StyledIonicons
            name="shield-checkmark"
            size={20}
            className="text-[#f9fafb]"
          />
          <AppText className="text-base text-gray-50">
            Secure payment with Stripe
          </AppText>
        </View>
        <Button
          size="lg"
          className="rounded-full bg-white mb-5"
          onPress={simulatePress}
          animationConfig={{ highlight: { isDisabled: true } }}
        >
          <Button.Label className="text-black">Continue</Button.Label>
        </Button>
        <View className="flex-row items-center justify-center">
          <Pressable onPress={simulatePress}>
            <AppText className="text-sm text-gray-400">Terms of Use</AppText>
          </Pressable>
          <View className="mx-2">
            <AppText className="text-gray-400">•</AppText>
          </View>
          <Pressable onPress={simulatePress}>
            <AppText className="text-sm text-gray-400">Privacy Policy</AppText>
          </Pressable>
          <View className="mx-2">
            <AppText className="text-gray-400">•</AppText>
          </View>
          <Pressable onPress={simulatePress}>
            <AppText className="text-sm text-gray-400">
              Restore Purchases
            </AppText>
          </Pressable>
        </View>
      </AnimatedView>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 24,
    opacity: 0.9,
  },
});
