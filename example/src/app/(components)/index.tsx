import { Link } from 'expo-router';
import { View } from 'react-native';

const classNames = {
  link: 'text-lg font-bold text-foreground',
};

export default function App() {
  return (
    <View className="flex-1 bg-background items-center justify-center gap-5">
      <Link href="/theme" className={classNames.link}>
        Theme
      </Link>
      <Link href="/switch" className={classNames.link}>
        Switch
      </Link>
      <Link href="/checkbox" className={classNames.link}>
        Checkbox
      </Link>
    </View>
  );
}
