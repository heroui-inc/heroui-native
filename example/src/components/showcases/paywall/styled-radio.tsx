import { cn, RadioGroup, useRadioGroupContext } from 'heroui-native';
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
        <RadioGroup.Item value={value} className="flex-1 px-6">
          <RadioGroup.Indicator className="border-white/25" />
          <View className="flex-1 flex-row items-center justify-between gap-3">
            <View>
              <RadioGroup.Title className={className.title}>
                {title1}
              </RadioGroup.Title>
              <RadioGroup.Description className={className.description}>
                {description1}
              </RadioGroup.Description>
            </View>
            <View>
              <RadioGroup.Title className={className.title}>
                {title2}
              </RadioGroup.Title>
              <RadioGroup.Description className={className.description}>
                {description2}
              </RadioGroup.Description>
            </View>
          </View>
        </RadioGroup.Item>
      </BlurContainer>
    </View>
  );
};
