import { Switch } from 'heroui-native';
import React from 'react';
import { Text, View } from 'react-native';
import '../global.css';

export default function App() {
  const [value, setValue] = React.useState(false);

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Switch value={value} onValueChange={setValue} />
    </View>
  );
}
