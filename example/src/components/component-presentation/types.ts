import type { MessageDescriptor } from '@lingui/core';

export type UsageVariant = {
  value: string;
  /**
   * Variant name shown in the pagination rail and the variant picker.
   *
   * Held as a Lingui descriptor rather than a plain string because variant
   * lists are declared at module scope, where the `t` macro cannot run. The
   * descriptor is resolved at render time so the label follows locale changes.
   */
  label: MessageDescriptor;
  content: React.ReactNode;
};
