import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

const classNames = {
  link: 'text-lg font-bold text-foreground',
};

export default function App() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background items-center justify-center gap-5">
      <TouchableOpacity onPress={() => router.push('/theme')}>
        <Text className={classNames.link}>Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/switch')}>
        <Text className={classNames.link}>Switch</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/checkbox')}>
        <Text className={classNames.link}>Checkbox</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/radio')}>
        <Text className={classNames.link}>Radio</Text>
      </TouchableOpacity>
    </View>
  );
}
