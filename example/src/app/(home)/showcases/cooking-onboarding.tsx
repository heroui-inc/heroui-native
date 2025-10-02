import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter } from 'expo-router';
import {
  Avatar,
  colorKit,
  useTheme,
  type PopoverTriggerRef,
} from 'heroui-native';
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type RefObject,
} from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import BgImage from '../../../../assets/images/pancakes.jpg';
import { AppText } from '../../../components/app-text';
import { Ask } from '../../../components/showcases/cooking-onboarding/ask';
import { Cook } from '../../../components/showcases/cooking-onboarding/cook';
import ParallaxScrollView from '../../../components/showcases/cooking-onboarding/parallax-scroll-view';
import { Plan } from '../../../components/showcases/cooking-onboarding/plan';
import { Save } from '../../../components/showcases/cooking-onboarding/save';
import { Share } from '../../../components/showcases/cooking-onboarding/share';
import { simulatePress } from '../../../helpers/utils/simulate-press';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type OnboardingStep = {
  ref: RefObject<PopoverTriggerRef | null>;
  delay?: number;
};

type OnboardingState = {
  currentStepIndex: number;
  isComplete: boolean;
  isActive: boolean;
};

type OnboardingAction =
  | { type: 'START_ONBOARDING' }
  | { type: 'NEXT_STEP' }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'RESET_ONBOARDING' };

function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction
): OnboardingState {
  switch (action.type) {
    case 'START_ONBOARDING':
      return { ...state, isActive: true, currentStepIndex: 0 };
    case 'NEXT_STEP':
      return { ...state, currentStepIndex: state.currentStepIndex + 1 };
    case 'COMPLETE_ONBOARDING':
      return { ...state, isComplete: true, isActive: false };
    case 'RESET_ONBOARDING':
      return { currentStepIndex: 0, isComplete: false, isActive: false };
    default:
      return state;
  }
}

export default function CookingOnboardingScreen() {
  const { colors } = useTheme();

  const navigation = useNavigation();
  const router = useRouter();

  const shareTriggerRef = useRef<PopoverTriggerRef>(null);
  const saveTriggerRef = useRef<PopoverTriggerRef>(null);
  const cookTriggerRef = useRef<PopoverTriggerRef>(null);
  const planTriggerRef = useRef<PopoverTriggerRef>(null);
  const askTriggerRef = useRef<PopoverTriggerRef>(null);

  const [onboardingState, dispatch] = useReducer(onboardingReducer, {
    currentStepIndex: 0,
    isComplete: false,
    isActive: false,
  });

  const onboardingSteps = useMemo<OnboardingStep[]>(
    () => [
      { ref: shareTriggerRef, delay: 1000 },
      { ref: saveTriggerRef, delay: 300 },
      { ref: cookTriggerRef, delay: 300 },
      { ref: planTriggerRef, delay: 300 },
      { ref: askTriggerRef, delay: 300 },
    ],
    []
  );

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
        <Share
          isOnboardingDone={onboardingState.isComplete}
          triggerRef={shareTriggerRef}
        />
        <Save
          isOnboardingDone={onboardingState.isComplete}
          triggerRef={saveTriggerRef}
        />
      </View>
    ),
    [onboardingState.isComplete]
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: _renderHeaderLeft,
      headerRight: _renderHeaderRight,
    });
  }, [navigation, _renderHeaderLeft, _renderHeaderRight]);

  // Start onboarding when component mounts
  useEffect(() => {
    dispatch({ type: 'START_ONBOARDING' });
  }, []);

  // Handle onboarding step progression
  useEffect(() => {
    if (!onboardingState.isActive) return;

    const currentStep = onboardingSteps[onboardingState.currentStepIndex];

    if (!currentStep) {
      // No more steps, close the last popover and complete onboarding
      const lastStep = onboardingSteps[onboardingState.currentStepIndex - 1];
      lastStep?.ref.current?.close();
      dispatch({ type: 'COMPLETE_ONBOARDING' });
      return;
    }

    // Close previous step's popover if it exists
    if (onboardingState.currentStepIndex > 0) {
      const prevStep = onboardingSteps[onboardingState.currentStepIndex - 1];
      prevStep?.ref.current?.close();
    }

    // Open current step's popover after delay
    const timer = setTimeout(() => {
      currentStep.ref.current?.open();
    }, currentStep.delay ?? 0);

    return () => clearTimeout(timer);
  }, [
    onboardingState.currentStepIndex,
    onboardingState.isActive,
    onboardingSteps,
  ]);

  const handleOverlayPress = useCallback(() => {
    if (onboardingState.isActive) {
      dispatch({ type: 'NEXT_STEP' });
    }
  }, [onboardingState.isActive]);

  return (
    <View className="flex-1 bg-background">
      <ParallaxScrollView
        headerImage={<Image source={BgImage} style={styles.image} />}
      >
        <AppText className="text-foreground text-4xl font-semibold mb-2">
          Blueberry Pancakes
        </AppText>
        <Pressable
          className="flex-row items-center mb-6"
          onPress={simulatePress}
        >
          <Avatar
            alt="junior"
            size="sm"
            className="size-8 border-foreground/20"
          >
            <Avatar.Image
              source={{
                uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/junior-avatar.jpg',
              }}
            />
            <Avatar.Fallback>
              <AppText className="text-[8px] font-bold text-white">JG</AppText>
            </Avatar.Fallback>
          </Avatar>
          <AppText className="text-base text-foreground ml-2">
            Junior Garcia
          </AppText>
          <View className="mt-0.5">
            <Feather name="chevron-right" size={16} color={colors.foreground} />
          </View>
        </Pressable>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="-mx-4"
          contentContainerClassName="px-4 gap-2"
        >
          <Cook
            isOnboardingDone={onboardingState.isComplete}
            triggerRef={cookTriggerRef}
          />
          <Plan
            isOnboardingDone={onboardingState.isComplete}
            triggerRef={planTriggerRef}
          />
          <Ask
            isOnboardingDone={onboardingState.isComplete}
            triggerRef={askTriggerRef}
          />
        </ScrollView>
      </ParallaxScrollView>
      <LinearGradient
        colors={[
          colors.background,
          colorKit.setAlpha(colors.background, 0).hex(),
        ]}
        style={styles.topGradient}
      />
      {onboardingState.isActive && (
        <AnimatedPressable
          entering={FadeIn}
          exiting={FadeOut}
          style={StyleSheet.absoluteFill}
          onPress={handleOverlayPress}
          className="bg-black/15"
        />
      )}
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
