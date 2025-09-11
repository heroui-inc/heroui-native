import type { StyleProp, ViewStyle } from 'react-native';
import type { SkeletonProps } from '../skeleton/skeleton.types';

/**
 * Props for the SkeletonGroup root component
 */
export interface SkeletonGroupRootProps extends Omit<SkeletonProps, 'style'> {
  isVisible?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Context value for SkeletonGroup provider
 */
export interface SkeletonGroupContextValue extends SkeletonGroupRootProps {}

/**
 * Props for the SkeletonGroup.Item component
 */
export interface SkeletonGroupItemProps extends SkeletonProps {}
