import type { SelectOption } from './select.types';

/**
 * Formats an array of labels into a human-readable string with "and" before the last item.
 * - 0 labels: returns `undefined`
 * - 1 label: "Apple"
 * - 2 labels: "Apple and Banana"
 * - 3+ labels: "Apple, Banana and Cherry"
 */
function formatSelectedLabels(labels: string[]): string | undefined {
  if (labels.length === 0) return undefined;
  if (labels.length === 1) return labels[0];

  const allButLast = labels.slice(0, -1).join(', ');
  const last = labels[labels.length - 1] ?? '';

  return `${allButLast} and ${last}`;
}

/**
 * Checks whether a specific item value exists in the current selection.
 * Works for both single and multiple selection modes.
 */
function isItemSelected(
  value: SelectOption | SelectOption[],
  itemValue: string
): boolean {
  if (Array.isArray(value)) {
    return value.some((v) => v?.value === itemValue);
  }

  return value?.value === itemValue;
}

export { formatSelectedLabels, isItemSelected };
