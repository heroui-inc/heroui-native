/* eslint-disable react-native/no-inline-styles */
import MaskedView from '@react-native-masked-view/masked-view';
import { BlurView, type BlurViewProps } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { cn, colorKit, useThemeColor } from 'heroui-native';
import { type FC } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

type Props = {
  position?: 'top' | 'bottom';
  height?: number;
  blurViewProps?: BlurViewProps;
};

export const ProgressiveBlurView: FC<Props> = ({
  position = 'top',
  height = 100,
  blurViewProps,
}) => {
  const themeColorBackground = useThemeColor('background');

  return (
    <View
      className={cn(
        'absolute left-0 right-0 pointer-events-none',
        position === 'top' ? 'top-0' : 'bottom-0'
      )}
      style={[
        {
          position: 'absolute',
          height,
        },
      ]}
    >
      {Platform.OS === 'ios' ? (
        <MaskedView
          maskElement={
            <LinearGradient
              locations={position === 'top' ? [0.5, 1] : [0, 0.5]}
              colors={
                position === 'top'
                  ? ['black', 'transparent']
                  : ['transparent', 'black']
              }
              style={StyleSheet.absoluteFill}
            />
          }
          style={[StyleSheet.absoluteFill]}
        >
          <BlurView
            style={[StyleSheet.absoluteFill, blurViewProps?.style]}
            intensity={blurViewProps?.intensity ?? 75}
            {...blurViewProps}
          />
        </MaskedView>
      ) : (
        <LinearGradient
          style={StyleSheet.absoluteFillObject}
          colors={
            position === 'top'
              ? [
                  colorKit.setAlpha(themeColorBackground, 0.9).hex(),
                  colorKit.setAlpha(themeColorBackground, 0).hex(),
                ]
              : [
                  colorKit.setAlpha(themeColorBackground, 0).hex(),
                  colorKit.setAlpha(themeColorBackground, 0.9).hex(),
                ]
          }
        />
      )}
    </View>
  );
};
