import { Text } from 'react-native';

import { Radio, useTheme } from 'heroui-native';
import { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { cn } from '../../../src/helpers/utils';

interface StyledRadioProps {
  value: string;
  isSelected: boolean;
  title: string;
  description: string;
  className?: string;
}

export function StyledRadio({
  value,
  isSelected,
  title,
  description,
  className,
  ...props
}: StyledRadioProps) {
  const { theme } = useTheme();

  const rRadioStyle = useAnimatedStyle(() => {
    return {
      borderColor: isSelected
        ? withTiming('#a3a3a3', {
            duration: 500,
            easing: Easing.out(Easing.ease),
          })
        : withTiming('transparent', {
            duration: 100,
          }),
    };
  });

  return (
    <Radio
      key={value}
      value={value}
      className={cn(
        'rounded-lg px-4 py-3 border',
        theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100',
        className
      )}
      style={rRadioStyle}
      {...props}
    >
      <Radio.Content>
        <Text className="text-lg text-foreground font-medium">{title}</Text>
        <Text className="text-sm text-muted-foreground">{description}</Text>
      </Radio.Content>
    </Radio>
  );
}
