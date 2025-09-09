import {
  cn,
  colorKit,
  Radio,
  useRadioGroupContext,
  useTheme,
} from 'heroui-native';
import { type FC } from 'react';
import { View } from 'react-native';
import { BlurContainer } from './blur-container';

type Props = {
  value: string;
  title1: string;
  description1: string;
  title2: string;
  description2: string;
};

const className = {
  title: 'text-gray-50 text-lg font-semibold',
  description: 'text-gray-300',
};

export const StyledRadio: FC<Props> = ({
  value,
  title1,
  description1,
  title2,
  description2,
}) => {
  const { colors } = useTheme();

  const { value: selectedValue } = useRadioGroupContext();
  const isSelected = selectedValue === value;

  return (
    <View
      className={cn(
        'rounded-full border-[2px]',
        isSelected ? 'border-gray-50' : 'border-gray-700'
      )}
    >
      <BlurContainer>
        <Radio value={value} className="flex-1 px-6" alignIndicator="start">
          <Radio.Content className="">
            <View className="flex-row items-center justify-between gap-3">
              <View>
                <Radio.Title className={className.title}>{title1}</Radio.Title>
                <Radio.Description className={className.description}>
                  {description1}
                </Radio.Description>
              </View>
              <View>
                <Radio.Title className={className.title}>{title2}</Radio.Title>
                <Radio.Description className={className.description}>
                  {description2}
                </Radio.Description>
              </View>
            </View>
          </Radio.Content>
          <Radio.Indicator
            colors={{
              defaultBorder: colorKit.setAlpha('#fff', 0.25).hex(),
            }}
          >
            <Radio.IndicatorBackground
              colors={{
                defaultBackground: colors.default,
              }}
            />
            <Radio.IndicatorThumb className="size-2.5" />
          </Radio.Indicator>
        </Radio>
      </BlurContainer>
    </View>
  );
};
