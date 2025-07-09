import { Switch } from 'heroui-native';
import * as React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  const [isSelected, setSelected] = React.useState(false);

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-xl font-bold text-blue-400 mb-6">
        Welcome to HeroUI Native!
      </Text>
      <Switch
        isSelected={isSelected}
        onSelectedChange={setSelected}
        size="lg"
      />
    </View>
  );
}
