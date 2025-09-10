import React from 'react';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { colorKit } from '../../providers/theme';
import { DISPLAY_NAME } from './skeleton.constants';
import type { LinearGradientProps } from './skeleton.types';

/**
 * Linear gradient component for creating shimmer effects
 */
const LinearGradientComponent: React.FC<LinearGradientProps> = ({
  colors = ['transparent', 'rgba(255, 255, 255, 0.5)', 'transparent'],
  start = { x: 0, y: 0.5 },
  end = { x: 1, y: 0.5 },
  style,
}) => {
  const gradientId = colors.join('-');

  return (
    <Svg style={style}>
      <Defs>
        <LinearGradient
          id={gradientId}
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
        >
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
