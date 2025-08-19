import { useTheme } from 'heroui-native';
import { type FC } from 'react';
import { View } from 'react-native';
import { cn } from '../helpers/utils/cn';
import { AppText } from './app-text';

type Props = {
  title: string;
  className?: string;
};

export const SectionTitle: FC<Props> = ({ title, className }) => {
  const { isDark } = useTheme();

  return (
    <View
      className={cn(
        'items-center justify-center py-3 -mx-5',
        isDark ? 'bg-neutral-900' : 'bg-neutral-100',
        className
      )}
    >
      <AppText className="text-base font-inter-500 text-warning">
        {title}
      </AppText>
    </View>
  );
};
