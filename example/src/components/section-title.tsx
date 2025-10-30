import { LinearGradient } from 'expo-linear-gradient';
import { cn, useThemeColor } from 'heroui-native';
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

  const themeColorBackgroundSecondary = useThemeColor('background-secondary');
  const themeColorBackgroundTertiary = useThemeColor('background-tertiary');

  return (
    <View className={cn('overflow-hidden -mx-5', className)}>
      <LinearGradient
        colors={[themeColorBackgroundSecondary, themeColorBackgroundTertiary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View
          className={cn(
            'absolute left-0 top-0 h-hairline w-full bg-background-quaternary',
            isDark && 'bg-neutral-800'
          )}
        />

        <AppText className="text-sm font-medium tracking-wide uppercase text-muted">
          {title}
        </AppText>

        <View
          className={cn(
            'absolute left-0 bottom-0 h-hairline w-full bg-background-quaternary',
            isDark && 'bg-neutral-800'
          )}
        />
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
