import { LinearGradient, type LinearGradientProps } from 'expo-linear-gradient';
import { cn } from 'heroui-native';
import { type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppTheme } from '../contexts/app-theme-context';
import { AppText } from './app-text';

type Props = {
  title: string;
  className?: string;
};

export const SectionTitle: FC<Props> = ({ title, className }) => {
  const { isDark } = useAppTheme();

  const gradientColors: LinearGradientProps['colors'] = isDark
    ? ['rgba(15, 15, 15, 0.95)', 'rgba(25, 25, 25, 0.85)']
    : ['rgba(250, 250, 250, 0.95)', 'rgba(245, 245, 245, 0.9)'];

  return (
    <View className={cn('overflow-hidden -mx-5', className)}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View className="absolute left-0 top-0 h-hairline w-full bg-neutral-300 dark:bg-neutral-800" />

        <AppText className="text-sm font-medium tracking-wide uppercase text-neutral-600 dark:text-neutral-400">
          {title}
        </AppText>

        <View className="absolute left-0 bottom-0 h-hairline w-full bg-neutral-300 dark:bg-neutral-800" />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
