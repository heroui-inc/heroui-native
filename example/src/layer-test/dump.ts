// TEMPORARY: uniwind cascade-layer verification harness. Do not commit.
/* eslint-disable lingui/no-unlocalized-strings */
// Walks the React fiber tree and serializes the resolved host-component styles,
// so runs with different uniwind/CSS setups can be diffed exactly.
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Uniwind } from 'uniwind';

const g = globalThis as any;
g.__Uniwind = Uniwind;
g.__router = router;

type DumpNode = { p: string; t: string; s: unknown; x?: string };

const sanitize = (value: unknown, depth = 0): unknown => {
  if (value === null || value === undefined) return value;
  const type = typeof value;
  if (type === 'number' || type === 'string' || type === 'boolean') {
    return value;
  }
  if (type === 'function') return '[fn]';
  if (depth > 4) return '[deep]';
  if (Array.isArray(value)) return value.map((v) => sanitize(v, depth + 1));
  if (type === 'object') {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value as object).sort()) {
      if (key.startsWith('_')) continue;
      out[key] = sanitize((value as any)[key], depth + 1);
    }
    return out;
  }
  return String(value);
};

const getRootFibers = (): any[] => {
  const hook = g.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  const roots: any[] = [];
  if (hook?.getFiberRoots && hook.renderers) {
    for (const id of hook.renderers.keys()) {
      for (const root of hook.getFiberRoots(id)) roots.push(root.current);
    }
  }
  return roots;
};

const textOf = (fiber: any): string | undefined => {
  const children = fiber.memoizedProps?.children;
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }
  if (typeof fiber.memoizedProps?.text === 'string') {
    return fiber.memoizedProps.text;
  }
  return undefined;
};

// Collect host nodes below `fiber` with a stable index path.
const collectHost = (fiber: any, path: string, out: DumpNode[]) => {
  let child = fiber.child;
  const counts: Record<string, number> = {};
  while (child) {
    if (typeof child.type === 'string') {
      const n = (counts[child.type] = (counts[child.type] ?? 0) + 1) - 1;
      const p = `${path}/${child.type}[${n}]`;
      const node: DumpNode = {
        p,
        t: child.type,
        s: sanitize(StyleSheet.flatten(child.memoizedProps?.style)),
      };
      const x = textOf(child);
      if (x !== undefined) node.x = x;
      out.push(node);
      collectHost(child, p, out);
    } else {
      collectHost(child, path, out);
    }
    child = child.sibling;
  }
};

const findFibers = (
  start: any,
  predicate: (fiber: any) => boolean,
  out: any[],
  stopAtMatch: boolean
) => {
  const stack = [start];
  while (stack.length) {
    const fiber = stack.pop();
    if (!fiber) continue;
    if (fiber.sibling) stack.push(fiber.sibling);
    const match = predicate(fiber);
    if (match) out.push(fiber);
    if (match && stopAtMatch) continue;
    if (fiber.child) stack.push(fiber.child);
  }
};

/** Dump every `case:*` testID subtree of the layer-test screen. */
g.__layerDumpCases = () => {
  const result: Record<string, DumpNode[]> = {};
  for (const root of getRootFibers()) {
    const matches: any[] = [];
    findFibers(
      root,
      (f) =>
        typeof f.type === 'string' &&
        typeof f.memoizedProps?.testID === 'string' &&
        f.memoizedProps.testID.startsWith('case:'),
      matches,
      true
    );
    for (const fiber of matches) {
      const nodes: DumpNode[] = [];
      collectHost(fiber, '', nodes);
      result[fiber.memoizedProps.testID] = nodes;
    }
  }
  g.__layerOut = JSON.stringify(result);
  return { cases: Object.keys(result).length, length: g.__layerOut.length };
};

/** Dump the host subtree of the (outermost) screen rendering `routeName`. */
g.__layerDumpRoute = (routeName: string) => {
  const nodes: DumpNode[] = [];
  let found = 0;
  for (const root of getRootFibers()) {
    const matches: any[] = [];
    findFibers(
      root,
      (f) => f.memoizedProps?.route?.name === routeName,
      matches,
      true
    );
    for (const fiber of matches) {
      found++;
      collectHost(fiber, `#${found}`, nodes);
    }
  }
  g.__layerOut = JSON.stringify(nodes);
  return { found, nodes: nodes.length, length: g.__layerOut.length };
};

/** Serialize the resolver probe map. */
g.__layerDumpProbes = () => {
  g.__layerOut = JSON.stringify(sanitize(g.__layerProbe));
  return {
    probes: Object.keys(g.__layerProbe ?? {}).length,
    length: g.__layerOut.length,
  };
};

g.__layerChunk = (start: number, size: number) =>
  g.__layerOut.slice(start, start + size);
