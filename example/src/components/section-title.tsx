import { type FC } from 'react';
import { Text, View } from 'react-native';
import { cn } from '../helpers/utils/cn';

type Props = {
  title: string;
  className?: string;
};

export const SectionTitle: FC<Props> = ({ title, className }) => {
  return (
    <View
      className={cn('bg-surface-2 items-center justify-center py-3', className)}
    >
      <Text className="text-base font-medium text-warning">{title}</Text>
    </View>
  );
};
