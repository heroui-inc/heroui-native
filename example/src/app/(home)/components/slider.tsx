/* eslint-disable react-native/no-inline-styles */
import { BottomSheet, Button, Label, Slider } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

// ==============================================================================
// Basic
// ==============================================================================

const BasicContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-full gap-4">
        <Slider defaultValue={30}>
          <View className="flex-row items-center justify-between">
            <Label>Volume</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>
      </View>
    </View>
  );
};

// ==============================================================================
// Vertical
// ==============================================================================

const VerticalContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="h-48 flex-row gap-12 items-center justify-center">
        <Slider defaultValue={30} orientation="vertical">
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>

        <Slider defaultValue={50} orientation="vertical">
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>

        <Slider defaultValue={70} orientation="vertical">
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>
      </View>
    </View>
  );
};

// ==============================================================================
// Range
// ==============================================================================

const RangeContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-full gap-8">
        {/* Percent range */}
        <Slider
          defaultValue={[0.2, 0.75]}
          minValue={0}
          maxValue={1}
          step={0.01}
          formatOptions={{ style: 'percent' }}
        >
          <View className="flex-row items-center justify-between mb-1">
            <Label>Discount</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            {({ state }) => (
              <>
                <Slider.Fill />
                {state.values.map((_, i) => (
                  <Slider.Thumb key={i} index={i} />
                ))}
              </>
            )}
          </Slider.Track>
        </Slider>

        {/* Price range */}
        <Slider
          defaultValue={[200, 800]}
          minValue={0}
          maxValue={1000}
          step={10}
          formatOptions={{ style: 'currency', currency: 'USD' }}
        >
          <View className="flex-row items-center justify-between mb-1">
            <Label>Price range</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            {({ state }) => (
              <>
                <Slider.Fill />
                {state.values.map((_, i) => (
                  <Slider.Thumb key={i} index={i} />
                ))}
              </>
            )}
          </Slider.Track>
        </Slider>

        {/* Temperature range */}
        <Slider
          defaultValue={[18, 24]}
          minValue={10}
          maxValue={35}
          step={1}
          formatOptions={{
            style: 'unit',
            unit: 'celsius',
            maximumFractionDigits: 1,
          }}
        >
          <View className="flex-row items-center justify-between mb-1">
            <Label>Comfort zone</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            {({ state }) => (
              <>
                <Slider.Fill />
                {state.values.map((_, i) => (
                  <Slider.Thumb key={i} index={i} />
                ))}
              </>
            )}
          </Slider.Track>
        </Slider>

        {/* Age range */}
        <Slider defaultValue={[25, 45]} minValue={18} maxValue={65} step={1}>
          <View className="flex-row items-center justify-between mb-1">
            <Label>Age range</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            {({ state }) => (
              <>
                <Slider.Fill />
                {state.values.map((_, i) => (
                  <Slider.Thumb key={i} index={i} />
                ))}
              </>
            )}
          </Slider.Track>
        </Slider>
      </View>
    </View>
  );
};

// ==============================================================================
// Custom styles
// ==============================================================================

const CustomStylesContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-full gap-8">
        {/* Success / green theme */}
        <Slider defaultValue={65}>
          <View className="flex-row items-center justify-between mb-1">
            <Label>Battery</Label>
            <Slider.Output />
          </View>
          <Slider.Track className="h-3 rounded-full bg-success/10">
            <Slider.Fill
              className="rounded-full"
              style={{
                experimental_backgroundImage:
                  'linear-gradient(to right, #f87171, #facc15, #4ade80)',
              }}
            />
            <Slider.Thumb
              classNames={{
                thumbContainer: 'size-6 rounded-full bg-success',
                thumbKnob: 'bg-success-foreground rounded-full',
              }}
              animation={{
                scale: { value: [1, 0.7] },
              }}
            />
          </Slider.Track>
        </Slider>

        {/* Warning / thin bar */}
        <Slider defaultValue={40}>
          <View className="flex-row items-center justify-between mb-1">
            <Label>Volume</Label>
            <Slider.Output />
          </View>
          <Slider.Track className="h-1 rounded-full bg-warning/15">
            <Slider.Fill className="bg-warning rounded-full" />
            <Slider.Thumb
              classNames={{
                thumbContainer: 'size-5 rounded-sm bg-warning',
                thumbKnob: 'bg-amber-900 border border-warning rounded-sm',
              }}
              animation={{
                scale: { value: [1, 1.5] },
              }}
            />
          </Slider.Track>
        </Slider>

        {/* Gradient / wide track */}
        <Slider defaultValue={70}>
          <View className="flex-row items-center justify-between mb-1">
            <Label>Mood</Label>
            <Slider.Output />
          </View>
          <Slider.Track className="h-7 rounded-2xl bg-default/40">
            <Slider.Fill
              className="rounded-2xl"
              style={{
                experimental_backgroundImage:
                  'linear-gradient(to right, #a78bfa, #7dd3fc, #6ee7b7)',
              }}
            />
            <Slider.Thumb
              classNames={{
                thumbContainer: 'w-5 h-7 rounded-xl bg-teal-200',
                thumbKnob: 'bg-white rounded-xl',
              }}
              animation={{
                scale: { value: [1, 1.25] },
              }}
            />
          </Slider.Track>
        </Slider>
      </View>
    </View>
  );
};

// ==============================================================================
// Inside Bottom Sheet
// ==============================================================================

const InsideBottomSheetContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary" isDisabled={isOpen}>
              Open slider settings
            </Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content>
              <BottomSheet.Title className="text-xl font-semibold mb-4">
                Audio settings
              </BottomSheet.Title>
              <View className="gap-6">
                <Slider defaultValue={70}>
                  <View className="flex-row items-center justify-between">
                    <Label>Volume</Label>
                    <Slider.Output />
                  </View>
                  <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb />
                  </Slider.Track>
                </Slider>

                <Slider defaultValue={50}>
                  <View className="flex-row items-center justify-between">
                    <Label>Bass</Label>
                    <Slider.Output />
                  </View>
                  <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb />
                  </Slider.Track>
                </Slider>

                <Slider defaultValue={40}>
                  <View className="flex-row items-center justify-between">
                    <Label>Treble</Label>
                    <Slider.Output />
                  </View>
                  <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb />
                  </Slider.Track>
                </Slider>
              </View>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </View>
    </View>
  );
};

const SLIDER_VARIANTS: UsageVariant[] = [
  {
    value: 'basic',
    label: 'Basic',
    content: <BasicContent />,
  },
  {
    value: 'vertical',
    label: 'Vertical',
    content: <VerticalContent />,
  },
  {
    value: 'range',
    label: 'Range',
    content: <RangeContent />,
  },
  {
    value: 'custom-styles',
    label: 'Custom styles',
    content: <CustomStylesContent />,
  },
  {
    value: 'inside-bottom-sheet',
    label: 'Inside bottom sheet',
    content: <InsideBottomSheetContent />,
  },
];

export default function SliderScreen() {
  return <UsageVariantFlatList data={SLIDER_VARIANTS} />;
}
