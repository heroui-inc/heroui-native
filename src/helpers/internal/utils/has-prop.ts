import type { ReactElement } from 'react';

/**
 * Checks if a React element has a specific prop defined
 * @param element - The React element to check
 * @param propName - The name of the prop to check for
 * @returns true if the element has the prop, false otherwise
 */
export function hasProp(
  element: ReactElement | null | undefined,
  propName: string
): boolean {
  if (!element || !element.props || typeof element.props !== 'object') {
    return false;
  }

  return propName in element.props;
}
