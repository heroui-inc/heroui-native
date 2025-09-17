import * as React from 'react';
import type { ToasterContextType } from './toast.types';

export const ToastContext = React.createContext<ToasterContextType | undefined>(
  undefined
);

export const useToastContext = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};
