import {
  cn,
  Description,
  Label,
  RadioGroup,
  useRadioGroup,
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
  const { value: selectedValue } = useRadioGroup();
  const isSelected = selectedValue === value;

  return (
    <View
      className={cn(
        'rounded-full border-[2px]',
        isSelected ? 'border-gray-50' : 'border-gray-700'
      )}
    >
      <BlurContainer>
        <RadioGroup.Item value={value} className="flex-1 px-6">
          <RadioGroup.Indicator
            className={cn('border-white/25', isSelected && 'bg-white')}
          >
            <RadioGroup.IndicatorThumb className="bg-[#262626]" />
          </RadioGroup.Indicator>
          <View className="flex-1 flex-row items-center justify-between gap-3">
            <View>
              <Label className={className.title}>{title1}</Label>
              <Description className={className.description}>
                {description1}
              </Description>
            </View>
            <View>
              <Label className={className.title}>{title2}</Label>
              <Description className={className.description}>
                {description2}
              </Description>
            </View>
          </View>
        </RadioGroup.Item>
      </BlurContainer>
    </View>
  );
};
