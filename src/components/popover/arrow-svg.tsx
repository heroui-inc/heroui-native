import type { ComponentProps } from 'react';
import type { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export interface ArrowSvgProps {
  width: number;
  height: number;
  placement: 'top' | 'bottom' | 'left' | 'right';
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  style?: ViewStyle;
  svgProps?: ComponentProps<typeof Svg>;
}

export const ArrowSvg = ({
  width,
  height,
  placement,
  fill,
  stroke,
  strokeWidth = 1,
  style,
  svgProps,
}: ArrowSvgProps) => {
  const getPathAndViewBox = () => {
    // Add small padding for stroke to prevent clipping
    const strokePadding = strokeWidth / 2;
    // Corner radius for the tip (subtle rounding)
    const cornerRadius = 2;

    switch (placement) {
      case 'top': {
        // Arrow pointing down (at bottom of popover content)
        const tipX = width / 2;
        const tipY = height - strokePadding;
        const leftX = strokePadding;
        const leftY = strokePadding;
        const rightX = width - strokePadding;
        const rightY = strokePadding;

        // Calculate points near the tip for the arc
        const leftTipX = tipX - cornerRadius;
        const leftTipY = tipY - cornerRadius * 0.8;
        const rightTipX = tipX + cornerRadius;
        const rightTipY = tipY - cornerRadius * 0.8;

        // Draw with smooth arc at the tip
        const path = `M ${leftX} ${leftY} L ${leftTipX} ${leftTipY} Q ${tipX} ${tipY} ${rightTipX} ${rightTipY} L ${rightX} ${rightY}`;
        return {
          path,
          viewBox: `0 0 ${width} ${height}`,
          svgWidth: width,
          svgHeight: height,
        };
      }

      case 'bottom': {
        // Arrow pointing up (at top of popover content)
        const tipX = width / 2;
        const tipY = strokePadding;
        const leftX = strokePadding;
        const leftY = height - strokePadding;
        const rightX = width - strokePadding;
        const rightY = height - strokePadding;

        const leftTipX = tipX - cornerRadius;
        const leftTipY = tipY + cornerRadius * 0.8;
        const rightTipX = tipX + cornerRadius;
        const rightTipY = tipY + cornerRadius * 0.8;

        const path = `M ${leftX} ${leftY} L ${leftTipX} ${leftTipY} Q ${tipX} ${tipY} ${rightTipX} ${rightTipY} L ${rightX} ${rightY}`;
        return {
          path,
          viewBox: `0 0 ${width} ${height}`,
          svgWidth: width,
          svgHeight: height,
        };
      }

      case 'left': {
        // Arrow pointing right (at right side of popover content)
        const tipX = height - strokePadding;
        const tipY = width / 2;
        const topX = strokePadding;
        const topY = strokePadding;
        const bottomX = strokePadding;
        const bottomY = width - strokePadding;

        const topTipX = tipX - cornerRadius * 0.8;
        const topTipY = tipY - cornerRadius;
        const bottomTipX = tipX - cornerRadius * 0.8;
        const bottomTipY = tipY + cornerRadius;

        const path = `M ${topX} ${topY} L ${topTipX} ${topTipY} Q ${tipX} ${tipY} ${bottomTipX} ${bottomTipY} L ${bottomX} ${bottomY}`;
        return {
          path,
          viewBox: `0 0 ${height} ${width}`,
          svgWidth: height,
          svgHeight: width,
        };
      }

      case 'right': {
        // Arrow pointing left (at left side of popover content)
        const tipX = strokePadding;
        const tipY = width / 2;
        const topX = height - strokePadding;
        const topY = strokePadding;
        const bottomX = height - strokePadding;
        const bottomY = width - strokePadding;

        const topTipX = tipX + cornerRadius * 0.8;
        const topTipY = tipY - cornerRadius;
        const bottomTipX = tipX + cornerRadius * 0.8;
        const bottomTipY = tipY + cornerRadius;

        const path = `M ${topX} ${topY} L ${topTipX} ${topTipY} Q ${tipX} ${tipY} ${bottomTipX} ${bottomTipY} L ${bottomX} ${bottomY}`;
        return {
          path,
          viewBox: `0 0 ${height} ${width}`,
          svgWidth: height,
          svgHeight: width,
        };
      }

      default:
        return {
          path: '',
          viewBox: '0 0 0 0',
          svgWidth: 0,
          svgHeight: 0,
        };
    }
  };

  const { path, viewBox, svgWidth, svgHeight } = getPathAndViewBox();

  return (
    <Svg
      width={svgWidth}
      height={svgHeight}
      viewBox={viewBox}
      style={style}
      {...svgProps}
    >
      <Path
        d={path}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
