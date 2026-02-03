import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { colorKit, Select, useThemeColor } from 'heroui-native';
import {
  FlatList,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import { SelectBlurBackdrop } from '../../select/select-blur-backdrop';
import type { UsageVariant } from '../types';
import { CloseButton } from './close-button';
import { SelectContentContainer } from './select-content-container';
import { SelectItem } from './select-item';
import { TriggerButton } from './trigger-button';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const StyledAnimatedScrollView = withUniwind(AnimatedScrollView);

type Props = {
  data: UsageVariant[];
  variant: UsageVariant;
  setVariant: (variant: UsageVariant) => void;
  listRef: React.RefObject<FlatList<UsageVariant> | null>;
};

export const UsageVariantsSelect = ({
  data,
  variant,
  setVariant,
  listRef,
}: Props) => {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const themeColorSurface = useThemeColor('surface');

  return (
    <Select
      presentation="dialog"
      value={variant}
      onValueChange={(value) => {
        const variantValue = data.find((m) => m.value === value?.value);
        setVariant(variantValue!);
        setTimeout(() => {
          listRef.current?.scrollToIndex({
            index: data.indexOf(variantValue!),
            animated: false,
          });
        }, 200);
      }}
      defaultValue={data[0]}
    >
      <Select.Trigger
        isDisabled={data.length === 1}
        hitSlop={12}
        onPress={() => {
          if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        }}
      >
        <TriggerButton />
      </Select.Trigger>
      <Select.Portal>
        {Platform.OS === 'android' ? (
          <Select.Overlay className="bg-background" />
        ) : (
          <SelectBlurBackdrop />
        )}

        <SelectContentContainer>
          <StyledAnimatedScrollView
            entering={SlideInDown.withInitialValues({
              originY: 100,
            })
              .springify()
              .damping(80)
              .stiffness(1000)}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="gap-2 px-4"
            contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
          >
            <Select.Close
              className="h-auto w-auto bg-transparent"
              pressableFeedbackHighlightProps={{
                isAnimatedStyleActive: false,
              }}
            >
              <View style={{ height: insets.top + screenHeight * 0.25 }} />
            </Select.Close>
            {data.map((m) => (
              <SelectItem key={m.value} data={m} />
            ))}
          </StyledAnimatedScrollView>
          <LinearGradient
            colors={[
              themeColorSurface,
              colorKit.setAlpha(themeColorSurface, 0).hex(),
            ]}
            style={[styles.topGradient, { height: insets.top + 100 }]}
          />
          <LinearGradient
            colors={[
              colorKit.setAlpha(themeColorSurface, 0).hex(),
              themeColorSurface,
            ]}
            style={[styles.bottomGradient, { height: insets.bottom + 100 }]}
          />
          <CloseButton />
        </SelectContentContainer>
      </Select.Portal>
    </Select>
  );
};

const styles = StyleSheet.create({
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
  },
});
