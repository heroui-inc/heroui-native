import * as React from 'react';
import { createContext, forwardRef, useEffect, useMemo, useState } from 'react';
import {
  type ImageErrorEventData,
  type ImageLoadEvent,
  type NativeSyntheticEvent,
  Image as RNImage,
  View,
} from 'react-native';
import * as Slot from '../slot';
import type {
  AvatarStatus,
  FallbackProps,
  FallbackRef,
  ImageProps,
  ImageRef,
  RootProps,
  RootRef,
} from './avatar.types';
import { isSameSource, isValidSource } from './avatar.utils';

interface IRootContext extends RootProps {
  status: AvatarStatus;
  setStatus: (status: AvatarStatus) => void;
}

const RootContext = createContext<IRootContext | null>(null);

export function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error(
      'Avatar compound components cannot be rendered outside the Avatar component'
    );
  }
  return context;
}

// --------------------------------------------------

const Root = forwardRef<RootRef, RootProps>(
  ({ asChild, alt, ...viewProps }, ref) => {
    const [status, setStatus] = useState<AvatarStatus>('error');

    const Component = asChild ? Slot.View : View;

    const value = useMemo(
      () => ({
        alt,
        status,
        setStatus,
      }),
      [alt, status, setStatus]
    );

    return (
      <RootContext.Provider value={value}>
        <Component ref={ref} {...viewProps} />
      </RootContext.Provider>
    );
  }
);

Root.displayName = 'HeroUINative.Primitive.Avatar.Root';

// --------------------------------------------------

const Image = forwardRef<ImageRef, ImageProps>(
  (
    {
      asChild,
      onLoad: onLoadProps,
      onError: onErrorProps,
      onLoadingStatusChange,
      ...props
    },
    ref
  ) => {
    const { alt, setStatus, status } = useRootContext();

    // Use ref to track the previous source value for comparison
    const previousSourceRef = React.useRef<ImageProps['source'] | undefined>(
      undefined
    );

    useEffect(() => {
      const currentSource = props?.source;
      const previousSource = previousSourceRef.current;

      // Only reset status if the source actually changed (not just reference)
      const sourceChanged = !isSameSource(currentSource, previousSource);

      if (sourceChanged) {
        // Update the ref to track the new source
        previousSourceRef.current = currentSource;

        if (isValidSource(currentSource)) {
          setStatus('loading');
        } else {
          setStatus('error');
        }
      }

      // Cleanup: only reset to error if component unmounts or source becomes invalid
      return () => {
        // Only reset if source is no longer valid or component is unmounting
        if (!isValidSource(currentSource)) {
          setStatus('error');
        }
      };
    }, [props?.source, setStatus]);

    const onLoad = React.useCallback(
      (e: ImageLoadEvent) => {
        setStatus('loaded');
        onLoadingStatusChange?.('loaded');
        onLoadProps?.(e);
      },
      [onLoadProps, setStatus, onLoadingStatusChange]
    );

    const onError = React.useCallback(
      (e: NativeSyntheticEvent<ImageErrorEventData>) => {
        setStatus('error');
        onLoadingStatusChange?.('error');
        onErrorProps?.(e);
      },
      [onErrorProps, setStatus, onLoadingStatusChange]
    );

    const Component = asChild ? Slot.Image : RNImage;

    if (status === 'error') {
      return null;
    }

    return (
      <Component
        ref={ref}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        {...props}
      />
    );
  }
);

Image.displayName = 'HeroUINative.Primitive.Avatar.Image';

// --------------------------------------------------

const Fallback = forwardRef<FallbackRef, FallbackProps>(
  ({ asChild, ...props }, ref) => {
    const { alt, status } = useRootContext();

    if (status !== 'error') {
      return null;
    }

    const Component = asChild ? Slot.View : View;

    return <Component ref={ref} role={'img'} aria-label={alt} {...props} />;
  }
);

Fallback.displayName = 'HeroUINative.Primitive.Avatar.Fallback';

// --------------------------------------------------

export { Fallback, Image, Root };
