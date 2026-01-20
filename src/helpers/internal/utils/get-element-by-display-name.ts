import React from 'react';
import type { ReactChild } from '../types';

export const getElementByDisplayName = (
  children: React.ReactNode,
  displayName: string
): ReactChild | undefined => {
  const element = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child.type as any)?.displayName === displayName
  );

  return element;
};
