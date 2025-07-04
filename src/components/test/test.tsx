import { StyleSheet, View } from 'react-native';

export const Test = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
