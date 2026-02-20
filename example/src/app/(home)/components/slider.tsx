import { Label, Slider } from 'heroui-native';
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
          <Slider.Track className="h-3 bg-success/15">
            <Slider.Fill className="bg-success" />
            <Slider.Thumb
              classNames={{
                thumbContainer: 'w-6 h-6 rounded-full bg-success',
                thumbKnob: 'bg-success-foreground rounded-full',
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
          <Slider.Track className="h-1.5 rounded-full bg-warning/15">
            <Slider.Fill className="bg-warning rounded-full" />
            <Slider.Thumb
              classNames={{
                thumbContainer: 'w-5 h-5 rounded-full bg-warning p-[1.5px]',
                thumbKnob: 'bg-warning-foreground rounded-full',
              }}
            />
          </Slider.Track>
        </Slider>

        {/* Danger / wide track */}
        <Slider defaultValue={80}>
          <View className="flex-row items-center justify-between mb-1">
            <Label>CPU Load</Label>
            <Slider.Output />
          </View>
          <Slider.Track className="h-7 rounded-2xl bg-danger/10">
            <Slider.Fill className="bg-danger/80 rounded-2xl" />
            <Slider.Thumb
              classNames={{
                thumbContainer: 'w-4 h-7 rounded-xl bg-danger p-[2px]',
                thumbKnob: 'bg-danger-foreground rounded-xl',
              }}
            />
          </Slider.Track>
        </Slider>

        {/* Minimal / solid dot */}
        <Slider defaultValue={50}>
          <View className="flex-row items-center justify-between mb-1">
            <Label>Brightness</Label>
            <Slider.Output />
          </View>
          <Slider.Track className="h-2 rounded-full bg-muted/20">
            <Slider.Fill className="bg-foreground rounded-full" />
            <Slider.Thumb
              classNames={{
                thumbContainer: 'w-5 h-5 rounded-full bg-foreground p-0',
                thumbKnob: 'bg-foreground rounded-full',
              }}
            />
          </Slider.Track>
        </Slider>
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
];

export default function SliderScreen() {
  return <UsageVariantFlatList data={SLIDER_VARIANTS} />;
}
