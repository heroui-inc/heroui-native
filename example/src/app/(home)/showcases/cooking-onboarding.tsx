import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  colorKit,
  Divider,
  useThemeColor,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import BgImage from '../../../../assets/images/pancakes.jpg';
import { AppText } from '../../../components/app-text';
import { Ask } from '../../../components/showcases/cooking-onboarding/ask';
import { Author } from '../../../components/showcases/cooking-onboarding/author';
import { Cook } from '../../../components/showcases/cooking-onboarding/cook';
import { Highlights } from '../../../components/showcases/cooking-onboarding/highlights';
import { Ingridients } from '../../../components/showcases/cooking-onboarding/ingridients';
import ParallaxScrollView from '../../../components/showcases/cooking-onboarding/parallax-scroll-view';
import { Plan } from '../../../components/showcases/cooking-onboarding/plan';
import { Save } from '../../../components/showcases/cooking-onboarding/save';
import { Share } from '../../../components/showcases/cooking-onboarding/share';

const StyledFeather = withUniwind(Feather);

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
  const themeColorBackground = useThemeColor('background');

  const router = useRouter();

  const insets = useSafeAreaInsets();

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
      { ref: saveTriggerRef, delay: 400 },
      { ref: cookTriggerRef, delay: 400 },
      { ref: planTriggerRef, delay: 400 },
      { ref: askTriggerRef, delay: 400 },
    ],
    []
  );

  useEffect(() => {
    dispatch({ type: 'START_ONBOARDING' });
  }, []);

  useEffect(() => {
    if (!onboardingState.isActive) return;

    const currentStep = onboardingSteps[onboardingState.currentStepIndex];

    if (!currentStep) {
      const lastStep = onboardingSteps[onboardingState.currentStepIndex - 1];
      lastStep?.ref.current?.close();
      dispatch({ type: 'COMPLETE_ONBOARDING' });
      return;
    }

    if (onboardingState.currentStepIndex > 0) {
      const prevStep = onboardingSteps[onboardingState.currentStepIndex - 1];
      prevStep?.ref.current?.close();
    }

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
    <Animated.View
      entering={FadeIn.delay(300)}
      className="flex-1 bg-background"
    >
      <View
        className="flex-row items-center justify-between absolute left-5 right-5 z-50"
        style={{ top: insets.top + 8 }}
      >
        <Pressable onPress={router.back}>
          <StyledFeather
            name="chevron-left"
            size={26}
            className="text-foreground"
          />
        </Pressable>
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
      </View>
      <ParallaxScrollView
        headerImage={<Image source={BgImage} style={styles.image} />}
        scrollEnabled={onboardingState.isComplete}
      >
        <AppText className="text-foreground text-4xl font-semibold mb-2">
          Blueberry Pancakes
        </AppText>
        <Author />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="-mx-4 mb-6"
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
        <AppText className="text-foreground text-base">
          Blueberry pancakes are a delicious and healthy breakfast option. They
          are made with blueberries, flour, butter, and eggs. Blueberries are a
          great source of antioxidants and fiber, making them a healthy choice
          for breakfast.
        </AppText>
        <Divider className="my-5" />
        <Highlights />
        <Ingridients />
      </ParallaxScrollView>
      <LinearGradient
        colors={[
          themeColorBackground,
          colorKit.setAlpha(themeColorBackground, 0).hex(),
        ]}
        style={styles.topGradient}
      />
      {onboardingState.isActive && (
        <AnimatedPressable
          entering={FadeIn.delay(1000)}
          exiting={FadeOut}
          style={StyleSheet.absoluteFill}
          onPressIn={handleOverlayPress}
          className="bg-black/25"
        />
      )}
    </Animated.View>
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
    height: 300,
    pointerEvents: 'none',
  },
});
