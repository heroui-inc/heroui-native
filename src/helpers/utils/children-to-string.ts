import { Children, isValidElement, type ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';

/**
 * Recursively checks if children contain any React elements.
 * Used to determine if children can be stringified.
 *
 * @param children - React children to check
 * @returns True if children contain React elements, false otherwise
 */
function hasReactElements(children: ReactNode): boolean {
  if (children == null || typeof children === 'boolean') {
    return false;
  }

  if (isValidElement(children)) {
    return true;
  }

  if (Array.isArray(children)) {
    return children.some((child) => hasReactElements(child));
  }

  return false;
}

/**
 * Converts React children to a string representation.
 * Handles cases where children might be an array of mixed types (strings, numbers, variables).
 *
 * @param children - React children that might be string, number, array, or React elements
 * @returns A string representation of the children or null if not convertible
 */
export function childrenToString(
  children: ReactNode | SharedValue<ReactNode>
): string | null {
  // Handle null/undefined
  if (children == null) {
    return null;
  }

  // Handle string directly
  if (typeof children === 'string') {
    return children;
  }

  // Handle number
  if (typeof children === 'number') {
    return String(children);
  }

  // Handle boolean (usually we don't want to render true/false as text)
  if (typeof children === 'boolean') {
    return null;
  }

  // Check if children is a React element - if so, cannot be stringified
  if (isValidElement(children)) {
    return null;
  }

  // Handle array of children (e.g., {someVar} text)
  if (Array.isArray(children)) {
    // Check if array contains any React elements - if so, cannot be stringified
    // This handles cases where conditional children create arrays with React elements
    if (hasReactElements(children)) {
      return null;
    }

    const stringified = children
      .map((child) => {
        // Recursively handle each child
        if (typeof child === 'string' || typeof child === 'number') {
          return String(child);
        }
        // Skip booleans, null, undefined
        if (child == null || typeof child === 'boolean') {
          return '';
        }
        // Recursively process nested arrays (only if they don't contain React elements)
        if (Array.isArray(child)) {
          const nested = childrenToString(child);
          return nested ?? '';
        }
        return String(child);
      })
      .join('');

    return stringified || null;
  }

  // Handle React fragments and other iterable children
  try {
    const childArray = Children.toArray(children as ReactNode);
    if (childArray.length > 0) {
      // Check if any children are React elements
      if (hasReactElements(childArray)) {
        return null;
      }
      return childrenToString(childArray);
    }
  } catch {
    // Not iterable or other error, return null
  }

  return null;
}

/**
 * Checks if React children can be converted to a string.
 *
 * @param children - React children to check
 * @returns True if children can be converted to string, false otherwise
 */
export function isStringifiableChildren(children: ReactNode): boolean {
  return childrenToString(children) !== null;
}
