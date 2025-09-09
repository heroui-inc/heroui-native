import * as Haptics from 'expo-haptics';
import { Alert } from 'react-native';

export const simulatePress = () => {
  if (__DEV__) {
    Alert.alert('Pressed');
  }

  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};
