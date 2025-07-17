import React from 'react';
import { hasCustomElement } from './has-custom-element';

export const getChildElement = (
  children: React.ReactNode,
  displayName: string,
  defaultElement: React.ReactElement
): React.ReactElement => {
  const result = hasCustomElement(children, displayName);

  if (!result) {
    return defaultElement;
  }

  const childrenArray = React.Children.toArray(children);
  const customElement = childrenArray.find(
    (child: any) => child?.type?.displayName === displayName
  );

  return customElement as React.ReactElement;
};
