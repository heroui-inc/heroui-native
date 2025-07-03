import { View, StyleSheet } from 'react-native';
import { Switch } from 'heroui-native';
import React from 'react';

export default function App() {
  const [value, setValue] = React.useState(false);

  return (
    <View style={styles.container}>
      <Switch value={value} onValueChange={setValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
