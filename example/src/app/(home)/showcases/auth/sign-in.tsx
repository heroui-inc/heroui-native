import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useTheme } from 'heroui-native';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LogoDark from '../../../../../assets/logo-dark.png';
import LogoLight from '../../../../../assets/logo-light.png';
import { AppText } from '../../../../components/app-text';

export default function SignIn() {
  const router = useRouter();

  const insets = useSafeAreaInsets();

  const { isDark } = useTheme();

  return (
    <View
      className="flex-1 bg-background px-6"
      style={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 12 }}
    >
      <Pressable className="self-end" onPress={router.back}>
        <AntDesign name="close" size={24} color="black" />
      </Pressable>
      <View className="items-center my-10">
        <Image
          source={isDark ? LogoLight : LogoDark}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <AppText className="w-[80%] mx-auto text-center text-2xl font-bold text-foreground uppercase tracking-widest">
        Your account for everything HeroUI
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 24,
  },
});
