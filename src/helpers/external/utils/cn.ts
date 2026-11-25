import {
  createTV,
  cx,
  extendTailwindMerge,
  type CnOptions,
  type TV,
  type TVCustomConfig,
  type TWMergeConfig,
} from 'tailwind-variants/config';

/**
 * Shared `tailwind-merge` configuration for HeroUI Native.
 *
 * @see https://www.tailwind-variants.org/docs/config
 */
export const twMergeConfig: TWMergeConfig = {
  extend: {
    classGroups: {
      'opacity': [{ opacity: ['disabled'] }],
      'border-w': [{ border: ['field-width'] }],
    },
  },
};

const twMerge = extendTailwindMerge(twMergeConfig);

/**
 * Merges class names with `tailwind-merge`, honoring {@link twMergeConfig}.
 *
 * @param args - Class values to merge.
 * @returns The merged, de-conflicted class string.
 */
export function cn(...args: CnOptions) {
  const merged = cx(args);

  if (!merged) {
    return merged;
  }

  return twMerge(merged);
}

/**
 * HeroUI Native `tv` with {@link twMergeConfig} applied to every recipe.
 *
 * `twMergeConfig` is only supported by the `tailwind-variants/config` entry,
 * and is passed per factory instead of mutating the global `defaultConfig`.
 *
 * @see https://www.tailwind-variants.org/docs/config#advanced-custom-tv-wrapper
 */
export const tv: TV<TVCustomConfig> = createTV({ twMergeConfig });
