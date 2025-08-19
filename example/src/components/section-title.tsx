import { type FC } from 'react';
import { View } from 'react-native';
import { cn } from '../helpers/utils/cn';
import { AppText } from './app-text';

type Props = {
  title: string;
  className?: string;
};

export const SectionTitle: FC<Props> = ({ title, className }) => {
  return (
    <View
      className={cn(
        'bg-surface-2 items-center justify-center py-3 -mx-5',
        className
      )}
    >
      <AppText className="text-base font-inter-500 text-warning">
        {title}
      </AppText>
    </View>
  );
};
