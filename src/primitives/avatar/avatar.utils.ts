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

/**
 * Compares two image sources to determine if they represent the same image.
 * Performs deep comparison of source values, not just reference equality.
 *
 * @param source1 - First image source to compare
 * @param source2 - Second image source to compare
 * @returns `true` if both sources represent the same image, `false` otherwise
 *
 * @example
 * ```ts
 * // Same sources (different object references)
 * isSameSource({ uri: 'https://example.com/img.jpg' }, { uri: 'https://example.com/img.jpg' }); // true
 *
 * // Different sources
 * isSameSource({ uri: 'https://example.com/img1.jpg' }, { uri: 'https://example.com/img2.jpg' }); // false
 *
 * // Same require() values
 * isSameSource(require('./img.png'), require('./img.png')); // true (if same number)
 * ```
 */
export function isSameSource(
  source1?: ImageSourcePropType,
  source2?: ImageSourcePropType
): boolean {
  // Both undefined/null
  if (!source1 && !source2) {
    return true;
  }

  // One is undefined/null, the other is not
  if (!source1 || !source2) {
    return false;
  }

  // Both are numbers (require() statements)
  if (typeof source1 === 'number' && typeof source2 === 'number') {
    return source1 === source2;
  }

  // One is a number, the other is not
  if (typeof source1 === 'number' || typeof source2 === 'number') {
    return false;
  }

  // Both are arrays
  if (Array.isArray(source1) && Array.isArray(source2)) {
    if (source1.length !== source2.length) {
      return false;
    }
    // Compare each element's URI
    return source1.every((s1, index) => {
      const s2 = source2[index];
      return s1?.uri === s2?.uri;
    });
  }

  // One is an array, the other is not
  if (Array.isArray(source1) || Array.isArray(source2)) {
    return false;
  }

  // Both are objects - compare URI values
  return source1.uri === source2.uri;
}
