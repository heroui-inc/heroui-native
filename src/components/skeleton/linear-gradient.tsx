import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { colorKit } from '../../helpers/theme';
import { DISPLAY_NAME } from './skeleton.constants';

const LinearGradientComponent: React.FC<{ colors?: string[] }> = ({
  colors = ['transparent', 'rgba(255, 255, 255, 0.5)', 'transparent'],
}) => {
  const gradientId = colors.join('-');

  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Defs>
        <LinearGradient id={gradientId} x1={0} y1={0.5} x2={1} y2={0.5}>
          {colors.map((color, index) => {
            const isTransparent = color === 'transparent';
            const processedColor = isTransparent ? '#FFFFFF' : color;
            const opacity = isTransparent ? 0 : colorKit.getAlpha(color);

            return (
              <Stop
                key={index}
                offset={`${(index / (colors.length - 1)) * 100}%`}
                stopColor={processedColor}
                stopOpacity={opacity}
              />
            );
          })}
        </LinearGradient>
      </Defs>
      <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill={`url(#${gradientId})`}
      />
    </Svg>
  );
};

LinearGradientComponent.displayName = DISPLAY_NAME.LINEAR_GRADIENT;

export default LinearGradientComponent;
