import * as Haptics from 'expo-haptics';
import { Alert } from 'react-native';

export const simulatePress = () => {
  if (__DEV__) {
    // eslint-disable-next-line lingui/no-unlocalized-strings -- Dev-only diagnostic, never shipped.
    Alert.alert('Pressed');
  }

  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};
