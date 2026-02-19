import { Label, Slider } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const DefaultContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-full gap-4">
        <Slider defaultValue={30}>
          <View className="flex-row items-center justify-between mb-1">
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

// ------------------------------------------------------------------------------

const SizesContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-full gap-8">
        <Slider defaultValue={40} size="sm">
          <View className="flex-row items-center justify-between mb-1">
            <Label>Small</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>

        <Slider defaultValue={50} size="md">
          <View className="flex-row items-center justify-between mb-1">
            <Label>Medium</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>

        <Slider defaultValue={60} size="lg">
          <View className="flex-row items-center justify-between mb-1">
            <Label>Large</Label>
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

// ------------------------------------------------------------------------------

const ColorsContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-full gap-8">
        <Slider defaultValue={30} color="default">
          <View className="flex-row items-center justify-between mb-1">
            <Label>Default</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>

        <Slider defaultValue={40} color="accent">
          <View className="flex-row items-center justify-between mb-1">
            <Label>Accent</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>

        <Slider defaultValue={50} color="success">
          <View className="flex-row items-center justify-between mb-1">
            <Label>Success</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>

        <Slider defaultValue={60} color="warning">
          <View className="flex-row items-center justify-between mb-1">
            <Label>Warning</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>

        <Slider defaultValue={70} color="danger">
          <View className="flex-row items-center justify-between mb-1">
            <Label>Danger</Label>
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

// ------------------------------------------------------------------------------

const RangeContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-full gap-4">
        <Slider
          defaultValue={[100, 500]}
          minValue={0}
          maxValue={1000}
          step={50}
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
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const StepsContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-full gap-8">
        <Slider defaultValue={25} step={25} minValue={0} maxValue={100}>
          <View className="flex-row items-center justify-between mb-1">
            <Label>Step 25</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>

        <Slider defaultValue={50} step={10} minValue={0} maxValue={100}>
          <View className="flex-row items-center justify-between mb-1">
            <Label>Step 10</Label>
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

// ------------------------------------------------------------------------------

const DisabledContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-full gap-4">
        <Slider defaultValue={50} isDisabled>
          <View className="flex-row items-center justify-between mb-1">
            <Label>Disabled</Label>
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

// ------------------------------------------------------------------------------

const ControlledContent = () => {
  const [value, setValue] = useState<number | number[]>(25);

  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-full gap-4">
        <Slider value={value} onChange={setValue}>
          <View className="flex-row items-center justify-between mb-1">
            <Label>Controlled</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>
        <AppText className="text-sm text-muted text-center">
          {`Current value: ${String(value)}`}
        </AppText>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const FormattedContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-full gap-8">
        <Slider
          defaultValue={60}
          formatOptions={{ style: 'currency', currency: 'USD' }}
        >
          <View className="flex-row items-center justify-between mb-1">
            <Label>Price</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>

        <Slider
          defaultValue={0.75}
          minValue={0}
          maxValue={1}
          step={0.01}
          formatOptions={{ style: 'percent' }}
        >
          <View className="flex-row items-center justify-between mb-1">
            <Label>Opacity</Label>
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

// ------------------------------------------------------------------------------

const VerticalContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="h-48 flex-row gap-12 items-center justify-center">
        <Slider defaultValue={30} orientation="vertical" size="sm">
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>

        <Slider defaultValue={50} orientation="vertical" size="md">
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>

        <Slider defaultValue={70} orientation="vertical" size="lg">
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SLIDER_VARIANTS: UsageVariant[] = [
  {
    value: 'default',
    label: 'Default',
    content: <DefaultContent />,
  },
  {
    value: 'sizes',
    label: 'Sizes',
    content: <SizesContent />,
  },
  {
    value: 'colors',
    label: 'Colors',
    content: <ColorsContent />,
  },
  {
    value: 'range',
    label: 'Range slider',
    content: <RangeContent />,
  },
  {
    value: 'steps',
    label: 'Custom steps',
    content: <StepsContent />,
  },
  {
    value: 'disabled',
    label: 'Disabled',
    content: <DisabledContent />,
  },
  {
    value: 'controlled',
    label: 'Controlled',
    content: <ControlledContent />,
  },
  {
    value: 'formatted',
    label: 'Formatted values',
    content: <FormattedContent />,
  },
  {
    value: 'vertical',
    label: 'Vertical',
    content: <VerticalContent />,
  },
];

export default function SliderScreen() {
  return <UsageVariantFlatList data={SLIDER_VARIANTS} />;
}
