import { Text } from 'react-native';

import { Radio } from '@/components/radio';
import { cn } from '@/helpers/utils';
import { useTheme } from 'heroui-native';

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

  return (
    <Radio
      value={value}
      className={cn(
        'rounded-lg px-4 py-3 border transition-colors border-neutral-400',
        theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100',
        !isSelected && 'border-transparent',
        className
      )}
      {...props}
    >
      <Radio.Content>
        <Text className="text-lg text-foreground font-medium">{title}</Text>
        <Text className="text-sm text-muted-foreground">{description}</Text>
      </Radio.Content>
    </Radio>
  );
}
