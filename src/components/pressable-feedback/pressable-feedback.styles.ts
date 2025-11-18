/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const pressableFeedbackStyles = tv({
  base: 'overflow-hidden',
});

export const styleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

export default pressableFeedbackStyles;
