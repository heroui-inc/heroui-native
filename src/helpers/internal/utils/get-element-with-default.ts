import React from 'react';
import type { ReactChild } from '../types';
import { getElementByDisplayName } from './get-element-by-display-name';

export const getElementWithDefault = (
  children: React.ReactNode,
  displayName: string,
  defaultElement: React.ReactElement
): ReactChild => {
  const element = getElementByDisplayName(children, displayName);

  if (!element) {
    return defaultElement;
  }

  return element;
};
