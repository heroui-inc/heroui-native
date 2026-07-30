import type { TransRenderProps } from '@lingui/react';
import type { FC } from 'react';
import { AppText } from '../components/app-text';

/**
 * Default renderer for Lingui's `<Trans>` macro.
 *
 * React Native cannot render bare strings, so every translation needs a `Text`
 * host. Wiring this as `I18nProvider`'s `defaultComponent` lets `<Trans>` be
 * used without manually wrapping each usage in `<AppText>`.
 *
 * Only `children` is forwarded: the remaining `TransRenderProps` fields (`id`,
 * `message`, `translation`, `isTranslated`) are Lingui metadata and are not
 * valid `Text` props.
 */
export const TransText: FC<TransRenderProps> = ({ children }) => {
  return <AppText>{children}</AppText>;
};
