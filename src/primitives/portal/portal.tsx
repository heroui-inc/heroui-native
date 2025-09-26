import * as React from 'react';
import { useEffect, useSyncExternalStore } from 'react';
import { Platform, type View, type ViewStyle } from 'react-native';

const DEFAULT_PORTAL_HOST = 'HEROUI_NATIVE_DEFAULT_HOST_NAME';

type PortalMap = Map<string, React.ReactNode>;
type PortalHostMap = Map<string, PortalMap>;

type PortalStore = {
  map: PortalHostMap;
  listeners: Set<() => void>;
};

const store: PortalStore = {
  map: new Map<string, PortalMap>().set(
    DEFAULT_PORTAL_HOST,
    new Map<string, React.ReactNode>()
  ),
  listeners: new Set(),
};

// --------------------------------------------------

function emit() {
  for (const cb of store.listeners) cb();
}

function getSnapshot() {
  return store.map;
}

function subscribe(cb: () => void) {
  store.listeners.add(cb);
  return () => {
    store.listeners.delete(cb);
  };
}

function updatePortal(
  hostName: string,
  name: string,
  children: React.ReactNode
) {
  const next = new Map(store.map);
  const portal = next.get(hostName) ?? new Map<string, React.ReactNode>();
  portal.set(name, children);
  next.set(hostName, portal);
  store.map = next;
  emit();
}

function removePortal(hostName: string, name: string) {
  const next = new Map(store.map);
  const portal = next.get(hostName) ?? new Map<string, React.ReactNode>();
  portal.delete(name);
  next.set(hostName, portal);
  store.map = next;
  emit();
}

// --------------------------------------------------

export function PortalHost({ name = DEFAULT_PORTAL_HOST }: { name?: string }) {
  const map = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const portalMap = map.get(name) ?? new Map<string, React.ReactNode>();
  if (portalMap.size === 0) return null;
  return <>{Array.from(portalMap.values())}</>;
}

// --------------------------------------------------

export function Portal({
  name,
  hostName = DEFAULT_PORTAL_HOST,
  children,
}: {
  name: string;
  hostName?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    updatePortal(hostName, name, children);
  }, [hostName, name, children]);

  useEffect(() => {
    return () => {
      removePortal(hostName, name);
    };
  }, [hostName, name]);

  return null;
}

// --------------------------------------------------

const ROOT: ViewStyle = {
  flex: 1,
};

/**
 * @deprecated use `FullWindowOverlay` from `react-native-screens` instead
 * @example
import { FullWindowOverlay } from "react-native-screens"
const WindowOverlay = Platform.OS === "ios" ? FullWindowOverlay : Fragment
// Wrap the `<PortalHost/>` with `<WindowOverlay/>`
<WindowOverlay><PortalHost/></WindowOverlay>
 */
export function useModalPortalRoot() {
  const ref = React.useRef<View>(null);
  const [offset, setSideOffSet] = React.useState(0);

  const onLayout = React.useCallback(() => {
    if (Platform.OS === 'web') return;
    ref.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
      setSideOffSet(-pageY);
    });
  }, []);

  return {
    ref,
    offset,
    onLayout,
    style: ROOT,
  };
}
