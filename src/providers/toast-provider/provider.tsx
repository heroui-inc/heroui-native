import React from 'react';
import { ToastContext } from '../../components/toast/toast.context';
import { Toaster } from '../../components/toast/toaster';

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
