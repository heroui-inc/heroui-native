import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter } from 'expo-router';
import { colorKit, useTheme, type PopoverTriggerRef } from 'heroui-native';
import { useCallback, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BgImage from '../../../../assets/images/pancakes.jpg';
import ParallaxScrollView from '../../../components/showcases/cooking-onboarding/parallax-scroll-view';
import { Save } from '../../../components/showcases/cooking-onboarding/save';
import { Share } from '../../../components/showcases/cooking-onboarding/share';

export default function CookingOnboardingScreen() {
  const { colors } = useTheme();

  const navigation = useNavigation();
  const router = useRouter();

  const shareTriggerRef = useRef<PopoverTriggerRef>(null);
  const saveTriggerRef = useRef<PopoverTriggerRef>(null);

  const _renderHeaderLeft = useCallback(
    () => (
      <Pressable onPress={router.back}>
        <Feather name="chevron-left" size={24} color={colors.foreground} />
      </Pressable>
    ),
    [router.back, colors.foreground]
  );

  const _renderHeaderRight = useCallback(
    () => (
      <View className="flex-row gap-2">
        <Share isOnboardingDone={false} triggerRef={shareTriggerRef} />
        <Save isOnboardingDone={false} triggerRef={saveTriggerRef} />
      </View>
    ),
    []
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: _renderHeaderLeft,
      headerRight: _renderHeaderRight,
    });
  }, [navigation, _renderHeaderLeft, _renderHeaderRight]);

  return (
    <View className="flex-1 bg-background">
      <ParallaxScrollView
        headerImage={<Image source={BgImage} style={styles.image} />}
      >
        <Text className="text-white text-2xl font-bold">Hello</Text>
        <View className="h-[1000px]" />
      </ParallaxScrollView>
      <LinearGradient
        colors={[
          colors.background,
          colorKit.setAlpha(colors.background, 0).hex(),
        ]}
        style={styles.topGradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    pointerEvents: 'none',
  },
});
