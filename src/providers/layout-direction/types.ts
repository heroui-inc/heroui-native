import type { ReactNode } from 'react';

/**
 * Props for the LayoutDirectionScope provider
 */
export interface LayoutDirectionScopeProps {
  /**
   * Layout direction applied to HeroUI Native components in this subtree
   */
  isRTL: boolean;

  /**
   * Subtree that should use the scoped direction
   */
  children: ReactNode;
}
