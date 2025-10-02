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
  const getPaths = () => {
    const strokePadding = strokeWidth / 2;
    const cornerRadius = 2;
    const baselineInset = strokeWidth;

    switch (placement) {
      case 'top': {
        const tipX = width / 2;
        const tipY = height - strokePadding;

        const fillLeftX = strokePadding;
        const fillLeftY = strokePadding;
        const fillRightX = width - strokePadding;
        const fillRightY = strokePadding;
        const fillPath = `M ${fillLeftX} ${fillLeftY} L ${tipX} ${tipY} L ${fillRightX} ${fillRightY} Z`;

        const strokeLeftX = strokePadding;
        const strokeLeftY = strokePadding + baselineInset;
        const strokeRightX = width - strokePadding;
        const strokeRightY = strokePadding + baselineInset;
        const leftTipX = tipX - cornerRadius;
        const leftTipY = tipY - cornerRadius * 0.8;
        const rightTipX = tipX + cornerRadius;
        const rightTipY = tipY - cornerRadius * 0.8;
        const strokePath = `M ${strokeLeftX} ${strokeLeftY} L ${leftTipX} ${leftTipY} Q ${tipX} ${tipY} ${rightTipX} ${rightTipY} L ${strokeRightX} ${strokeRightY}`;

        return {
          fillPath,
          strokePath,
          viewBox: `0 0 ${width} ${height}`,
          svgWidth: width,
          svgHeight: height,
        };
      }

      case 'bottom': {
        const tipX = width / 2;
        const tipY = strokePadding;

        const fillLeftX = strokePadding;
        const fillLeftY = height - strokePadding;
        const fillRightX = width - strokePadding;
        const fillRightY = height - strokePadding;
        const fillPath = `M ${fillLeftX} ${fillLeftY} L ${tipX} ${tipY} L ${fillRightX} ${fillRightY} Z`;

        const strokeLeftX = strokePadding;
        const strokeLeftY = height - strokePadding - baselineInset;
        const strokeRightX = width - strokePadding;
        const strokeRightY = height - strokePadding - baselineInset;
        const leftTipX = tipX - cornerRadius;
        const leftTipY = tipY + cornerRadius * 0.8;
        const rightTipX = tipX + cornerRadius;
        const rightTipY = tipY + cornerRadius * 0.8;
        const strokePath = `M ${strokeLeftX} ${strokeLeftY} L ${leftTipX} ${leftTipY} Q ${tipX} ${tipY} ${rightTipX} ${rightTipY} L ${strokeRightX} ${strokeRightY}`;

        return {
          fillPath,
          strokePath,
          viewBox: `0 0 ${width} ${height}`,
          svgWidth: width,
          svgHeight: height,
        };
      }

      case 'left': {
        const tipX = height - strokePadding;
        const tipY = width / 2;

        const fillTopX = strokePadding;
        const fillTopY = strokePadding;
        const fillBottomX = strokePadding;
        const fillBottomY = width - strokePadding;
        const fillPath = `M ${fillTopX} ${fillTopY} L ${tipX} ${tipY} L ${fillBottomX} ${fillBottomY} Z`;

        const strokeTopX = strokePadding + baselineInset;
        const strokeTopY = strokePadding;
        const strokeBottomX = strokePadding + baselineInset;
        const strokeBottomY = width - strokePadding;
        const topTipX = tipX - cornerRadius * 0.8;
        const topTipY = tipY - cornerRadius;
        const bottomTipX = tipX - cornerRadius * 0.8;
        const bottomTipY = tipY + cornerRadius;
        const strokePath = `M ${strokeTopX} ${strokeTopY} L ${topTipX} ${topTipY} Q ${tipX} ${tipY} ${bottomTipX} ${bottomTipY} L ${strokeBottomX} ${strokeBottomY}`;

        return {
          fillPath,
          strokePath,
          viewBox: `0 0 ${height} ${width}`,
          svgWidth: height,
          svgHeight: width,
        };
      }

      case 'right': {
        const tipX = strokePadding;
        const tipY = width / 2;

        const fillTopX = height - strokePadding;
        const fillTopY = strokePadding;
        const fillBottomX = height - strokePadding;
        const fillBottomY = width - strokePadding;
        const fillPath = `M ${fillTopX} ${fillTopY} L ${tipX} ${tipY} L ${fillBottomX} ${fillBottomY} Z`;

        const strokeTopX = height - strokePadding - baselineInset;
        const strokeTopY = strokePadding;
        const strokeBottomX = height - strokePadding - baselineInset;
        const strokeBottomY = width - strokePadding;
        const topTipX = tipX + cornerRadius * 0.8;
        const topTipY = tipY - cornerRadius;
        const bottomTipX = tipX + cornerRadius * 0.8;
        const bottomTipY = tipY + cornerRadius;
        const strokePath = `M ${strokeTopX} ${strokeTopY} L ${topTipX} ${topTipY} Q ${tipX} ${tipY} ${bottomTipX} ${bottomTipY} L ${strokeBottomX} ${strokeBottomY}`;

        return {
          fillPath,
          strokePath,
          viewBox: `0 0 ${height} ${width}`,
          svgWidth: height,
          svgHeight: width,
        };
      }

      default:
        return {
          fillPath: '',
          strokePath: '',
          viewBox: '0 0 0 0',
          svgWidth: 0,
          svgHeight: 0,
        };
    }
  };

  const { fillPath, strokePath, viewBox, svgWidth, svgHeight } = getPaths();

  return (
    <Svg
      width={svgWidth}
      height={svgHeight}
      viewBox={viewBox}
      style={style}
      {...svgProps}
    >
      <Path d={fillPath} fill={fill} stroke="none" />
      <Path
        d={strokePath}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
