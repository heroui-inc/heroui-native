/**
 * Multi-step detached bottom sheet with animated content transitions.
 * Demonstrates a 3-step flow with header, content, and footer
 * that smoothly morphs between states using Reanimated layout animations.
 */

import Feather from '@expo/vector-icons/Feather';
import { BottomSheet, Button } from 'heroui-native';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import { AnimatedBlurView } from '../animated-blur-view';

/** Feather icon wrapped with uniwind for className-based styling */
const StyledFeather = withUniwind(Feather);

/** Available step values for the multi-step flow */
type Step = 1 | 2 | 3;

/** Mapping from current step to the previous step (stays at 1 for step 1) */
const PREVIOUS_STEP: Record<Step, Step> = { 1: 1, 2: 1, 3: 2 };

/** Mapping from current step to the next step (stays at 3 for step 3) */
const NEXT_STEP: Record<Step, Step> = { 1: 2, 2: 3, 3: 3 };

/** Smooth spring-based layout transition config for morphing animations */
const layoutTransition = LinearTransition.springify();

/** Fade-in animation for entering content */
const fadeIn = FadeIn.duration(200);

/** Fade-out animation for exiting content */
const fadeOut = FadeOut.duration(150);

/** Step 1 body text — 6 lorem ipsum sentences */
const STEP_1_BODY = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  'Nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.',
].join(' ');

/** Step 2 body text — 10 lorem ipsum sentences */
const STEP_2_BODY = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  'Nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.',
].join(' ');

/** Step 3 body text — 8 lorem ipsum sentences */
const STEP_3_BODY = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  'Nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
].join(' ');

/**
 * Multi-step detached bottom sheet component.
 * Renders a detached bottom sheet that cycles through 3 steps,
 * each with its own header, content, and footer layout.
 * Uses Animated.View with layout prop on all three sections
 * for smooth morphing transitions between steps.
 */
export const MultiStepDetachedContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const insets = useSafeAreaInsets();

  /** Shared value driving the blur overlay intensity (0 = clear, 10 = blurred) */
  const blurIntensity = useSharedValue(0);

  /** Triggers a blur pulse: 0 → 10 → 0 to mask the content transition */
  const triggerBlurPulse = useCallback(() => {
    blurIntensity.value = withSequence(
      withTiming(10, { duration: 150 }),
      withTiming(0, { duration: 200 })
    );
  }, [blurIntensity]);

  /** Handles open/close state; resets step to 1 on every open */
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        setStep(1);
        blurIntensity.value = 0;
      }
      setIsOpen(open);
    },
    [blurIntensity]
  );

  /** Navigate to the previous step with a blur pulse */
  const handleBack = useCallback(() => {
    triggerBlurPulse();
    setStep((prev) => PREVIOUS_STEP[prev]);
  }, [triggerBlurPulse]);

  /** Navigate to the next step with a blur pulse */
  const handleContinue = useCallback(() => {
    triggerBlurPulse();
    setStep((prev) => NEXT_STEP[prev]);
  }, [triggerBlurPulse]);

  /** Close the bottom sheet */
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={handleOpenChange}>
          {/* Trigger button to open the bottom sheet */}
          <BottomSheet.Trigger asChild>
            <Button variant="secondary" isDisabled={isOpen}>
              Multi-step detached
            </Button>
          </BottomSheet.Trigger>

          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content
              detached
              bottomInset={insets.bottom + 12}
              className="mx-4"
              backgroundClassName="rounded-4xl"
              contentContainerClassName="pb-4 pt-0"
              handleIndicatorClassName="h-0"
            >
              {/* ------------------------------------------------ */}
              {/* Header — Animated.View with layout for morphing   */}
              {/* ------------------------------------------------ */}
              <Animated.View layout={layoutTransition}>
                <View className="flex-row items-center justify-between mb-4">
                  {/* Back button — shown on steps 2 and 3 */}
                  {step > 1 && (
                    <Animated.View entering={fadeIn} exiting={fadeOut}>
                      <Button
                        variant="tertiary"
                        isIconOnly
                        onPress={handleBack}
                        size="sm"
                        className="size-8"
                      >
                        <StyledFeather
                          name="chevron-left"
                          size={20}
                          className="text-foreground"
                        />
                      </Button>
                    </Animated.View>
                  )}

                  {/* Title — expands to fill available space */}
                  <Animated.View layout={layoutTransition}>
                    <View className="flex-1">
                      <BottomSheet.Title>
                        {step === 1 ? 'Content One' : 'Content Two'}
                      </BottomSheet.Title>
                    </View>
                  </Animated.View>

                  {/* Close (X) button — always visible on the right */}
                  <BottomSheet.Close />
                </View>
              </Animated.View>

              {/* ------------------------------------------------ */}
              {/* Content — Animated.View with layout for morphing  */}
              {/* Wrapped in a relative container with blur overlay  */}
              {/* ------------------------------------------------ */}
              <Animated.View layout={layoutTransition}>
                <View className="mb-6 overflow-hidden">
                  {/* Step 1 content */}
                  {step === 1 && (
                    <Animated.View entering={fadeIn} exiting={fadeOut}>
                      <BottomSheet.Title>
                        This is a test title
                      </BottomSheet.Title>
                      <BottomSheet.Description>
                        {STEP_1_BODY}
                      </BottomSheet.Description>
                    </Animated.View>
                  )}

                  {/* Step 2 content */}
                  {step === 2 && (
                    <Animated.View entering={fadeIn} exiting={fadeOut}>
                      <BottomSheet.Title>Different title</BottomSheet.Title>
                      <BottomSheet.Description>
                        {STEP_2_BODY}
                      </BottomSheet.Description>
                    </Animated.View>
                  )}

                  {/* Step 3 content */}
                  {step === 3 && (
                    <Animated.View entering={fadeIn} exiting={fadeOut}>
                      <BottomSheet.Title>Another title</BottomSheet.Title>
                      <BottomSheet.Description>
                        {STEP_3_BODY}
                      </BottomSheet.Description>
                    </Animated.View>
                  )}

                  {/* Blur overlay — pulses 0 → 10 → 0 on each step change */}
                  <AnimatedBlurView
                    blurIntensity={blurIntensity}
                    style={StyleSheet.absoluteFill}
                    pointerEvents="none"
                  />
                </View>
              </Animated.View>

              {/* ------------------------------------------------ */}
              {/* Footer — Animated.View with layout for morphing   */}
              {/* ------------------------------------------------ */}
              <Animated.View layout={layoutTransition}>
                {/* Step 1 footer: single "Continue" button */}
                {step === 1 && (
                  <Animated.View entering={fadeIn} exiting={fadeOut}>
                    <Button onPress={handleContinue}>Continue</Button>
                  </Animated.View>
                )}

                {/* Step 2 footer: "Cancel" and "Continue" side by side */}
                {step === 2 && (
                  <Animated.View entering={fadeIn} exiting={fadeOut}>
                    <View className="flex-row gap-3">
                      <View className="flex-1">
                        <Button variant="tertiary" onPress={handleClose}>
                          Cancel
                        </Button>
                      </View>
                      <View className="flex-1">
                        <Button onPress={handleContinue}>Continue</Button>
                      </View>
                    </View>
                  </Animated.View>
                )}

                {/* Step 3 footer: single "Finish" button */}
                {step === 3 && (
                  <Animated.View entering={fadeIn} exiting={fadeOut}>
                    <Button onPress={handleClose}>Finish</Button>
                  </Animated.View>
                )}
              </Animated.View>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </View>
    </View>
  );
};
