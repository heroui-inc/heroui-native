import React, { useMemo, type PropsWithChildren } from 'react';

import { View } from 'react-native';
import { createContext } from '../../helpers/internal/utils';
import Skeleton from '../skeleton/skeleton';
import { DISPLAY_NAME } from './skeleton-group.constants';
import { skeletonGroupClassNames } from './skeleton-group.styles';
import type {
  SkeletonGroupContextValue,
  SkeletonGroupItemProps,
  SkeletonGroupRootProps,
} from './skeleton-group.types';

const [SkeletonGroupProvider, useSkeletonGroupContext] =
  createContext<SkeletonGroupContextValue>({
    name: 'SkeletonGroupContext',
    errorMessage:
      'useSkeletonGroupContext: must be used within a SkeletonGroup',
  });

// --------------------------------------------------

const SkeletonGroupRoot: React.FC<PropsWithChildren<SkeletonGroupRootProps>> = (
  props
) => {
  const {
    children,
    className,
    style,
    isSkeletonOnly = false,
    ...restProps
  } = props;

  const rootClassName = skeletonGroupClassNames.root({ className });

  const contextValue = useMemo<SkeletonGroupContextValue>(
    () => ({
      ...restProps,
    }),
    [restProps]
  );

  if (isSkeletonOnly && !restProps.isLoading) {
    return null;
  }

  return (
    <SkeletonGroupProvider value={contextValue}>
      <View className={rootClassName} style={style}>
        {children}
      </View>
    </SkeletonGroupProvider>
  );
};

// --------------------------------------------------

const SkeletonGroupItem: React.FC<SkeletonGroupItemProps> = (props) => {
  const context = useSkeletonGroupContext();

  const itemProps = {
    ...context,
    ...props,
  };

  return <Skeleton {...itemProps} />;
};

// --------------------------------------------------

SkeletonGroupRoot.displayName = DISPLAY_NAME.SKELETON_GROUP_ROOT;
SkeletonGroupItem.displayName = DISPLAY_NAME.SKELETON_GROUP_ITEM;

/**
 * Compound SkeletonGroup component for managing multiple skeleton loading states
 *
 * @component SkeletonGroup - Root container that provides centralized control for all skeleton items.
 * Passes isLoading, variant, and animation to child items via context.
 *
 * @component SkeletonGroup.Item - Individual skeleton item that inherits props from the parent group.
 * Can override group props with its own props for specific customization.
 *
 * Props flow from SkeletonGroup to Items via context (isLoading, variant, animation).
 * Items can override any inherited prop by passing their own values.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/skeleton-group
 */
const SkeletonGroup = Object.assign(SkeletonGroupRoot, {
  /** @optional Individual skeleton item that inherits group settings */
  Item: SkeletonGroupItem,
});

export default SkeletonGroup;
export { useSkeletonGroupContext };
