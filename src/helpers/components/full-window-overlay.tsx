import React from 'react';
import { Platform } from 'react-native';
import { FullWindowOverlay as NativeFullWindowOverlay } from 'react-native-screens';

export const FullWindowOverlay =
  Platform.OS === 'ios' ? NativeFullWindowOverlay : React.Fragment;
