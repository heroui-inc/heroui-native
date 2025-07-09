import { Switch } from 'heroui-native';
import * as React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  const [isSelected, setSelected] = React.useState(false);

  return (
    <View className="flex-1 items-center justify-center bg-stone-50">
      <Text className="text-xl font-bold text-blue-400 mb-6">
        Welcome to HeroUI Native!
      </Text>
      <Switch
        isSelected={isSelected}
        onSelectedChange={setSelected}
        size="lg"
        colors={{
          switchBorderDefault: '#a3e635',
          switchBorderSelected: '#65a30d',
          trackDefault: '#a3e635',
          trackSelected: '#65a30d',
          thumbDefault: '#f7fee7',
          thumbSelected: '#f7fee7',
        }}
        dimensions={{
          switchWidth: 120,
          switchHeight: 40,
          switchBorderWidth: 0.5,
          switchThumbSize: 24,
        }}
      />
    </View>
  );
}
