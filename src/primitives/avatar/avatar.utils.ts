import type { ImageSourcePropType } from 'react-native';

/**
 * Validates whether an image source is valid and can be loaded.
 *
 * @param source - The image source to validate. Can be a require() statement,
 *                 URI object, or array of URI objects.
 * @returns `true` if the source is valid and contains loadable content, `false` otherwise.
 *
 * @example
 * ```ts
 * // Valid sources
 * isValidSource(require('./avatar.png')); // true (returns a number)
 * isValidSource({ uri: 'https://example.com/avatar.jpg' }); // true
 * isValidSource([{ uri: 'https://example.com/avatar.jpg' }]); // true
 *
 * // Invalid sources
 * isValidSource(undefined); // false
 * isValidSource({ uri: '' }); // false
 * isValidSource([{ uri: '' }, { uri: null }]); // false
 * ```
 */
export function isValidSource(source?: ImageSourcePropType) {
  if (!source) {
    return false;
  }
  // Using require() for the source returns a number
  if (typeof source === 'number') {
    return true;
  }

  if (Array.isArray(source)) {
    return source.some((s) => !!s.uri);
  }

  return !!source.uri;
}
